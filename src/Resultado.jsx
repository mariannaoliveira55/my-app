import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const mbtiTipo = location.state?.mbtiTipo || "Desconhecido"; 

  return (
    <div>
      <h1>Resultado do Teste MBTI</h1>
      <h2>Seu tipo MBTI é: {mbtiTipo}</h2>
      <button onClick={() => navigate("/")}>Refazer o teste</button>
    </div>
  );
}

export default Resultado;

