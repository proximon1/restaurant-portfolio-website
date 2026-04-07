import bcrypt from "bcrypt";
import { deleteProjectItemById, updateProjectItemById, insertProjectItem, deleteProjectById, updateProjectBySlug, insertProject, getAdminByUsername, getProjectsWithItemCount, getProjectItemsByProjectId, updateLandingData } from "../models/adminModel.js";
import { getProjectBySlug } from "../models/projectModel.js";

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9]+/g, "-")      
    .replace(/^-+|-+$/g, ""); 
};

export const renderLogin = (req, res) => {
    try {
        res.render("admin/login", { error: req.query.error || null });
    } catch (error) {
        console.log("Can't load the login page: " + error.message);
    };
};

export const renderAdminDashboard = (req, res) => {
    try {
        res.render("admin/dashboard.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the admin page: " + error.message);
    };
};

export const renderAdminLanding = (req, res) => {
    try {
        res.render("admin/landing.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the landing editor page: " + error.message);
    };
};

export const renderAdminStatistics = (req, res) => {
    try {
        res.render("admin/statistics.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the statistics page: " + error.message);
    };
};

export const renderAdminProjects = async (req, res) => {
    try {
        const projects = await getProjectsWithItemCount();
        res.render("admin/projects.ejs", {
            currentPath: req.path,
            layout: "admin/layout",
            projects
        });
    } catch (error) {
        console.log("Can't load the admin projects page: " + error.message);
    };
};

export const renderAdminProjectDetail = async (req, res) => {
  const { slug } = req.params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  const items = await getProjectItemsByProjectId(project.id);

  res.render("admin/project-detail.ejs", {
    project,
    layout: "admin/layout",
    isNew: false,
    items
  });
};

export const renderAdminProjectCreate = (req, res) => {
  res.render("admin/project-detail.ejs", {
    project: {},
    items: [],
    isNew: true,
    layout: "admin/layout"
  });
};

export const logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const user = await getAdminByUsername(username);

  if (!user) return res.redirect("/admin/login?error=1");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.redirect("/admin/login?error=1");

  req.session.user = {
    id: user.id,
    username: user.username
  };

  res.redirect("/admin");
};

export const updateLanding = async (req, res) => {
  try {
    const files = req.files;

    const data = {
        main_video: files.mainVideo?.[0]
            ? `/images/${files.mainVideo[0].filename}`
            : null,

        about_image_small: files.aboutImageSmall?.[0]
            ? `/images/${files.aboutImageSmall[0].filename}`
            : null,

        about_image_large: files.aboutImageLarge?.[0]
            ? `/images/${files.aboutImageLarge[0].filename}`
            : null,

        about_video: files.aboutVideo?.[0]
            ? `/images/${files.aboutVideo[0].filename}`
            : null,

        about_description: req.body.aboutDescription || null
        };

    await updateLandingData(data);

    req.session.message = {
        type: "success",
        text: "Landing page updated successfully"
    };

    res.redirect("/admin/landing");
  } catch (err) {
    console.log(err);
    req.session.message = {
        type: "error",
        text: "Something went wrong"
    };
    res.redirect("/admin/landing");
  }
};

export const createProject = async (req, res) => {
    try {
        const { title, subtitle } = req.body;

        if (!title) {
            return res.status(400).send("Title is required!");
        }

        let baseSlug = generateSlug(title);
        let slug = baseSlug;
        let counter = 1;

        while (await getProjectBySlug(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        const newProject = await insertProject({
            title,
            subtitle,
            slug
        });

        req.session.message = {
            type: "success",
            text: "The project has been successfully launched"
        };

        res.redirect(`/admin/projects/${newProject.slug}`);
    } catch (err) {
        console.error(err);
        req.session.message = {
            type: "error",
            text: "Project creation failed!"
        };
        res.redirect("/admin/projects");
    }
}

export const updateProject = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, subtitle } = req.body;

    if (!title || !title.trim()) {
        req.session.message = {
            type: "error",
            text: "Title is required!"
        };
        res.redirect("/admin/projects/" + slug);
    }

    const existingProject = await getProjectBySlug(slug);

    if (!existingProject) {
        req.session.message = {
            type: "error",
            text: "The project already exists!"
        };
        res.redirect("/admin/projects/" + slug);
    }

    let newSlug = slug;

    if (title.trim() !== existingProject.title) {
      let baseSlug = generateSlug(title);
      let counter = 1;
      newSlug = baseSlug;

      while (await getProjectBySlug(newSlug)) {
        newSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const updatedProject = await updateProjectBySlug(slug, {
      title,
      subtitle,
      slug: newSlug
    });

    req.session.message = {
            type: "success",
            text: "The project was updated successfully!"
        };

    res.redirect(`/admin/projects/${updatedProject.slug}`);

  } catch (err) {
    console.error(err);
    req.session.message = {
            type: "error",
            text: "Something went wrong!"
        };
    res.redirect("/admin/projects/" + slug);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteProjectById(id);
    req.session.message = {
            type: "success",
            text: "Project was deleted successfully!"
        };
    res.redirect("/admin/projects");
  } catch (err) {
    console.error(err);
    req.session.message = {
            type: "error",
            text: "Something went wrong!"
        };
    res.redirect("/admin/projects");
  }
};

export const createProjectItem = async (req, res) => {
  const { projectId, layout, description } = req.body;

  const noteOrder = req.body.note_order
    ? parseInt(req.body.note_order, 10)
    : null;

  const isMain = req.body.is_main === "on";

  const image = req.file
    ? `/images/${req.file.filename}`
    : null;

  await insertProjectItem({
    projectId,
    image,
    is_main: isMain,
    note_order: noteOrder,
    layout,
    description
  });

  req.session.message = {
            type: "success",
            text: "Project item was created successfully!"
        };
  res.redirect(`/admin/projects/${req.body.projectSlug}`);
};

export const updateProjectItem = async (req, res) => {
  const { id } = req.params;

  const { note_order, layout, description } = req.body;

  const image = req.file ? `/images/${req.file.filename}` : null;

  await updateProjectItemById(id, {
    image,
    is_main: req.body.is_main === "on",
    note_order: note_order ? parseInt(note_order, 10) : null,
    layout,
    description
  });

  req.session.message = {
            type: "success",
            text: "Project item was modified successfully!"
        };
  res.redirect(`/admin/projects/${req.body.projectSlug}`);
};

export const deleteProjectItem = async (req, res) => {
  const { id } = req.params;
  const { slug } = req.query;

  try {
    await deleteProjectItemById(id);

    req.session.message = {
      type: "success",
      text: "Item deleted successfully!"
    };

    res.redirect(`/admin/projects/${slug}`);

  } catch (err) {
    console.error(err);

    req.session.message = {
      type: "error",
      text: "Something went wrong!"
    };

    res.redirect(`/admin/projects/${slug}`);
  }
};