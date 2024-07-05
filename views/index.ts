import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./dashboard";

import { NotEmail, NotNewsletter } from "./EmptyState/NotFound";
import ErrorView from "./error";
import HomeNoAuth from "./home";
import HomeAuth from "./home/auth";
import NotFound from "./notFound";

export {
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
