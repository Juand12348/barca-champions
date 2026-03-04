import { useState, useEffect } from "react";
import './index.css';

export default function App() {
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
    <div
  style={{
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    fontFamily: "Arial",
    padding: "40px 20px",
    background: "linear-gradient(180deg, #0b1d3a, #1e3a8a)",
    color: "#ffffff",
    margin: 0
  }}
>
      <h1 style={{ color: "#a50044" }}>
        🏆 Días desde la última Champions del Barça
      </h1>

      <h2 style={{ fontSize: "60px", color: "#ffcc00" }}>
        {daysPassed}
      </h2>

      <p style={{ color: "#cfd8dc" }}>Y seguimos contando...</p>

      <hr style={{ margin: "40px 0", border: "1px solid #a50044" }} />

      <h2 style={{ color: "#a50044" }}>📜 Línea del Tiempo</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {timeline.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedYear(item)}
            style={{
              width: "250px",
              padding: "15px",
              backgroundColor: "#a50044",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#6a0030")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#a50044")
            }
          >
            {item.year}
          </div>
        ))}
      </div>

      {selectedYear && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#1e3a8a",
            border: "2px solid #ffcc00"
          }}
        >
          <h3 style={{ color: "#ffcc00" }}>{selectedYear.year}</h3>
          <p style={{ marginTop: "10px" }}>{selectedYear.event}</p>
          <button
            onClick={() => setSelectedYear(null)}
            style={{
              marginTop: "15px",
              padding: "8px 15px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#a50044",
              color: "white",
              cursor: "pointer"
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      <hr style={{ margin: "50px 0", border: "1px solid #a50044" }} />

      <h2 style={{ color: "#a50044" }}>🎮 Simular Temporada</h2>

      <button
        onClick={simulateSeason}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#ffcc00",
          color: "#0b1d3a",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Simular
      </button>

      {simulationResult && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          {simulationResult}
        </div>
      )}
    </div>
  );
}
