const exp = require("express");
const app = exp();
const port = 3500;

// Import routes
const usersApi = require("./APIs/usersApi");
const compileApi=require('./APIs/compileApi')

const path = require("path")
app.use(exp.static(path.join(__dirname,'./build')))

// MongoDB connection
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

client.connect()
  .then(() => {
    const db = client.db("gamiLearnDb");
    const usersCollection = db.collection("users");
    const compilerCollection = db.collection("compiler");
    app.set('usersCollection', usersCollection);
    app.set('compilerColleection',compilerCollection);
    console.log("DB Connection Success");

    // Start server after DB connection
    app.listen(port, () => {
      console.log(`Web server listening on port ${port}`);
    });
  })
  .catch(err => console.log("Database connection error:", err));

// Routes
app.use('/user-api', usersApi);
app.use('/code',compileApi)

module.exports = app;