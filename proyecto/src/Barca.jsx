import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Barca() {
  const lastChampionsDate = new Date("2015-06-06T21:00:00");
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
    { year: 2017, event: "PSG 4-0. Primera gran alerta europea." },
    { year: 2018, event: "Roma 3-0. Remontada inesperada." },
    { year: 2019, event: "Liverpool 4-0 en Anfield." },
    { year: 2020, event: "Bayern 8-2. Crisis total." },
    { year: 2021, event: "Eliminación en octavos." },
    { year: 2022, event: "Eliminación en fase de grupos." },
    { year: 2023, event: "Europa League nuevamente." }
  ];

  const simulateSeason = () => {
    const outcomes = [
      "❌ Eliminado en fase de grupos",
      "❌ Eliminado en octavos",
      "❌ Eliminado en cuartos",
      "❌ Eliminado en semifinales",
      "😮 Remontada histórica... pero eliminado después",
      "🏆 Campeón (probabilidad extremadamente baja)"
    ];
    const randomIndex = Math.floor(Math.random() * outcomes.length);
    setSimulationResult(outcomes[randomIndex]);
  };

  return (
    <div className="team-page">
      {/* Flecha para volver */}
      <Link to="/" className="back-button">⬅ Volver</Link>

      <h1>⚽ Barça - Días desde la última Champions</h1>
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
