Express State Advanced Example
==============================

This example shows how to use `express-state` to share data to the server, in the form of an array of Flickr Photos. Here's how it works:

* Flickr Photos are requested via the Flickr API through the npm `request` module. These photos are represented by an array. (see `server.js`)

* HTML showing a grid of photos is rendered on the server, through Handlebars. (see `index.hbs`)

* Using `express-state`, the array of photos is exposed to the client, via `res.expose(photos, 'Photos')`

* On the client, the array of Photos is transformed into a Y.ModelList. When a photo is clicked, its data is retrieved from the ModelList, and passed into a Y.LightboxView to render a lightbox.

