const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const session = require('express-session');
userApp.use(session({
  secret: 'abcdef', // Change this to a secure random key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Expiry time in milliseconds (1 day in this example)
  }
}));
userApp.use(exp.urlencoded({extended:true}));
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
      newUser.dijkstraScore=0;
      newUser.dsaTestScore=0;
      newUser.binarySearchScore=0;
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

    // Initialize session object if it doesn't exist
    if (!request.session) {
      request.session = {};
    }

    // Initialize user object in session if it doesn't exist
    if (!request.session.user) {
      request.session.user = {};
    }

    // Assign user data to session object properties
    request.session.user.id = user._id;
    request.session.user.username = user.username;
    request.session.user.email = user.email;
    request.session.user.dijkstraScore = user.dijkstraScore;
    request.session.user.dsaTestScore = user.dsaTestScore;
    request.session.user.binarySearchScore=user.binarySearchScore;
    console.log(request.session.user)
    // If user exists and password is correct, send success response with user data
    response.status(200).send({ message: "Sign in successful", user: request.session.user });
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

userApp.get("/get-users", expressAsyncHandler(async (request, response) => {
  const usersCollection = request.app.get("usersCollection");

  try {
    // Use MongoDB's aggregation framework to compute totalScore and sort by totalScore in descending order
    let usersList = await usersCollection.aggregate([
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          dijkstraScore: 1,
          dsaTestScore: 1,
          binarySearchScore:1,
          totalScore: {
            $add: [
              { $toInt: "$dijkstraScore" },
              { $toInt: "$dsaTestScore" },
              {$toInt:"$binarySearchScore"}
            ]
          }
        }
      },
      {
        $sort: { totalScore: -1 }
      }
    ]).toArray();

    // Send a successful response with status 200 and the sorted user list
    response.status(200).send(usersList);
  } catch (error) {
    // If an error occurs, send an error response with status 500 and the error message
    response.status(500).send({ message: "Error fetching users", error });
  }
}));



userApp.post("/updateDScore", async (request, response) => {
  const usersCollection = request.app.get("usersCollection");
  const scoreEntry = request.body;

  console.log("Request Body:", scoreEntry); // Log the request body

  try {
    const user = request.session.user;
    console.log("Session User:", user); // Log the session user

    // Extract the single key-value pair from the request body
    const [scoreType, newScore] = Object.entries(scoreEntry)[0];
    console.log(`${scoreType}:`, newScore); // Log the score type and new score

    const currentScore = user[scoreType];

    if (parseInt(newScore) > parseInt(currentScore)) {
      const filter = { username: user.username };
      const update = { $set: { [scoreType]: newScore } };
      
      await usersCollection.updateOne(filter, update);
      // Update session user data
      request.session.user[scoreType] = newScore;
      response.status(200).send({ message: "Score updated" });
    } else {
      response.status(200).send({ message: "No update needed" });
    }
  } catch (err) {
    console.error("Error updating score:", err);
    response.status(500).send({ message: "Internal server error" });
  }
});


module.exports = userApp;