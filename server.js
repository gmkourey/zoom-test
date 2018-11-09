const express = require("express"); //In this example, we're using an express server
const jwt = require('jsonwebtoken'); // JWT is our way to authenticate
const rp = require('request-promise'); // Using request-promise to make the HTTP requests
const config = require("./config"); // Create a config file with the API and Secret Key found at: https://developer.zoom.us/me/#api

// Initialize the express server
const app = express();

// Create the payload to feed into JWT below.
const payload = {
    iss: config.API_Key,
    exp: ((new Date()).getTime() + 2500)    
};

// Automatically creates header, and returns JWT
const token = jwt.sign(payload, config.Secret_Key);

/* This is the object that will be feed into request-promise. Endpoints and the playground 
 be found at: https://developer.zoom.us/playground/#/Meetings/meetingCreate */ 
var options = {
    method: 'POST',
    uri: 'https://api.zoom.us/v2/users/grant.kourey@gmail.com/meetings',
    qs: {
        access_token: token // Adds (ex. ?access_token=JFUE8NM725...) and any other parameters
    },
    headers: {
        'User-Agent': 'Zoom-Jwt-Request',
        'content-type': 'application/json'
    },
    body: {
        "topic": "Another Meeting POST",
        "type": 2,
        "start_time": "2018-11-09T04:57:54.423Z",
        "duration": 0,
        "timezone": "America/Los Angeles",
        "password": "",
        "agenda": "This is a test meeting",
        "recurrence": {
            "type": 1,
            "repeat_interval": 0,
            "weekly_days": 1,
            "monthly_day": 0,
            "monthly_week": -1,
            "monthly_week_day": 1,
            "end_times": 0,
            "end_date_time": "2018-11-09T04:57:54.425Z"
        },
        "settings": {
            "host_video": true,
            "participant_video": true,
            "cn_meeting": false,
            "in_meeting": false,
            "join_before_host": false,
            "mute_upon_entry": false,
            "watermark": false,
            "use_pmi": false,
            "approval_type": 2,
            "registration_type": 1,
            "audio": "both",
            "auto_recording": "none",
            "enforce_login": true,
            "enforce_login_domains": "",
            "alternative_hosts": ""
        }
    },
    json: true // Automatically stringifies the body to JSON
};

// This is where you feed in the options object above to request-promise found on NPM.
rp(options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        // API call failed...
        console.log('API call failed, reason ', err);
    });

// Sets up the server to listen on port 3000 
app.listen(3000, () => {
    console.log("listening on http://localhost::3000");
})