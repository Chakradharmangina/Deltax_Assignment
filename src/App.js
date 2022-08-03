import "./App.css";
import HomePage from "./components/homePge";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/welcomepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
