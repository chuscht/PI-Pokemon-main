import "./App.css";

import { Route } from "react-router-dom";

import CreatePoke from "./components/CreatePoke";
import Cards from "./components/Cards";
import NavBar from "./components/NavBar";
import Detail from "./components/Detail";
import LandingPage from "./components/LandingPage";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div className="App">
      <Route path={"/home"} component={NavBar} />

      <Route exact path={"/"} component={LandingPage} />

      <Route exact path={"/home"} component={Cards} />

      <Route path={"/createpoke"} component={NavBar} />

      <Route exact path={"/createpoke"} component={CreatePoke} />

      <Route exact path={"/home/:id"} component={Detail} />
    </div>
  );
}

export default App;
