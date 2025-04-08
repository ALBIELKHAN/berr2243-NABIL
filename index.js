const { MongoClient } = require('mongodb');

const drivers = [
  {
    name: "John Doe",
    vehicleType: "Sedan",
    isAvailable: true,
    rating: 4.6
  },
  {
    name: "Alice Smith",
    vehicleType: "SUV",
    isAvailable: false,
    rating: 4.5
  }
];

// show the data in the console
console.log(drivers);

// show all the drivers' names
drivers.forEach(driver => {
  console.log(driver.name);
});

// add additional driver to the drivers array
drivers.push({
  name: "Siti Aisyah",
  vehicleType: "Hatchback",
  isAvailable: true,
  rating: 4.9
});

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    const startTime = Date.now();
    await client.connect();
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log("Connected to MongoDB!");
    console.log("Connection time:", duration, "ms");

    const db = client.db("testDB2");
    const collection = db.collection("drivers");

    // Insert all driver data into MongoDB
    await collection.insertMany(drivers);
    console.log("All drivers inserted!");

    // Query all drivers from MongoDB and print
    const result = await collection.find().toArray();
    console.log("All drivers in MongoDB:");
    console.log(result);

     // Find available drivers with rating >= 4.5
    const availableDrivers = await collection.find({
        isAvailable: true,
        rating: { $gte: 4.5 }
      }).toArray();
      console.log("Available drivers with rating >= 4.5:");
      console.log(availableDrivers);

        // Update John Doe's rating by 0.1
      const updateResult = await collection.updateOne(
        { name: "John Doe" },  // Filter
        { $inc: { rating: 0.1 } }  // Update operation
      );
      console.log("Driver updated with result:", updateResult);

    // Delete unavailable drivers
      const deleteResult = await collection.deleteMany({
        isAvailable: false
      });
      console.log("Unavailable drivers deleted with result:", deleteResult);

    // Verify remaining drivers
    const remainingDrivers = await collection.find().toArray();
    console.log("Remaining drivers after deletion:");
    console.log(remainingDrivers);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
