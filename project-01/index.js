const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/practice-db-29-04-2024")
  .then(() => console.log("MongoDB Connected Successfully!!"))
  .catch((err) => console.log("DB Error:", err));

//Schema Creation
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gennder: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Model Creation
const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `<ul>
        ${allDBUsers
          .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
          .join("")}
    </ul>`;
  return res.send(html);
});

//REST API
app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

//If routs are same for different methods, we can write like this
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    const body = req.body;

    const updatedUsers = await User.findByIdAndUpdate(req.params.id, {
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    console.log(updatedUsers); //It will return
    res.status(201).json({ msg: "User updated successfully!!" });
  })
  .delete(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log(deletedUser);
    res.status(201).json(deletedUser);
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  const results = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  res.status(201).json(results);
});

app.listen(PORT, () => console.log(`Server is started on port::${PORT}`));
