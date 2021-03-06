const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'transcripts');
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname);
    // rename to transcript
    cb(null, 'transcript.pdf');
  },
});

const upload = multer({ storage: storage }).single('file');

module.exports = {
  upload,
};
