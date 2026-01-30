import { Navigate, createBrowserRouter } from "react-router-dom";
import { Audio } from "./pages/audio";
import { Video } from "./pages/video";
import { Header } from "./components/header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {" "}
        <Header />
        <Audio />{" "}
      </>
    ),
  },
  {
    path: "/video",
    element: (
      <>
        {" "}
        <Header />
        <Video />{" "}
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
