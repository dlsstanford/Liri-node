# Liri-node

LIRI (Language Interpretation and Recognition Interface) is a command line node application that takes in parameters and gives you back data. The commands provided allow the user to pull song, movie, and tweet information from the corresponding Spotify, OMDB, or Twitter API.

## Technologies Used
- Node.js

## Dependencies
- dotenv
- moment
- node-spotify-api
- npm
- omdb
- request
- twitter

## Grab a Copy

1. Clone or fork and run using `node liri.js` in the command line after navigating to root directory
### Important
As the keys required to access the Spotify and Twitter API's are linked to personal accounts, you must supply your own .env file containing these keys in order to run this application on your own device

## Commands

LIRI can run the 3 following commands:

>node liri.js my-tweets

- This will show your last 20 tweets and when they were created in your terminal/bash window.

>node liri.js spotify-this-song 'song name here'
  
- This will show the following information about the song in your terminal/bash window:

  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from
  
> node liri.js movie-this 'movie name here'
- This will show the following information about the movie in your terminal/bash window:

  - Title of the movie.
  - Year the movie came out.
  - IMDB Rating of the movie.
  - Rotten Tomatoes Rating of the movie.
  - Country where the movie was produced.
  - Language of the movie.
  - Plot of the movie.
  - Actors in the movie.
















