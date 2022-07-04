const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const moviesController = require("./HTTP/controllers/moviesController");
const membersController = require("./HTTP/controllers/membersController");
const subscriptionsController = require("./HTTP/controllers/subscriptionsController");
var utils = require("./utils");

const app = express();
const port = 8000;

connectDB();

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// controller
app.use("/movies", moviesController);
utils.getAllMoviesFromWS();
app.use("/members", membersController);
utils.getAllMembersFromWS();
app.use("/subscriptions", subscriptionsController);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
