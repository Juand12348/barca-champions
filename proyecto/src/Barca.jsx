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

  const timeline = [
    { year: 2017, event: "Mónaco elimina al City en octavos." },
    { year: 2018, event: "Liverpool 3-0 en Anfield, fuera en cuartos." },
    { year: 2019, event: "Tottenham elimina al City en cuartos." },
    { year: 2020, event: "Lyon sorprende y elimina al City." },
    { year: 2021, event: "Pierden la final contra Chelsea." },
    { year: 2022, event: "Remontada épica del Madrid en semis." }
  ];

  const simulateSeason = () => {
    const outcomes = [
      "❌ Eliminado en fase de grupos",
      "❌ Eliminado en octavos",
      "❌ Eliminado en cuartos",
      "❌ Eliminado en semifinales",
      "😮 Remontada histórica... pero eliminado después",
      "🏆 Campeón (probabilidad baja, pero posible)"
    ];
    const randomIndex = Math.floor(Math.random() * outcomes.length);
    setSimulationResult(outcomes[randomIndex]);
  };

  return (
    <div className="team-page">
      {/* Flecha para volver */}
      <Link to="/" className="back-button">⬅ Volver</Link>

      <h1>🔵 City - Días desde su primera Champions</h1>
      <h2>{daysPassed} días</h2>

      <div className="timeline">
        {timeline.map((item, index) => (
          <button key={index} onClick={() => setSelectedYear(item)}>
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

      <div className="simulation">
        <button onClick={simulateSeason}>Simular temporada</button>
        {simulationResult && <p>{simulationResult}</p>}
      </div>
    </div>
  );
}
