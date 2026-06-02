import { Request, Response } from "express";
import pool from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";

export const subscribePlan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { plan_id } = req.body;
    const user_id = req.user?.id;

    // Validate plan_id exists in DB before proceeding
    const [planRows]: any = await pool.query(
      "SELECT id FROM plans WHERE id = ?",
      [plan_id]
    );
    if (!planRows || planRows.length === 0) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // Cancel any existing active subscription
    const [existingSubscriptions]: any = await pool.query(
      "SELECT * FROM subscriptions WHERE user_id = ? AND status = 'active'",
      [user_id]
    );
    if (existingSubscriptions.length > 0) {
      await pool.query(
        "UPDATE subscriptions SET status = 'cancelled' WHERE user_id = ? AND status = 'active'",
        [user_id]
      );
    }

    // Set expiry date 30 days from today
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await pool.query(
      "INSERT INTO subscriptions (user_id, plan_id, status, expires_at) VALUES (?, ?, ?, ?)",
      [user_id, plan_id, "active", expiresAt]
    );

    res.json({ message: "Plan subscribed successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Subscription failed" });
  }
};

export const getUserSubscriptions = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user_id = req.user?.id;

    const [subscriptions]: any = await pool.query(
      `SELECT
        subscriptions.id,
        subscriptions.status,
        subscriptions.plan_id,
        subscriptions.created_at,
        subscriptions.expires_at,
        plans.name,
        plans.price,
        plans.features
      FROM subscriptions
      JOIN plans ON subscriptions.plan_id = plans.id
      WHERE subscriptions.user_id = ?
      ORDER BY subscriptions.created_at DESC`,
      [user_id]
    );

    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
