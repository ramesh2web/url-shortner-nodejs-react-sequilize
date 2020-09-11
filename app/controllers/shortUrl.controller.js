const db = require("../models");
const ShortUrl = db.shorturl;
const Op = db.Sequelize.Op;
const shorten=require('simple-short');
shorten.conf({length:5})

// Create and Save a new short url
exports.create = (req, res) => {  
   // Validate request   
   let long_url = req.body.long_url;
  if (!long_url) {
    res.status(400).send({
      status: 'Failed',
      message: "Url Cannot Be empty"
    });
    return;
  }

  var sid=shorten(long_url); 
  var date = new Date();
   date.setMonth(date.getMonth()+1);
  
    const body = {
      long_url: req.body.long_url,
      short_url: sid,
      expired_at: date,
    };

    //cneck if it alreay exist then return the same 

    ShortUrl.findOne({where : { short_url: sid } }).then(data=> {
      if(data == undefined) {
         // Save url in the database    
      ShortUrl.create(body)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the short Url."
        });
      });

      } else {
        return res.send(data);
      }

    })
  
   

  // Create a short url
 
};
exports.getClickCount = async (id)=> {
    try {
     let data =  await db.sequelize.query('Select count(*) as total from url_clicks where short_url_id=:short_url_id',
     {  replacements: { short_url_id: id }, type: db.sequelize.QueryTypes.SELECT });
    return data;
    } catch(error){
      throw error;
    }
}
exports.getTopcountries = async (id)=> {
  try {
   let data =  await db.sequelize.query('select count(country) as count_of_country, country as top_country from url_clicks where short_url_id=:short_url_id group by country order by count_of_country desc limit 5',
   {  replacements: { short_url_id: id }, type: db.sequelize.QueryTypes.SELECT });
  return data;
  } catch(error){
    throw error;
  }
}

// Retrieve all short ruls from the database.
exports.findAll = async (req, res) => { 

  let data = [];

   const shortUrls  = await ShortUrl.findAll();
   var short_url_length = shortUrls.length;  
    shortUrls.forEach( (element) => {
      Promise.all([this.getClickCount(element.id), this.getTopcountries(element.id)]).then(result => { 
         
         let top_country =   Array.prototype.map.call(result[1], s => s.top_country).toString(); 
                         
        data.push(
          {
            short_url: element.short_url,
            long_url: element.long_url,
            click: result[0][0].total,
            top_countries: top_country    
          }
        )  

      }).catch(error=> {
        console.log(error);
               
      }).then(function(){
        short_url_length --;
        if(short_url_length == 0) {
         res.send(data);
        }

      });
     
    
     
   });
    
};


