var express = require('express'),
    exphbs  = require('express3-handlebars'),
    state   = require('../../'), // "express-state"
    routes  = require('./routes'),
    app     = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',

}));
app.set('view engine', 'handlebars');

//Setting a `state namespace` namespaces the data that you
//expose through `express-state` behind a singular namespace
// under the global `window` object.
//Everything that we expose in this application will be under
//the `Example` namespace.
app.set('state namespace', 'Example');

app.expose('Example Application', 'title');


//Here, we're exposing an empty object at `Example.Data`. This
//will be populated when going to the `/chart/` route
app.expose({}, 'Data');

//Here, we're exposing our Flickr API key as configuration data.
//It will be available under Example.Config
app.expose({
    flickrApiKey: 'a69b6be6c1588a38011526945ad2cf56',
}, 'Config');

app.get('/', routes.home);
app.get('/chart/', routes.chart);
app.get('/config/', routes.config);

app.listen(3000);
console.log('Server listening on port 3000');
