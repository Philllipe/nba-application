const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");
router.use(cors());

// Function to create query string
const createQuery = (query) => {
  let q = "";
  for (const key in query) {
    q += `${key}=${query[key]}&`;
    // If the value is an array, add [] to the key
    if (Array.isArray(query[key])) {
      q = q.replace(key, `${key}[]`);
    }
  }
  return q;
};

// Environment variables
const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
const SEATGEEK_KEY = process.env.SEATGEEK_KEY;
const MAPS_KEY = process.env.MAPS_KEY;

// Home Page
router.get("/", function (req, res, next) {
  res.render("index", { title: "NBA Web App API" });
});

// Endpoint to retrieve games given a specific query
router.get("/games", function (req, res, next) {
  const options = {
    hostname: "balldontlie.io",
    port: 443,
    path: `/api/v1/games?${createQuery(req.query)}`,
    method: "GET",
  };
  const url = `https://${options.hostname}${options.path}`;
  axios
    .get(url)
    .then((response) => {
      res.writeHead(response.status, { "content-type": "application/json" });
      return response.data;
    })
    .then((rsp) => {
      res.write(JSON.stringify(rsp));
      res.end();
    })
    .catch(() => {
      res.status(400).json({ status: "error", message: "bad request" });
    });
});

// Endpoint to retrieve specific game given an ID
router.get("/games/:id", function (req, res, next) {
  const options = {
    hostname: "balldontlie.io",
    port: 443,
    path: `/api/v1/games/${req.params.id}`,
    method: "GET",
  };
  const url = `https://${options.hostname}${options.path}`;
  axios
    .get(url)
    .then((response) => {
      res.writeHead(response.status, { "content-type": "application/json" });
      return response.data;
    })
    .then((rsp) => {
      res.write(JSON.stringify(rsp));
      res.end();
    })
    .catch(() => {
      res.status(404).json({ status: "error", message: "Game not found!" });
    });
});

// Endpoint to retrieve players statistics given a specific query
router.get("/stats", function (req, res, next) {
  const options = {
    hostname: "balldontlie.io",
    port: 443,
    path: `/api/v1/stats?${createQuery(req.query)}`,
    method: "GET",
  };
  const url = `https://${options.hostname}${options.path}`;
  axios
    .get(url)
    .then((response) => {
      res.writeHead(response.status, { "content-type": "application/json" });
      return response.data;
    })
    .then((rsp) => {
      res.write(JSON.stringify(rsp));
      res.end();
    })
    .catch(() => {
      res.status(400).json({ status: "error", message: "bad request" });
    });
});

// GET /youtube
router.get("/youtube", function (req, res, next) {
  const options = {
    hostname: "www.googleapis.com",
    port: 443,
    path: `/youtube/v3/search?type=video&part=snippet&videoEmbeddable=true&maxResults=1&videoDefinition=high&key=${YOUTUBE_KEY}&${createQuery(
      req.query
    )}`,
    method: "GET",
  };
  const url = `https://${options.hostname}${options.path}`;
  axios
    .get(url)
    .then((response) => {
      res.writeHead(response.status, { "content-type": "application/json" });
      return response.data;
    })
    .then((rsp) => {
      res.write(JSON.stringify(rsp));
      res.end();
    })
    .catch(() => {
      res.status(500).json({ status: "error", message: "server error" });
    });
});

// Retrieve Google Maps API key
router.get("/maps/api", function (req, res, next) {
  res.json({ key: MAPS_KEY });
});

// Endpoint to retrieve an event given a specific query
router.get("/seatgeek", function (req, res, next) {
  const options = {
    hostname: "api.seatgeek.com",
    port: 443,
    path: `/2/events?per_page=1&client_id=${SEATGEEK_KEY}&${createQuery(
      req.query
    )}`,
    method: "GET",
  };
  const url = `https://${options.hostname}${options.path}`;
  axios
    .get(url)
    .then((response) => {
      res.writeHead(response.status, { "content-type": "application/json" });
      return response.data;
    })
    .then((rsp) => {
      res.write(JSON.stringify(rsp));
      res.end();
    })
    .catch(() => {
      res.status(500).json({ status: "error", message: "server error" });
    });
});

module.exports = router;
