const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

// Path to the CSV file
const csvFilePath = "data.csv"; // Change this to the path of your CSV file

// API endpoint
const apiEndpoint = "http://127.0.0.1:8090/api/collections/products/records";

// Function to read CSV file and make POST requests
function uploadItems() {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", async (row) => {
      const itemData = {
        Image: row["Image"],
        Name: row["Name"],
        Price: row["Price"],
        Category: row["Category"],
        Stock: row["Stock"],
        Description: row["Description"],
      };

      try {
        const response = await axios.post(apiEndpoint, itemData);
        console.log(itemData);
        if (response.status === 200) {
          console.log(`Successfully added item ${row["Name"]}`);
        } else {
          console.log(
            `Failed to add item ${row["Name"]}. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          `Failed to add item ${row["Name"]}. Error: ${error.message}`
        );
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
}

// Start the upload process
uploadItems();
