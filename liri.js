require("dotenv").config();
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    goHead();
    break;
}

function tweets() {
  client.get("statuses/user_timeline", function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++)
        console.log(
          "Tweet " +
            [i + 1] +
            ": " +
            tweets[i].text +
            "\n Created on: " +
            tweets[i].created_at +
            "\n---------------------------"
        );
      console.log("---------------------------");
    }
  });
}

function movie() {
  movieName = encodeURI(process.argv[3]);

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    if (!error) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Producing Country: " + JSON.parse(body).Country);
      console.log("Language(s): " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors : " + JSON.parse(body).Actors);
    }
  });
}

function spotifySong() {
  spotify.search({ type: "track", query: value, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(JSON.stringify("Artist Name: " + data.tracks.items[0].album.artists[0].name, null, 2));
    console.log(JSON.stringify("Song: " + data.tracks.items[0].name, null, 2));
    console.log(JSON.stringify("Album: " + data.tracks.items[0].album.name, null, 2));
    console.log(JSON.stringify("Preview Link: " + data.tracks.items[0].preview_url,null, 2));
  });
}

function goHead() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    action = dataArr[0];
    value = dataArr[1];
    switch (action) {
      case "my-tweets":
        tweets();
        break;

      case "spotify-this-song":
        spotifySong();
        break;

      case "movie-this":
        movie();
        break;
    }
  });
}

// twitter (my-tweets)
// display last 20 tweets
// tweet time stamp

// spotify (spotify-this-song -->)
// 1. artist
// 2. song name
// 3. preview link
// 4. album

// ombd (movie-this -->)
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
