// =======================
//REQUIRED DEPENDENCIES
// =======================
var Spotify = require("node-spotify-api")
var fs = require("fs")
var command = process.argv[2];

require("dotenv").config();


// =======================
//KEYS
// =======================
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

// =======================
// LIRI COMMANDS
// =======================

function startApp(command) {
    switch (command) {
        case "search-songs":
            spotifyThis();
            break;
        case "feeling lucky":
            readFile();
            break;
        default:
            // console.log("here");


    }
}

// spotifyThis();

// =======================
//FUNCTIONS
// =======================


function spotifyThis() {
    // console.log("I work!");

    var songName = process.argv[3];
    // console.log(songName);

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var songInfo = data.tracks.items;
        // console.log(songInfo)
        console.log("ARTIST(S): " + songInfo[0].artists[0].name); 
        console.log("SONG NAME: " + songInfo[0].name);
        console.log("ALBUM: " + songInfo[0].album.name)
        console.log("URL: " + songInfo[0].href)
    });
}
spotifyThis()

function readFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return error
        }
        console.log(data)
    })
}

startApp(command);