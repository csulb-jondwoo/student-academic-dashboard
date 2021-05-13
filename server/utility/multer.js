/*global process*/
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/transcript/`)
  },

  filename: function (req, file, cb) {
    // rename to transcript
    cb(null, 'transcript.pdf')
  },
})

const upload = multer({ storage: storage })

module.exports = {
  upload,
}
