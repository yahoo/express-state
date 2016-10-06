var http    = require('http'),
    express = require('express'),
    exphbs  = require('express3-handlebars'),
    request = require('request'),
    state   = require('../../'), // "express-state"
    app     = express(),
    config  = {

        //This API key is specifically for this example.
        //You will need to apply for your Flickr API Key
        //http://www.flickr.com/services/api/misc.api_keys.html
        flickrApiKey: 'a69b6be6c1588a38011526945ad2cf56'
    };

// Extend Express app with Express State's functionality. This adds the
// `app.expose()` and `res.expose()` methods.
state.extend(app);

//These two lines sets up handlebars as a view engine for this app
//via the express3-handlebars module.
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

//Sets up the directory from which static files will be served.
app.use(express.static(__dirname + '/static'));


//Setting a `state namespace` namespaces the data that you
//expose through `express-state` behind a singular namespace
// under the global `window` object.
//Everything that we expose in this application will be under
//the `Example` namespace.
app.set('state namespace', 'Example');

//Here, we're exposing our application name,
//available through Example.title
app.expose('MY APP', 'title');


//Here, we're exposing our config variable.
//It will be available under Example.Config
app.expose(config, 'Config');

app.get('/', function (req, res, next) {

    request.get({
        url: 'http://api.flickr.com/services/rest/',
        qs: {
            method: 'flickr.interestingness.getList',
            format: 'json',
            nojsoncallback: 1,
            api_key: config.flickrApiKey
        }
    }, function (error, response, body) {

        if (response.statusCode === 200) {
            var photos = JSON.parse(body).photos.photo;

            //add an `src` and `url` property for each photo.
            photos.forEach(function (item, index, array) {

                //The src for the photo
                item.src = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_q.jpg';

                //A large version of the photo
                item.large = 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_c.jpg';

                //the url of the photo on Flickr
                item.url = 'http://www.flickr.com/photos/' + item.owner + '/' + item.id;
            });

            //We're exposing request-specific data here, by using
            //res.expose() instead of app.expose()
            res.expose(photos, 'Photos');

            //render the index.hbs page
            res.render('index', {
                photos: photos
            });
        }
        else {
            console.log('error: '+ response.statusCode);
            console.log(body);
        }
    });
});

app.listen(3000);
console.log("Application running on http://localhost:3000");
