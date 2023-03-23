const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { typesInDb } = require("./src/controllers/controllers");
require("dotenv").config();
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  typesInDb();
  server.listen(process.env.PORT, () => {
    console.log("%s listening at ", process.env.PORT); // eslint-disable-line no-console
  });
});
