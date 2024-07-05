import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard";
import NYSCIndex from "./dashboard/nyscIndex";
import SchoolIndex from "./dashboard/schoolIndex";
import Students from "./dashboard/students";

import { NotEmail, NotNewsletter } from "./EmptyState/NotFound";
import ErrorView from "./error";
import HomeNoAuth from "./home";
import HomeAuth from "./home/auth";
import NotFound from "./notFound";

export {
  Students,
  SchoolIndex,
  NYSCIndex,
  Dashboard,
  Login,
  Register,
  ErrorView,
  NotFound,
  NotEmail,
  NotNewsletter,
  HomeAuth,
  HomeNoAuth,
};
