require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
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
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++)
                console.log("Tweet " + [i + 1] + ": " + tweets[i].text);
            console.log("---------------------------");
            console.log("Created on: " + JSON.stringify(tweets[i]).created_at);
        }
    });
}

function movie() {
    movieName = encodeURI(process.argv[3])
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
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
            spotify.search({ type: 'track', query: value, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(JSON.stringify(data.tracks.items, null, 2));


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