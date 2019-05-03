// =======================
//REQUIRED DEPENDENCIES
// =======================
const Spotify = require("node-spotify-api")
const ticketmaster = require("ticketmaster")
const fs = require("fs");
const axios = require("axios");
const command = process.argv[2];

require("dotenv").config();

exports.ticketmaster = {
    id: process.env.TICKETMASTER_ID,
    secret: process.env.TICKETMASTER_SECRET
};

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
        case "search-concerts":
            searchConcerts();
            break;
        case "search-movies":
            searchMovies();
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
// spotifyThis()


function readFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return error
        }
        console.log(data)
    })
}


// function searchMovies() {

// }



function searchConcerts() {
    // console.log("Concerts Here!");
    var concert = process.argv[3];
    // console.log(concert)

    axios.get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=svk7DZeiQqZAGGOSkRZ9PPAduCLi5I6N&keyword=" + concert)
    .then(
        function (response) {
            // const concertInfo = responseevents.name;
            console.log(response.data._embedded.events);
        })
    .catch(function (error) {
            console.log(error);
          });
    
}
searchConcerts();


// ticketmaster(process.env.TICKETMASTER_ID).discovery.v2.event.all()
//     .then(function (result) {
//         console.log(result);
//     });


startApp(command);