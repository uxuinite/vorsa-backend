const multer = require("multer");
const image_path = "C:/xampp/htdocs/image_path/vorsa_news";

const upload = multer({
    storage : multer.diskStorage({
        destination : function(req, file, callback){
            callback(null,image_path)
        }
    }),
    limits : {
        fileSize : 1024 * 1024 *3
    }
})

module.exports = {
    upload
}