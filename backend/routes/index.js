const express = require("express");
const authRoute = require("./auth.route");
const addressRoute = require("./address.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: authRoute,
  },
  {
    path: "/address",
    route: addressRoute,
  },
];

defaultRoutes.forEach((route) => {
  if (route.isProtected) {
    router.use(route.path, route.route);
  } else {
    router.use(route.path, route.route);
  }
});

module.exports = router;
