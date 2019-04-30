require("dotenv").config();

// =======================
//REQUIRED DEPENDENCIES
// =======================
var Spotify = require("node-spotify-api")
var fs = require("fs")
var command = process.argv[2]

require("dotenv").config();

// =======================
//KEYS
// =======================
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

// =======================
// LIRI COMMANDS
// =======================

function startApp (command, input) {
    switch (command) {
        case "search-songs":
            spotifyThis();
            break;
        case "feeling lucky":
            readFile();
            break;
        default:
            console.log("here");


    }
}

// spotifyThis();

// =======================
//FUNCTIONS
// =======================


function spotifyThis() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    
        var song = data.tracks.items;
      console.log("SONG NAME: " + song[0].name); 
      console.log("URL: " + song[0].href)
      console.log("ALBUM: " + song[0].album.name)
      });
}

function readFile () {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return error
        }
        console.log(data)
    })
}

startApp(command);