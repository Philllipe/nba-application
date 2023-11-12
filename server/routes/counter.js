const express = require("express");
const router = express.Router();
const cors = require("cors");
const AWS = require("aws-sdk");

router.use(cors());

// Configure AWS SDK for running locally

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   sessionToken: process.env.AWS_SESSION_TOKEN,
//   region: "ap-southeast-2",
// });

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "phillipe-s3-counter"; // specify bucket name here
const objectKey = "counter.json";

async function createS3bucket() {
  try {
    await s3.createBucket({ Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
    // Initialise JSON data on bucket creation
    const jsonData = {
      visits: 0,
    };
    await uploadJsonToS3(jsonData);
  } catch (err) {
    if (err.statusCode === 409) {
      console.log(`Bucket already exists: ${bucketName}`);
    } else {
      console.log(`Error creating bucket: ${err}`);
    }
  }
}

// Upload the JSON data to S3
async function uploadJsonToS3(jsonData) {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: JSON.stringify(jsonData), // Convert JSON to string
    ContentType: "application/json", // Set content type
  };

  try {
    await s3.putObject(params).promise();
    console.log("JSON file uploaded successfully.");
  } catch (err) {
    console.error("Error uploading JSON file:", err);
  }
}

// Retrieve the object from S3
async function getObjectFromS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    const parsedData = JSON.parse(data.Body.toString("utf-8"));
    return parsedData;
  } catch (err) {
    console.error("Error fetching JSON file:", err);
    return null;
  }
}

// GET request to increment counter and return counter value
router.get("/", async (req, res, next) => {
  try {
    const counter = await getObjectFromS3();
    if (counter) {
      counter.visits++;
      await uploadJsonToS3(counter);
      res.send(counter);
    } else {
      res.status(500).send({ error: "Failed to fetch counter" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Create S3 bucket if it doesn't exist
createS3bucket();

module.exports = router;
