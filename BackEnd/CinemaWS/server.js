const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const usersController = require("./HTTP/controllers/usersController");
const subscriptionController = require("./HTTP/controllers/subscriptionController");

const app = express();
const port = 8001;

connectDB();

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// controller
app.use("/users", usersController);
app.use("/subscriptionWS", subscriptionController);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
