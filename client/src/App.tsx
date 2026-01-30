import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./App.css";
import  { Toaster } from "react-hot-toast";

function App() {
  return (
    <>

      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
