const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');

userApp.use(exp.json());
userApp.post("/register", async (request, response) => {
  const usersCollection = request.app.get("usersCollection");
  const newUser = request.body;

  try {
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ username: newUser.username });
    if (existingUser) {
      response.status(200).send({ message: "User already exists!!" });
    } else {
      // Hash password
      const hashedPassword = await bcryptjs.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      // Insert new user
      await usersCollection.insertOne(newUser);
      response.status(201).send({ message: "User created" });
    }
  } catch (err) {
    console.log("Error in user registration:", err);
    response.status(500).send({ message: "Internal server error" });
  }
});

module.exports = userApp;
