import mysql from "mysql2/promise";
console.log("MYSQLHOST =", process.env.MYSQLHOST);
console.log("MYSQLPORT =", process.env.MYSQLPORT);
console.log("MYSQLUSER =", process.env.MYSQLUSER);
console.log("MYSQLDATABASE =", process.env.MYSQLDATABASE);
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default pool;