const express = require("express");
const app = express();
const multer  = require('multer')
const cors = require("cors");

// setup multer for file upload
var storage = multer.diskStorage(
    {
        destination: './public' ,
        filename: function (req, file, cb ) {
            cb( null,  req.params.id + "-User-" + Date.now() + '-'+ file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));
  
app.use(express.json());
// serving front end public files
app.use(express.static(__dirname + "/../public"));

// route for file upload
app.post("/api/uploadfile/:id", upload.any(), (req, res, next) => {
    console.log(" file successfully uploaded !!");
    res.sendStatus(200);
});

app.listen(3001, () => console.log("Listening on port 3001"));

