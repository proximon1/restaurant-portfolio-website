import {
  getProjectBySlug,
  getProjectItems,
  getProjectTags,
  getMainImage,
  getAllProjects
} from "../models/projectModel.js";

export const renderProject = async (req, res) => {
  const { slug } = req.params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return res.status(404).send("Not found");
  }

  const tags = await getProjectTags(project.id);
  const mainImage = await getMainImage(project.id);
  const items = await getProjectItems(project.id);

  const projects = await getAllProjects();

  const currentIndex = projects.findIndex(
    p => p.slug === project.slug
  );

  const previousProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : null;

  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  res.render("projects/project", {
    project,
    items,
    tags,
    mainImage,
    previousProject,
    nextProject
  });
};