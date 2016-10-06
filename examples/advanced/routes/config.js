module.exports = function (req, res, next) {
    res.render('config', {
        title: "Exposing Configuration Data"
    });
};
