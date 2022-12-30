import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../Home/Home/Home";
import About from "../../Home/About/About";
import Media from "../../Home/Media/Media";
import Login from "../../Home/Login/Login";
import SignUp from "../../Home/SignUp/SignUp";
import PostDetail from "../../Home/PostDetail/PostDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      // {
      //   path: "/about",
      //   element: <About></About>,
      // },
      {
        path: "/media",
        element: <Media></Media>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/postdetail/:id",
        element: <PostDetail></PostDetail>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allposts/${params.id}`),
      },
    ],
  },
  {
    path: "/about",
    element: <About></About>,
  },
]);

export default router;
