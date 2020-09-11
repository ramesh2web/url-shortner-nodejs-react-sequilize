module.exports = (sequelize, Sequelize) => {
  const urlClick = sequelize.define("url_click", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    short_url_id: {
    type: Sequelize.INTEGER
    },
    country: {
      type: Sequelize.STRING
    },
   ip_address: {
      type: Sequelize.STRING
    },    

  });

  return urlClick;
};
