import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;