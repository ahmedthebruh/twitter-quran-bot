const express = require("express");
const port = process.env.PORT || 3000;
const app = new express();
app.use(express.json());
var Twit = require("twit");
var config = require("./config");
var T = new Twit(config);
const cron = require("node-cron");
const axios = require("axios");
let numberOfAyah = 14;
let urlAyah = `https://api.alquran.cloud/v1/ayah/${numberOfAyah}/ar.asad`;



cron.schedule("* * * * *", () => {
  ++numberOfAyah;
  urlAyah = `https://api.alquran.cloud/v1/ayah/${numberOfAyah}/ar.asad`;
  axios.get(urlAyah).then((response) => {
      T.post(
        "statuses/update",
        { status: response.data.data.text },
        (err, resp) => {
          console.log(resp);
          console.log(err);
        }
      );
  });
});



