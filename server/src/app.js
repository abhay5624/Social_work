require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn")
const Register = require("./models/registration");
const PORT = process.env.PORT || 3001;
const router = require("./router/auth_router");
const connectDb = require("./db/conn");
const errorMiddleware = require("./middleware/error_middleware");
app.use(express.json());
app.use('/api/auth',router);
app.use(errorMiddleware);
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
router.route("/").get((req,res) => {
res.status(200).send("Hello from APP")
})

connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`app listening to ${PORT}`)
})
})