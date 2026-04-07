import db from "../db.js";
import fs from "fs";
import path from "path";

export const getAdminByUsername = async (username) => {
  const result = await db.query(
    "SELECT * FROM admin_users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

export const getProjectsWithItemCount = async () => {
  const result = await db.query(`
    SELECT 
      p.id,
      p.title,
      p.slug,
      p.subtitle,
      p.created_at,
      COUNT(pi.id) AS item_count
    FROM projects p
    LEFT JOIN project_items pi ON pi.project_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};

export const getProjectItemsByProjectId = async (projectId) => {
  const result = await db.query(`
    SELECT *
    FROM project_items
    WHERE project_id = $1
    ORDER BY id ASC
  `, [projectId]);

  return result.rows;
};

export const updateLandingData = async (data) => {
  await db.query(`
    UPDATE landing
    SET
      main_video = COALESCE($1, main_video),
      about_image_small = COALESCE($2, about_image_small),
      about_image_large = COALESCE($3, about_image_large),
      about_video = COALESCE($4, about_video),
      about_description = COALESCE($5, about_description)
    WHERE id = 1
  `, [
    data.main_video,
    data.about_image_small,
    data.about_image_large,
    data.about_video,
    data.about_description
  ]);
};

export const insertProject = async ({ title, subtitle, slug }) => {
  const result = await db.query(`
    INSERT INTO projects (title, subtitle, slug, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING *
  `, [title, subtitle, slug]);

  return result.rows[0];
};

export const updateProjectBySlug = async (oldSlug, { title, subtitle, slug }) => {
  const result = await db.query(`
    UPDATE projects
    SET title = $1,
        subtitle = $2,
        slug = $3
    WHERE slug = $4
    RETURNING *
  `, [title, subtitle, slug, oldSlug]);

  return result.rows[0];
};

export const deleteProjectById = async (id) => {
  await db.query(`
    DELETE FROM projects
    WHERE id = $1
  `, [id]);
};

export const insertProjectItem = async ({
  projectId,
  image,
  is_main,
  note_order,
  layout,
  description
}) => {
  await db.query(`
  INSERT INTO project_items 
  (project_id, "image-url", is_main, note_order, layout, description)
  VALUES ($1, $2, $3, $4, $5, $6)
`, [projectId, image, is_main, note_order, layout, description]);
};

export const updateProjectItemById = async (id, {
  image,
  is_main,
  note_order,
  layout,
  description
}) => {

  if (is_main) {
    await db.query(`
      UPDATE project_items
      SET is_main = false
      WHERE project_id = (
        SELECT project_id FROM project_items WHERE id = $1
      )
    `, [id]);
  }

  let result;

  if (image) {
    result = await db.query(`
      UPDATE project_items
      SET 
        "image-url" = $1,
        is_main = $2,
        note_order = $3,
        layout = $4,
        description = $5
      WHERE id = $6
      RETURNING *
    `, [image, is_main, note_order, layout, description, id]);
  } else {
    result = await db.query(`
      UPDATE project_items
      SET 
        is_main = $1,
        note_order = $2,
        layout = $3,
        description = $4
      WHERE id = $5
      RETURNING *
    `, [is_main, note_order, layout, description, id]);
  }

  return result.rows[0];
};

export const deleteProjectItemById = async (id) => {
  const result = await db.query(`
    SELECT "image-url"
    FROM project_items
    WHERE id = $1
  `, [id]);

  const imagePath = result.rows[0]?.["image-url"];

  await db.query(`
    DELETE FROM project_items
    WHERE id = $1
  `, [id]);

  if (imagePath) {
    const fullPath = path.join("public", imagePath);

    fs.unlink(fullPath, (err) => {
      if (err) console.error("File delete error:", err);
    });
  }
};