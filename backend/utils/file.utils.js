const multer = require('multer');

const fileField = 'photos';
const maxFileCnt = 30;
const maxFileSize = 1024 * 1024 * 100;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    }
});

const upload = multer({
    storage,
    limits: {
        files: maxFileCnt,
        fileSize: maxFileSize,
    }
});

module.exports.uploadFile = upload.array(fileField, maxFileSize);