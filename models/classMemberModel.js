import e from "express";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

class classMember {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.class_member ORDER BY class_member_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async findClassMemberById(id) {
    try {
      const result = await db.query(
        "SELECT * FROM public.class_member WHERE class_member_id = $1",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

export default classMember;
