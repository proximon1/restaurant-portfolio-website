import { getProjectBySlug, getProjectItems, getProjectTags, getMainImage } from "../models/projectModel.js";

export const renderProject = async (req, res) => {
  const { slug } = req.params;

  const project = await getProjectBySlug(slug);
  const tags = await getProjectTags(project.id);
  const mainImage = await getMainImage(project.id);

  if (!project) {
    return res.status(404).send("Not found");
  }

  const items = await getProjectItems(project.id);

  res.render("projects/project", {
    project,
    items,
    tags,
    mainImage
  });
};