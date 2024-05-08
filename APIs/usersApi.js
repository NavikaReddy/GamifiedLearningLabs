const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');

userApp.use(exp.json());
//signup
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


//signin
userApp.post("/signin", async (request, response) => {
  const usersCollection = request.app.get("usersCollection");
  const { username, password } = request.body;

  try {
    // Check if user exists
    const user = await usersCollection.findOne({ username });

    if (!user) {
      response.status(404).send({ message: "User not found" });
      return;
    }

    // Compare passwords
    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      response.status(401).send({ message: "Incorrect password" });
      return;
    }

    // If user exists and password is correct, redirect to home page or send success response
    response.status(200).send({ message: "Sign in successful", user });
  } catch (err) {
    console.error("Error in user sign-in:", err);
    response.status(500).send({ message: "Internal server error" });
  }
});

//get the user
userApp.get("/user/:userId", async (request, response) => {
  const usersCollection = request.app.get("usersCollection");
  const userId = request.params.userId;

  try {
    // Find the user by ID
    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      response.status(404).send({ message: "User not found" });
      return;
    }

    // Respond with the user's username
    response.status(200).send({ username: user.username });
  } catch (err) {
    console.error("Error fetching user data:", err);
    response.status(500).send({ message: "Internal server error" });
  }
});




module.exports = userApp;
