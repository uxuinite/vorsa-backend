const {
  listAll,
  listById,
  create,
  update,
  remove,
} = require("../controller/items.controller");

const {upload} = require("../config/service")

const items = (app) => {
  app.get("/api/items", listAll);
  app.get("/api/items/:Id", listById);
  app.post("/api/items",upload.single("image_upload"),create);
  app.put("/api/items", update);
  app.delete("/api/items", remove);
};
module.exports = {
  items,
};
