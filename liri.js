//---- REQUIRE .env ----
require("dotenv").config();


//---- REQUIRE keys.js ----
const keys = require("./keys.js");


//---- REQUIRE fs ----
const fs = require("fs");


//---- REQUIRE AXIOS ----
const axios = require("axios");

//---- REQUIRE MOMENT ----
const moment = require("moment");


//---- INITIALIZE SPOTIFY ----
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);


//---- API KEYS ----
let ticketmaster = (keys.ticketmaster);
// console.log(ticketmaster);
let omdb = (keys.omdb);


//---- USER COMMAND AND INPUT ----
const command = process.argv[2];
const userInput = process.argv[3];

//---- LIRI COMMANDS ----
function startApp(command, userInput) {

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
            // console.log("\nHi, I'm LIRI. \n\nI can help you find songs, concerts, and movies by typing following commands: \n\nFOR SONG INFO: search-songs 'song name' \nFOR CONCERT INFO: search-concerts 'artist name' \nFOR MOVIE INFO: search-movies 'movie name' \n\nSee what I can do! Type: search-songs 'on a good day'");
    }
}

startApp(command, userInput);


//---- FUNCTIONS ----

//SPOTIFY
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

        let songInfo = data.tracks.items;
        // console.log(songInfo)
        console.log("ARTIST(S): " + songInfo[0].artists[0].name);
        console.log("SONG NAME: " + songInfo[0].name);
        console.log("ALBUM: " + songInfo[0].album.name)
        console.log("URL: " + songInfo[0].href)
    });
}


function readFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return error
        }
        console.log(data)
    })
}


//OMDB 
function searchMovies() {
    const movie = process.argv[3];

    axios.get("http://www.omdbapi.com/?y=&apikey=trilogy&t=" + movie)
        .then(
            function (response) {
                console.log(response.data);
            })
        .catch(function (error) {
            console.log(error);
        });
}


//TICKETMASTER
function searchConcerts() {
    // console.log("Concerts Here!");
    const concert = process.argv[3];
    // console.log(concert)

    axios.get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" + ticketmaster.id + "&keyword=" + concert)
        .then(function (response) {
            const concertInfo = response.data._embedded.events;
            const concertDate = response.data._embedded.events[0].dates.start.dateTime;
            const date = moment(concertDate).format("MM/DD/YYYY");
            // console.log(concertDate);
            // console.log(date)
            // console.log(response.data._embedded.events);

            console.log("ARTIST: " + concertInfo[0].name);
            console.log("DATE: " + date);
            console.log("VENUE: " + concertInfo[0]._embedded.venues[0].name);
            console.log("VENUE LOCATION: " + concertInfo[0]._embedded.venues[0].address.line1 + " " + concertInfo[0]._embedded.venues[0].city.name + ", " + concertInfo[0]._embedded.venues[0].state.stateCode + " " + concertInfo[0]._embedded.venues[0].postalCode);
        })
        .catch(function (error) {
            console.log(error);
        });

}