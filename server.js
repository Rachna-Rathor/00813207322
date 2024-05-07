const express = require("express");
const fetch = require("node-fetch"); // Corrected the import
const app = express();

const PORT = 9876;
let numbers = new Set(); // Corrected variable name

app.use((req, res, next) => {
  req.uniqueNumbers = numbers;
  next();
});

app.get("/number/e", async (req, res) => {
  try {
    const response = await fetch("http://20.244.56.144/test/primes");
    const data = await response.json();
    data.forEach((number) => {
      // Add each number to the set
      numbers.add(number);
    });
    res.status(200).json({ message: "Numbers fetched successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error fetching numbers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("App is listening on port 9876");
});
