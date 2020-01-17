const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:github_username', DevController.update);
routes.get('/devs/:github_username', DevController.read);
routes.delete('/devs/:github_username', DevController.delete);

routes.get('/search', SearchController.index);

module.exports = routes; 