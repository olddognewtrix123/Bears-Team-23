const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/guest', (req, res) => {
 let headerObject = req.headers
 //the x-forwarded-for property of the header does not appear for local host so add an alternative or will
 //error out locally on split to get the ip address the rest of the requests are common to loacl and remote
 let ip = (headerObject['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
 ip = (ip === "::1") ? "local" : ip
    res.json({
     authenticated: false,
     userip: ip,
     username: "Guest",
     displayname: "Guest"
   });
});

  app.get('/profile', (req, res) => {
   let headerObject = req.headers
   //the x-forwarded-for property of the header does not appear for local host so add an alternative or will
   //error out locally on split to get the ip address the rest of the requests are common to loacl and remote
   let ip = (headerObject['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
   ip = (ip === "::1") ? "local" : ip
      res.json({
        authenticated: false,
        userip: ip,
        username: null,
        displayname: null
     });
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
