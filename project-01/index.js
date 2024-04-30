require("./connection");
const express = require("express");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is started on port::${PORT}`));
