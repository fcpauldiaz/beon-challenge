const express = require('express');
const carRoute = require('./car.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/car',
    route: carRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
