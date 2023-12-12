require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn")
const Register = require("./models/registration");
const PORT = process.env.PORT || 3001;
const router = require("./router/auth_router");
const connectDb = require("./db/conn")
app.use(express.json());
app.use('/api/auth',router);

router.route("/").get((req,res) => {
res.status(200).send("Hello from APP")
})

connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`app listening to ${PORT}`)
})
})