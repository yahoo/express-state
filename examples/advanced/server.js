var express = require('express'),
    exphbs  = require('express3-handlebars'),
    state   = require('../../'), // "express-state"
    YQL     = require('yql'),
    app     = express(),
    config  = {
        flickrApiKey: 'a69b6be6c1588a38011526945ad2cf56'
    };

// Extend Express app with Express State's functionality. This adds the
// `app.expose()` and `res.expose()` methods.
state.extend(app);

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.configure(function () {
    app.use(express.static(__dirname + '/static'));
});

//Setting a `state namespace` namespaces the data that you
//expose through `express-state` behind a singular namespace
// under the global `window` object.
//Everything that we expose in this application will be under
//the `Example` namespace.
app.set('state namespace', 'Example');

//Here, we're exposing our application name,
//available through Example.title
app.expose('MY APP', 'title');

//We're exposing an empty array here within Example.Photos.
//This array will be populated with Photos from Flickr when
//the HTTP response comes through.
app.expose([], 'Photos');

//Here, we're exposing our config variable.
//It will be available under Example.Config
app.expose(config, 'Config');

app.get('/', function (req, res, next) {
    new YQL.exec('select * from flickr.photos.interestingness(24) where api_key=@apiKey', function (response) {
        //get an array of photos from the results
        var photos = response.query.results.photo;

        //add an `src` and `url` property for each photo.
        photos.forEach(function (item, index, array) {

            //The src for the photo
            item.src = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_q.jpg';

            //the url of the photo on Flickr
            item.url = 'http://www.flickr.com/photos/' + item.owner + '/' + item.id;
        });

        //We're exposing request-specific data here, by using
        //res.expose() instead of app.expose()
        res.expose(photos, 'Photos');

        //render the index.hbs page
        res.render('index');
    }, {
        "apiKey": config.flickrApiKey
    });
});

app.listen(3000);
console.log("Application running on http://localhost:3000");
