import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./pages/Menu";

function Home() {
  return (
    <div>
      <h1>Welcome to Addis Eats</h1>
      <p>Delicious food delivered across Addis Ababa.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;