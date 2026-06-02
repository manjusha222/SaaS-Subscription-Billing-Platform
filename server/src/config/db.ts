import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "Rishaan@1510",
    database: "SaaS_app",
});
export default pool;