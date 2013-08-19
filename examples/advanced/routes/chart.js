
//Normally, we would get this data by making a GET request somewhere
//but for this example, let's assume we have it on file somewhere.

//Note: you usually don't want to use require() to get large chunks
//of data, since it will block.
var chartData = require('../static/chartData.json');

module.exports = function (req, res, next) {

    //The empty Data object that we exposed in `server.js` now
    //contains the chart data. This can be found in `Example.Data`
    //on the client.
    res.expose(chartData, 'Data');
    res.render('chart', {
        title: "Exposing Chart Data"
    });
};
