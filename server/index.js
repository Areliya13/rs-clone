var express = require('express');
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    console.log(req);
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
