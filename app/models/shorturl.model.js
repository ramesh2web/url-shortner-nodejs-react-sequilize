module.exports = (sequelize, Sequelize) => {
  const ShortUrl = sequelize.define("shorturl", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    short_url: {
      type: Sequelize.STRING
    },
   long_url: {
      type: Sequelize.STRING
    },  
    expired_at: {
      type: Sequelize.DATEONLY
    },

  });

  return ShortUrl;
};
