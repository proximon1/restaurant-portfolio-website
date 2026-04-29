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
    ORDER BY 
      is_main DESC,      -- fő kép mindig felül
      note_order ASC NULLS LAST
  `, [projectId]);

  return result.rows;
};

export const updateLandingData = async (data) => {
  await db.query(`
    UPDATE landing
    SET
      main_video_horizontal = COALESCE($1, main_video_horizontal),
      about_image_small = COALESCE($2, about_image_small),
      about_image_large = COALESCE($3, about_image_large),
      about_video = COALESCE($4, about_video),
      about_description = COALESCE($5, about_description),
      main_video_vertical = COALESCE($6, main_video_vertical)
    WHERE id = 1
  `, [
    data.main_video_horizontal,
    data.about_image_small,
    data.about_image_large,
    data.about_video,
    data.about_description,
    data.main_video_vertical
  ]);
};

export const insertProject = async ({ title, subtitle, description, slug }) => {
  const result = await db.query(`
    INSERT INTO projects (title, subtitle, description, slug, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *
  `, [title, subtitle, description, slug]);

  return result.rows[0];
};

export const updateProjectBySlug = async (oldSlug, { title, subtitle, description, slug }) => {
  const result = await db.query(`
    UPDATE projects
    SET title = $1,
        subtitle = $2,
        description = $3,
        slug = $4
    WHERE slug = $5
    RETURNING *
  `, [title, subtitle, description, slug, oldSlug]);

  return result.rows[0];
};

export const deleteProjectWithItems = async (projectId, slug) => {
  const folderPath = path.join(
    "public",
    "images",
    "uploads",
    "projects",
    slug
  );

  try {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
  } catch (err) {
    console.error("Folder delete error:", err.message);
  }

  await db.query(`
    DELETE FROM project_tags
    WHERE project_id = $1
  `, [projectId]);

  await db.query(`
    DELETE FROM project_items
    WHERE project_id = $1
  `, [projectId]);

  await db.query(`
    DELETE FROM projects
    WHERE id = $1
  `, [projectId]);
};

export const insertProjectItem = async ({
  projectId,
  image,
  is_main,
  note_order,
  layout,
  description
}) => {

  if (note_order !== null) {
    await db.query(`
      UPDATE project_items
      SET note_order = note_order + 1
      WHERE project_id = $1
      AND note_order >= $2
      AND is_main = false
    `, [projectId, note_order]);
  }

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

  const current = await db.query(`
    SELECT project_id, note_order
    FROM project_items
    WHERE id = $1
  `, [id]);

  const projectId = current.rows[0].project_id;
  const oldOrder = current.rows[0].note_order;

  if (note_order !== null && oldOrder !== null && note_order !== oldOrder) {

    if (note_order > oldOrder) {
      await db.query(`
        UPDATE project_items
        SET note_order = note_order - 1
        WHERE project_id = $1
        AND note_order > $2
        AND note_order <= $3
        AND id != $4
      `, [projectId, oldOrder, note_order, id]);

    } else {
      await db.query(`
        UPDATE project_items
        SET note_order = note_order + 1
        WHERE project_id = $1
        AND note_order >= $2
        AND note_order < $3
        AND id != $4
      `, [projectId, note_order, oldOrder, id]);
    }
  }

  if (is_main) {
    await db.query(`
      UPDATE project_items
      SET is_main = false
      WHERE project_id = $1
    `, [projectId]);
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

export const normalizeProjectItemOrder = async (projectId) => {
  const res = await db.query(`
    SELECT id
    FROM project_items
    WHERE project_id = $1 AND is_main = false
    ORDER BY note_order ASC NULLS LAST, id ASC
  `, [projectId]);

  const items = res.rows;

  for (let i = 0; i < items.length; i++) {
    await db.query(`
      UPDATE project_items
      SET note_order = $1
      WHERE id = $2
    `, [i + 1, items[i].id]);
  }
};

export const getAllTags = async () => {
  const res = await db.query(`
    SELECT id, name
    FROM tags
    ORDER BY name
  `);

  return res.rows;
};

export const getProjectTagIds = async (projectId) => {
  const res = await db.query(`
    SELECT tag_id
    FROM project_tags
    WHERE project_id = $1
  `, [projectId]);

  return res.rows.map(r => r.tag_id);
};

export const setProjectTags = async (projectId, tagIds) => {
  await db.query(`
    DELETE FROM project_tags
    WHERE project_id = $1
  `, [projectId]);

  if (!tagIds || tagIds.length === 0) return;

  const values = tagIds.map((_, i) => `($1, $${i + 2})`).join(",");

  await db.query(`
    INSERT INTO project_tags (project_id, tag_id)
    VALUES ${values}
  `, [projectId, ...tagIds]);
};

export const createTagIfNotExists = async (name) => {
  if (!name || !name.trim()) return null;

  const trimmed = name.trim().toLowerCase();

  const existing = await db.query(
    `SELECT id FROM tags WHERE LOWER(name) = $1`,
    [trimmed]
  );

  if (existing.rows.length) {
    return existing.rows[0].id;
  }

  const res = await db.query(
    `INSERT INTO tags (name) VALUES ($1) RETURNING id`,
    [name.trim()]
  );

  return res.rows[0].id;
};

export const getLandingData = async () => {
  const res = await db.query(`SELECT * FROM landing WHERE id = 1`);
  return res.rows[0];
};

export const deleteTagById = async (tagId) => {
  await db.query(`
    DELETE FROM project_tags
    WHERE tag_id = $1
  `, [tagId]);

  await db.query(`
    DELETE FROM tags
    WHERE id = $1
  `, [tagId]);
};

export const getProjectItemById = async (id) => {
  const result = await db.query(
    "SELECT * FROM project_items WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// models/adminModel.js

export const createSession = async (ip) => {
  const result = await db.query(`
    INSERT INTO page_sessions (started_at, ip)
    VALUES (NOW(), $1)
    RETURNING id
  `, [ip]);

  return result.rows[0].id;
};

export const finishSession = async (sessionId) => {
  await db.query(`
    UPDATE page_sessions
    SET 
      ended_at = NOW(),
      duration_seconds = EXTRACT(EPOCH FROM (NOW() - started_at))
    WHERE id = $1
  `, [sessionId]);
};

export const getAvgTimeLast30Days = async () => {
  const result = await db.query(`
    SELECT 
      ROUND(AVG(total_time)) AS avg_seconds
    FROM (
      SELECT 
        ip,
        SUM(
          EXTRACT(EPOCH FROM (
            COALESCE(ended_at, last_activity_at) - started_at
          ))
        ) AS total_time
      FROM page_sessions
      WHERE 
        started_at >= NOW() - INTERVAL '30 days'
      GROUP BY ip
    ) t;
  `);

  return result.rows[0]?.avg_seconds || 0;
};