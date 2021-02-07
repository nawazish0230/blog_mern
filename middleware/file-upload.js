const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/jpg': 'png',
    'image/jpeg': 'jpeg',
    'image/png': 'jpg'
}

const fileUpload = multer({
    limits: 5000000,
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            // console.log(file)
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, new Date().getTime() + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        // console.log(file)
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        // console.log(MIME_TYPE_MAP[file.mimetype])
        // console.log(isValid)
        let error = isValid ? null : new Error('Invalid Mime type');
        cb(error, isValid)
    }
});

module.exports = fileUpload;