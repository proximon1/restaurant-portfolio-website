import db from "../db.js";

export const getAdminByUsername = async (username) => {
  const result = await db.query(
    "SELECT * FROM admin_users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};