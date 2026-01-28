import mysql2 from "mysql2/promise";
import env from "./env.js";

const pool = mysql2.createPool(env.dbConfig);
export default pool;
