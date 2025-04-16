const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

let db;

async function connectToMongoDB() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db("testDB");
  } catch (err) {
    console.error("Error:", err);
  }
}

connectToMongoDB();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve the HTML file
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/rides', async (req, res) => {
    try {
      const rides = await db.collection('rides').find().toArray();
      res.status(200).json(rides);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch rides" });
    }
  });

  app.post('/rides', async (req, res) => {
    try {
      const result = await db.collection('rides').insertOne(req.body);
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      res.status(400).json({ error: "Invalid ride data" });
    }
  });

  app.patch('/rides/:id', async (req, res) => {
    try {
      const result = await db.collection('rides').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: req.body.status } }
      );
      if (result.modifiedCount == 0) {
        return res.status(404).json({ error: "Ride not found" });
      }
      res.status(200).json({ updated: result.modifiedCount });
    } catch (err) {
      // Handle invalid ID format or DB errors
      res.status(400).json({ error: "Invalid ride ID or data" });
    }
  });

  app.delete('/rides/:id', async (req, res) => {
    try {
      const result = await db.collection('rides').deleteOne({
        _id: new ObjectId(req.params.id)
      });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Ride not found" });
      }
      res.status(200).json({ deleted: result.deletedCount });
    } catch (err) {
      res.status(400).json({ error: "Invalid ride ID" });
    }
  });

   // --- User Endpoints ---
 
 // GET /users1 - Fetch All users1
 app.get('/users1', async (req, res) => {
    try {
    const users1 = await db.collection('users1').find().toArray();
    res.status(200).json(users1);
    } catch (err) {
    res.status(500).json({ error: "Failed to fetch users1" });
    }
   });
   
   // POST /users1 - Create a New User
   app.post('/users1', async (req, res) => {
    try {
    const result = await db.collection('users1').insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
    } catch (err) {
    res.status(400).json({ error: "Invalid user data" });
    }
   });
   
   // PATCH /users1/:id - Update User
   app.patch('/users1/:id', async (req, res) => {
    try {
    const result = await db.collection('users1').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body } // Allows updating any user field
    );
    if (result.modifiedCount == 0) {
    return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ updated: result.modifiedCount });
    } catch (err) {
    res.status(400).json({ error: "Invalid user ID or data" });
    }
   });
   
   // DELETE /users1/:id - Delete User
   app.delete('/users1/:id', async (req, res) => {
    try {
    const result = await db.collection('users1').deleteOne({
    _id: new ObjectId(req.params.id)
    });
    if (result.deletedCount === 0) {
    return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ deleted: result.deletedCount });
    } catch (err) {
    res.status(400).json({ error: "Invalid user ID" });
    }
   });
   
   app.listen(port, () => {
    console.log(`Server running on port ${port}`);
   });


  