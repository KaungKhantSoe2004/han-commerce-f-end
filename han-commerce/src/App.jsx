import { useState } from "react";

import "./App.css";

import Footer from "./devComponenets/footer";

import { Outlet } from "react-router-dom";
import DefaultNavBar from "./devComponenets/defaultNav";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <DefaultNavBar />
      <Outlet />
      <Footer />
    </Provider>
  );
}

export default App;
