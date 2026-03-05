import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function City() {
  // El City ganó su primera Champions en 2023
  const lastChampionsDate = new Date("2023-06-10T21:00:00");

  const [daysPassed, setDaysPassed] = useState(
    Math.floor((Date.now() - lastChampionsDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const [selectedYear, setSelectedYear] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - lastChampionsDate.getTime();
      setDaysPassed(Math.floor(diff / (1000 * 60 * 60 * 24)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Línea del tiempo de las desgracias del City
  const timeline = [
    { year: 2017, event: "Mónaco elimina al City en octavos. Ridículo total." },
    { year: 2018, event: "Liverpool 3-0 en Anfield, fuera en cuartos. Sin reacción." },
    { year: 2019, event: "Tottenham elimina al City en cuartos. Otro fracaso." },
    { year: 2020, event: "Lyon sorprende y elimina al City. Humillación inesperada." },
    { year: 2021, event: "Pierden la final contra Chelsea. Pep sin ideas." },
    { year: 2022, event: "Remontada épica del Madrid en semis. Trauma eterno." }
  ];

  const simulateSeason = () => {
    const outcomes = [
      "❌ Eliminado en fase de grupos",
      "❌ Eliminado en octavos",
      "❌ Eliminado en cuartos",
      "❌ Eliminado en semifinales",
      "😮 Remontada histórica... pero eliminado después",
      "🏆 Campeón (sí, pero ya saben que fue una vez)"
    ];
    const randomIndex = Math.floor(Math.random() * outcomes.length);
    setSimulationResult(outcomes[randomIndex]);
  };

  // Estilos propios del City (celeste + azul marino)
  const cityButtonStyle = {
    background: "linear-gradient(135deg, #6CABDD, #1C2C5B)", // celeste + azul marino
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cityButtonHover = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
  };

  return (
    <div className="team-page">
      {/* Flecha para volver */}
      <Link to="/" className="back-button">⬅ Volver</Link>

      <h1>🔵 City - Días desde su primera Champions</h1>
      <h2>{daysPassed} días</h2>

      <div className="timeline" style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", margin: "20px 0"}}>
        {timeline.map((item, index) => (
          <button
            key={index}
            style={cityButtonStyle}
            onMouseOver={e => Object.assign(e.target.style, cityButtonHover)}
            onMouseOut={e => Object.assign(e.target.style, cityButtonStyle)}
            onClick={() => setSelectedYear(item)}
          >
            {item.year}
          </button>
        ))}
      </div>

      {selectedYear && (
        <div className="card">
          <h3>{selectedYear.year}</h3>
          <p>{selectedYear.event}</p>
        </div>
      )}

      <div className="simulation" style={{marginTop: "20px"}}>
        <button
          style={cityButtonStyle}
          onMouseOver={e => Object.assign(e.target.style, cityButtonHover)}
          onMouseOut={e => Object.assign(e.target.style, cityButtonStyle)}
          onClick={simulateSeason}
        >
          Simular temporada
        </button>
        {simulationResult && <p>{simulationResult}</p>}
      </div>
    </div>
  );
}
