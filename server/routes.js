module.exports = function(app){
    var Router = require('koa-router');

    // Base API Route
    var apiRoutes = new Router();

    // Routes
    var userRoutes = require('./api/user');
    apiRoutes.use('/api/user', userRoutes.routes(), userRoutes.allowedMethods());

    // var thingsRoutes = require('./api/thing');
    // apiRoutes.use('/api/thing', thingsRoutes.routes(), thingsRoutes.allowedMethods());

    // Load all the routes nested in apiRoutes
    app.use(apiRoutes.routes());
}
