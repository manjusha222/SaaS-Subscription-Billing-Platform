import Express = require("express");
import authRouter from "./routes/authRouter";
import planRoutes from "./routes/planRoutes";
import subscriptionsRoutes from "./routes/subscriptionRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = Express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-app.vercel.app" 
  ],
  credentials: true
}));

app.use(Express.json());


app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/users", userRoutes);

export default app;