const config = require('../config/default.json')
const environment = process.env.NODE_ENV || 'development'
const {google} = require('googleapis');
const client = config[environment].client_id,
    secret = config[environment].client_secret,
    redirect = config[environment].callback_url,
    oauth2Client = new google.auth.OAuth2(client, secret, redirect),
    scopes = ['https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar']      
    calendar_auth_url = oauth2Client.generateAuthUrl({
 access_type: 'offline',
 scope: scopes
    }) 

google.options({auth : oauth2Client})
var my_calendars = [],
    my_profile = {};

exports.url = calendar_auth_url;
exports.client = oauth2Client;
exports.cal = google.calendar('v3');
exports.plus = google.plus('v1');
exports.my_calendars = my_calendars;
exports.my_profile = my_profile;