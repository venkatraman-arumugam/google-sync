var express = require("express");
var gapi = require("../lib/gapi");
var router = express.Router();

router.get("/", function(req, res) {
  if (!Object.keys(gapi.client.credentials).length) {
        res.render("index", {
                title: "Sample app",
                url: gapi.url,
                url_text: "Get permissions"
              });
    
  } else {
        res.redirect("/cal");
  }
});

module.exports = router;
