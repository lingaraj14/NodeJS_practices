require("./db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

//Routes
const urlRoute = require("./routes/url");

//Middlewares
app.use(express.json());

app.use("/url", urlRoute);
app.use("/", urlRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
