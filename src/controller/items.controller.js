const db = require("../util/db");

const listAll = async (req, res) => {
  const [data] = await db.query("SELECT * FROM items");
  const [count] = await db.query(
    "SELECT COUNT(Id) AS TotalRecode FROM items"
  );
  res.json({
    TotalRecode: count,
    List: data,
  });
};
const listById = async (req, res) => {
  var paramSql = {
    Id: req.params.Id,
  };
  const [data] = await db.query(
    "SELECT * FROM items WHERE Id = :Id",
    paramSql
  );
  res.json({
    List_product: data,
  });
};
const create = async (req, res) => {
  try {
    const { Title, Description, CreateBy } = req.body;
    let Image = null;
    const CreateAt = new Date();

    if (req.file) {
      Image = req.file.filename;
    }

    const param = {
      Title,
      Description,
      Image,
      CreateBy,
      CreateAt,
    };

    const sqlInsert = `
      INSERT INTO items (Title, Description, Image, CreateBy, CreateAt)
      VALUES (:Title, :Description, :Image, :CreateBy, :CreateAt)
    `;

    const [data] = await db.query(sqlInsert, param);

    res.status(201).json({
      message: "Insert successful",
      data: data,
      param: param,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Insert failed",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  var param = {
    Id: req.body.Id,
    Title: req.body.Title,
    Description: req.body.Description,
    Image: req.body.Image,
    CreateBy: req.body.CreateBy,
    CreateAt: req.body.CreateAt,
  };
  var sqlUpdate = `
  UPDATE items 
  SET 
    Id = :Id,
    Title = :Title,
    Description = :Description,
    Image = :Image,
    CreateBy = :CreateBy,
    CreateAt = :CreateAt,
  WHERE Id = :Id
`;
  try {
    const [data] = await db.query(sqlUpdate, param);
    res.json({
      message: "Updated success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};
const remove = async (req, res) => {
  var param = {
    Id: req.body.Id,
  };
  var sqlDelete = "DELETE FROM items WHERE Id = :Id";
  const [data] = await db.query(sqlDelete, param);
  res.json({
    message: "remove success",
    data: data,
  });
};

module.exports = {
  listAll,
  listById,
  create,
  update,
  remove,
};
