import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import { initialDishes, categories } from "./data.js";
import "./App.css";

function App() {
  return (
    <main className="page">
      <Header title="Addis Eats Menu" subtitle="Prices in ETB. Spicy dishes are marked." />
      <div className="menus">
        {categories.map((category) => (
          <Menu key={category} category={category} dishes={initialDishes} />
        ))}
      </div>
    </main>
  );
}

export default App;
