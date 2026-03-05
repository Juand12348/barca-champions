import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Barca from "./Barca";
import City from "./City";

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* Barra superior */}
        <div className="top-bar">
          <p className="time">Hora: 01:34</p>
          <p className="weather">Clima: 26°C 🌧️</p>
        </div>

        {/* Buscador */}
        <div className="search-bar">
          <input type="text" placeholder="Barra de búsqueda" />
        </div>

        {/* Tabs de navegación */}
        <div className="tabs">
          <Link to="/" className="tab active">Inicio</Link>
          <button className="tab">Champions</button>
          <button className="tab">Fechas</button>
        </div>

        {/* Rutas */}
        <Routes>
          {/* Pantalla de inicio */}
          <Route
            path="/"
            element={
              <>
                <div className="card bg-kevin"></div>

                <div className="row small">
                  <Link to="/barca" className="card bg-barca">
                    <h3>Barcelona</h3>
                  </Link>
                  <Link to="/city" className="card bg-city">
                    <h3>City</h3>
                  </Link>
                </div>

                <div className="card bg-messi"></div>
              </>
            }
          />

          {/* Pantallas de desgracias */}
          <Route path="/barca" element={<Barca />} />
          <Route path="/city" element={<City />} />
        </Routes>
      </div>
    </Router>
  );
}
