module.exports = app => {
  const shortUrl = require("../controllers/shortUrl.controller.js");

  var router = require("express").Router();

  // Create a new Short Url
  router.post("/", shortUrl.create);

  // Retrieve all Short Url
  router.get("/", shortUrl.findAll);  

  app.use('/api/shortUrl', router);
};
