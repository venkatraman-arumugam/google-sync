var express = require('express');
var gapi = require('../lib/gapi');
var router = express.Router();
var Bluebird = require('bluebird')


router.get('/', function (req, res) {
  var code = req.query.code;
  gapi.client.getToken(code, function (err, tokens) {
    console.log(tokens)
    gapi.client.credentials = tokens;
    getData().then((data) => {
      res.redirect("/cal");
    });
  });

});

var getData = function () {

  return gapi.cal.events.list({
    calendarId: 'primary'
  }).then((response) => {
    var events = response.data.items;
    console.log(events)
    gapi.my_calendars.length = 0;
    for (var i = events.length - 1; i >= 0; i--) {
      gapi.my_calendars.push({
        "title": events[i].summary,
        "start": events[i].start.dateTime,
        "end": events[i].end.dateTime,
        "id": events[i].id
      });
    }
    return "done";
  }).catch((err) => {
    console.log('The API returned an error:' + err);
    return 'err';
  });
}

module.exports = router;