var express = require('express');
var gapi = require('../lib/gapi');
var router = express.Router();

router.get('/', function (req, res) {
  if (!Object.keys(gapi.client.credentials).length) {
    res.redirect("/")

  } else {
    res.render('cal.pug', {
      title: 'Sample App Calendar',
      calendar: gapi.my_calendars
    });
  }

});

router.post('/insert', function (req, res) {
  var events = {
    summary: {},
    start: {},
    end: {}
  };

  var addEventObj = req.body;
  events.summary = addEventObj.title;
  events.start.dateTime = addEventObj.start;
  events.end.dateTime = addEventObj.end;

  gapi.cal.events.insert({
    calendarId: 'primary',
    resource: events,
  }, function (err, event) {
    console.log("events");
    console.log(events);
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return res.status(401).send('' + err);
    }
    var new_events = addEventObj
    new_events["id"] = event.data.id
    console.log(new_events)
    gapi.my_calendars.push(new_events)
    console.log('Event created:' + event.data.summary);
    return res.status(200).send('Event created:' + event.data.summary);
  });
});

router.delete('/delete', function (req, res) {
  var params = {
    calendarId: 'primary',
    eventId: "",
  };
  params.eventId = req.body.id
  gapi.cal.events.delete(params, function (err) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return res.status(401).send('' + err);
    }

    for (index = 0; index < gapi.my_calendars.length; ++index) {
      if (gapi.my_calendars[index].id == req.body.id) {
        gapi.my_calendars.splice(index, 1)
        break;
      }
    }
    return res.status(200).send("Event deleted.");
  });
});

router.put('/update', function (req, res) {
  console.log(req.body);
  var params = {
    calendarId: 'primary',
    eventId: req.body.id,
    resource: {
      end: {
        dateTime: req.body.end
      },
      start: {
        dateTime: req.body.start
      },
      summary: req.body.title
    },
  };

  gapi.cal.events.update(params, function (err) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return res.status(401).send('' + err);
    }
    for (index = 0; index < gapi.my_calendars.length; ++index) {
      if (gapi.my_calendars[index].id == req.body.id) {
        gapi.my_calendars[index].title = req.body.title
        gapi.my_calendars[index].start = req.body.start
        gapi.my_calendars[index].end = req.body.end
        break;
      }
    }
    return res.status(200).send("Event modify");
  });
});

module.exports = router;