import app from "./app";
import pool from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000; // ✅ use Railway's PORT

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();