import express from "express";
import route from './app/route/user'
require("dotenv").config();

//envs
const PORT = process.env.SERVER_PORT || 4999

//express
const app = express();
app.use(route)


app.listen(PORT, () => console.log(`Running in PORT ${PORT}`));
