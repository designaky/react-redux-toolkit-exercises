import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import './styles/App.css';
import { useEffect } from "react";

function App() {

  useEffect(() => {
  }, [])
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

