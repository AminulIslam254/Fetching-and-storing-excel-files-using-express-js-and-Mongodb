const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
var async = require('async');

var Excel = require('exceljs');
var wb = new Excel.Workbook();


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload());

const { connectMongoose, User } = require("./Database.js");

connectMongoose();

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile(path.join(__dirname, "/components/index.html"));
  app.use(express.static(__dirname + '/'))
})

app.post("/data1", (req, res) => {

  var file1 = req.files.myfile1;
  var filename1 = file1.name;
  file1.mv(__dirname + "/uploads/" + filename1, (err) => {
    if (err) {
      res.send(err);
    }
  });

  setTimeout(() => {
    var filePath = path.resolve(__dirname + "/uploads/" + filename1);

    wb.xlsx.readFile(filePath).then(function () {

      var sh = wb.getWorksheet("Sheet1");
      let i, j;

      for (i = 2; sh.getRow(i).getCell(1).value != undefined; i++) {
        let data1 = [];
        for (j = 1; sh.getRow(i).getCell(j).value != undefined; j++) {
          data1.push(sh.getRow(i).getCell(j).value.toString());
        }

        let name = data1[0], email = data1[1], mobile = data1[2], date_of_birth = data1[3], work_experience = data1[4], resume_title = data1[5], current_location = data1[6], postal_address = data1[7], current_employer = data1[8], current_designation = data1[9];
        User.findOne({ email: email }, (err, user) => {
          if (user) {
              console.log("Duplicate Row");
          }
          else {
            const user = new User({
              name, email, mobile, date_of_birth, work_experience, resume_title, current_location, postal_address, current_employer, current_designation
            })
            user.save(err => {
              if (err) {
                console.log("Duplicate Row");

              } else {
                console.log("Successfully Registered");
              }
            })
          }




        })
      }




    }, 1000);


  },100);




  res.sendFile(path.join(__dirname, "/components/returnpage.html"));
  app.use(express.static(__dirname + '/'))
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})