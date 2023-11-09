import { createBrowserRouter } from "react-router-dom";
import StackList from "./components/StackList";

const router = createBrowserRouter([{
  path: "/",
  element: <StackList />
}])

export default router