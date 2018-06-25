var express = require('express');
var router = express.Router();

const multer = require('multer')
const middlewareUpload = require('../midllewares/upload')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', uploaderMem.single('image'), middlewareUpload.upload,function(req, res, next) {
  const image = req.imageURL
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    image
  })
});

module.exports = router;
