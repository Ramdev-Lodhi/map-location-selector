const express = require("express");
const authRoute = require("./auth.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/",
    route: authRoute,
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
