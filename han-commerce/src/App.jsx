import { useState } from "react";

import "./App.css";

import Footer from "./devComponenets/footer";

import { Outlet } from "react-router-dom";
import DefaultNavBar from "./devComponenets/defaultNav";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <DefaultNavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
