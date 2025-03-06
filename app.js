import express from "express";
import morgan from "morgan";
import userRoute from "./src/resources/router/user.routes.js";
import adminRoute from "./src/resources/router/admin.routes.js";
import laptopRoute from "./src/resources/router/laptop.routes.js";

const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to Lap Now");
});


  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1", laptopRoute);




  export default app;