import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import IsAuthenticated from "./components/IsAuthenticated";
import IsNotAuthenticated from "./components/IsNotAuthenticated";
import Navbar1 from "./components/Navbar1";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route element={<IsNotAuthenticated />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        <Route element={<Navbar1 />}>
          <Route element={<IsAuthenticated />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
