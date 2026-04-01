import db from "../db.js";

export const getProjectBySlug = async (slug) => {
  const result = await db.query(`
    SELECT p.*, pi."image-url" AS main_image_url
    FROM projects p
    LEFT JOIN project_items pi 
      ON pi.project_id = p.id 
      AND pi.is_main = true
    WHERE p.slug = $1
  `, [slug]);

  return result.rows[0];
};

export const getAllProjects = async () => {
  const result = await db.query(`
    SELECT p.*, pi."image-url" AS main_image_url
    FROM projects p
    LEFT JOIN project_items pi 
      ON pi.project_id = p.id 
      AND pi.is_main = true
    ORDER BY p.id ASC
  `);

  return result.rows;
};

export const getProjectItems = async (projectId) => {
  const result = await db.query(`
    SELECT *
    FROM project_items
    WHERE project_id = $1
    AND (is_main IS FALSE OR is_main IS NULL)
    ORDER BY note_order ASC
  `, [projectId]);

  return result.rows;
};

export const getProjectTags = async (projectId) => {
  const result = await db.query(`
    SELECT t.name
    FROM tags t
    JOIN project_tags pt ON t.id = pt.tag_id
    WHERE pt.project_id = $1
  `, [projectId]);

  return result.rows;
};

export const getMainImage = async (projectId) => {
  const result = await db.query(`
    SELECT "image-url"
    FROM project_items
    WHERE project_id = $1
    AND is_main = true
    LIMIT 1
  `, [projectId]);

  return result.rows[0];
};