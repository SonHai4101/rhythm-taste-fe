import { createBrowserRouter } from "react-router";
import App from "../App";
import { index } from "../pages";
import { Project } from "../pages/Project";
import { About } from "../pages/About";
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: index,
      },
      {
        path: "/projects",
        Component: Project,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
]);
