import bcrypt from "bcrypt";
import db from "../db.js";
import path from "path";
import fs from "fs";

import { deleteTagById, getLandingData, createTagIfNotExists, deleteProjectItemById, updateProjectItemById, insertProjectItem, deleteProjectWithItems, updateProjectBySlug, insertProject, getAdminByUsername, getProjectsWithItemCount, getProjectItemsByProjectId, updateLandingData, getAllTags, setProjectTags, getProjectTagIds } from "../models/adminModel.js";
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

export const renderAdminLanding = async (req, res) => {
  try {
    const landing = await getLandingData();

    res.render("admin/landing.ejs", {
      currentPath: req.path,
      layout: "admin/layout",
      landing
    });

  } catch (error) {
    console.log("Can't load the landing editor page: " + error.message);
  }
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
  const tags = await getAllTags();
  const projectTags = await getProjectTagIds(project.id);

  res.render("admin/project-detail.ejs", {
    project,
    layout: "admin/layout",
    isNew: false,
    items,
    tags,
    projectTags
  });
};

export const renderAdminProjectCreate = async (req, res) => {
  const tags = await getAllTags();
  res.render("admin/project-detail.ejs", {
    project: {},
    items: [],
    isNew: true,
    layout: "admin/layout",
    tags,
    projectTags: []
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

    const oldData = await getLandingData();

    const deleteIfExists = (filePath) => {
      if (!filePath) return;

      if (!filePath.startsWith("/images/landing/")) {
        console.log("⚠️ Skip delete (not landing):", filePath);
        return;
      }

      const fullPath = path.join("public", filePath);

      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (err) {
          console.log("Delete error:", err.message);
        }
      }
    };

    const data = {
      main_video_horizontal: null,
      main_video_vertical: null,
      about_image_small: null,
      about_image_large: null,
      about_video: null,
      about_description: req.body.description || null
    };

    // ✅ MAIN VIDEO HORIZONTAL
    if (files.mainVideoHorizontal?.[0]) {
      deleteIfExists(oldData.main_video_horizontal);

      data.main_video_horizontal =
        `/images/landing/${files.mainVideoHorizontal[0].filename}`;
    }

    // ✅ MAIN VIDEO VERTICAL
    if (files.mainVideoVertical?.[0]) {
      deleteIfExists(oldData.main_video_vertical);

      data.main_video_vertical =
        `/images/landing/${files.mainVideoVertical[0].filename}`;
    }

    // ✅ ABOUT SMALL
    if (files.aboutImageSmall?.[0]) {
      deleteIfExists(oldData.about_image_small);

      data.about_image_small =
        `/images/landing/${files.aboutImageSmall[0].filename}`;
    }

    // ✅ ABOUT LARGE
    if (files.aboutImageLarge?.[0]) {
      deleteIfExists(oldData.about_image_large);

      data.about_image_large =
        `/images/landing/${files.aboutImageLarge[0].filename}`;
    }

    // ✅ ABOUT GIF
    if (files.aboutVideo?.[0]) {
      deleteIfExists(oldData.about_video);

      data.about_video =
        `/images/landing/${files.aboutVideo[0].filename}`;
    }

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
        const { title, subtitle, description, tags, newTag } = req.body;

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
            description,
            slug
        });

        let newTagId = null;

        if (newTag && newTag.trim()) {
          newTagId = await createTagIfNotExists(newTag);
        }

        let tagIds = [];

        if (tags) {
          tagIds = Array.isArray(tags) ? tags : [tags];
        }

        if (newTagId) {
          tagIds.push(newTagId);
        }

        await setProjectTags(newProject.id, tagIds);

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
    const { title, subtitle, description, tags, newTag } = req.body;

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
      description,
      slug: newSlug
    });

    let newTagId = null;

    if (newTag && newTag.trim()) {
      newTagId = await createTagIfNotExists(newTag);
    }

    let tagIds = [];

    if (tags) {
      tagIds = Array.isArray(tags) ? tags : [tags];
    }

    if (newTagId) {
      tagIds.push(newTagId);
    }

    await setProjectTags(updatedProject.id, tagIds);

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
    const result = await db.query(
      "SELECT slug FROM projects WHERE id = $1",
      [id]
    );

    const slug = result.rows[0]?.slug;

    await deleteProjectWithItems(id, slug);

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
  const { slug } = req.params;

  console.log("BODY:", req.body);
  const noteOrder = req.body.note_order
    ? parseInt(req.body.note_order, 10)
    : null;

  const isMain = req.body.is_main === "on";

  const image = req.file
    ? `/images/uploads/projects/${slug}/${req.file.filename}`
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
  const { id, slug } = req.params;

  const { note_order, layout, description } = req.body;

  const image = req.file
    ? `/images/uploads/projects/${slug}/${req.file.filename}`
    : null;

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

export const deleteTag = async (req, res) => {
  const rawId = req.params.id;
  const id = parseInt(rawId, 10);
  const { slug } = req.query;

  if (isNaN(id)) {
    console.log("INVALID TAG ID:", rawId);

    return res.redirect("/admin/projects");
  }

  try {
    await deleteTagById(id);

    req.session.message = {
      type: "success",
      text: "Tag deleted successfully"
    };

  } catch (err) {
    console.error(err);

    req.session.message = {
      type: "error",
      text: "Failed to delete tag"
    };
  }

  if (!slug) {
    return res.redirect("/admin/projects");
  }

  res.redirect(`/admin/projects/${slug}`);
};