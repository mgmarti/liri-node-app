# liri-node-app
### Description
---
Assignment to create LIRI, a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data from API's. LIRI uses the Spotify API, Ticketmaster API, and OMDB API to search for songs, concerts, and movies.

### Requirements
---
**APIs:** Spotify, Ticketmaster, OMDB

**Node Packages:** 
1. **Dotenv:** 
    *Command Line: 'npm install dotenv'*

2. **Moment:**
    *Command Line: 'npm install moment'*

3. **AXIOS:**
    *Command Line: 'npm install axios'*

### Commands
---
|Commands |Function |
|---------|---------|
|search-songs    | uses the **Spotify** API to take a song name from the user and returns the artist name, album, and song preview link |
|search-movies   | uses the **OMDB** API to take a movie name and returns the name, cast, release year, IMDB and Rotten Tomatoes rating, country of origin, language and plot |
|search-concerts | uses the **Ticketmaster** API to take a band/artist name from the user and returns that band's/artist's next concert  |

### Functionality
---
1. search-songs
    
    Function takes the command (search-songsclear) and the userInput (artist), and returns the artist name, album, and song preview link.
     
     ![image of search-songs](/images/search-songs.gif)

2. search-movies
    
    Function takes the command (search-movies) and the userInput (movie name), and returns title, cast, release date, ratings, country of origin, original language and plot.
     
     ![image of search-movies](/images/search-movies.gif)

3. search-concerts
    
    Function takes the command (search-movies) and the userInput(artist), and returns the next concert time and date for that artist, as well as location and city.
     
     ![image of search-concerts](/images/search-concerts.gif)


