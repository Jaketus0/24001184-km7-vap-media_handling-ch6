const multer = require ('multer');


const upload = multer({
    limits: {fileSize: 200000},
    fileFilter: (req, file, cb) => {
        const allowedType = ["image/jpg", "image/png", "image/jpeg"];
        if(allowedType.includes(file.mimetype)){
            cb(null, true);
        }else{ 
            const err = new Error("File type not allowed");
            cb(err, false);
        }
    },
    onError: (err, next) => {
        next(err);
    }
})

module.exports = upload;