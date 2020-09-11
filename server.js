const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var geoip = require('geoip-lite');
var ip = require('ip');

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route

app.get("/:id", (req, res) => {

  shortUrl = req.params.id;
  db.shorturl.findOne({ where: { short_url: shortUrl } })
  .then(data => {    
    if(data ==undefined){
      res.status(404).send(
         "Url Not Found"
      )
    } else {
//check whether url is expired or not
      let expired_at = new Date(data.expired_at);
      let current_date = new Date();
      if(expired_at.getTime() < current_date.getTime()){
        res.send("url is expired");
      }    
      

     var geo = geoip.lookup(ip.address());
     //LOCAL HOST NOT GETTING COUNTRY. SO I SET INDIA IN DEFALT..BUT IT WILL WORK ON SERVER.  
     if(geo == null) {
       var country = "INDIA";
     } else {
       var country = geo.country;
     }      

     db.urlClick.create({
      short_url_id: data.id,
      country: country,
      ip_address: ip.address(),
     }).then(function(){
       res.redirect(data.long_url);
     })
     
    }
    
  })
  .catch(err => {
    res.status(404).send({
      message:
        err.message || "Some error occurred while retrieving data."
    });
  });

});

require("./app/routes/url.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
