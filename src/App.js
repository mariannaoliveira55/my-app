import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questionario from "./Questionário";
import Resultado from "./Resultado";
import AdminPage from "./AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Questionario />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/admin" element={<AdminPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
