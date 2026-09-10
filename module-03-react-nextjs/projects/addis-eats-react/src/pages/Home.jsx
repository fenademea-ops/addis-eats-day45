import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO ADDIS EATS</p>

          <h1>
            Delicious food,
            <br />
            delivered in Addis Ababa.
          </h1>

          <p className="hero-description">
            Discover your favorite Ethiopian and international dishes
            and have them delivered right to your door.
          </p>

          <Link to="/menu" className="hero-button">
            Explore Menu
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section">
        <div className="section-header">
          <h2>Explore Categories</h2>
          <p>Find something delicious to eat.</p>
        </div>

        <div className="category-grid">
          <Link to="/menu?category=Ethiopian" className="home-category-card">
            <span>🇪🇹</span>
            <h3>Ethiopian</h3>
            <p>Traditional local favorites</p>
          </Link>

          <Link to="/menu?category=Pizza" className="home-category-card">
            <span>🍕</span>
            <h3>Pizza</h3>
            <p>Fresh and cheesy pizzas</p>
          </Link>

          <Link to="/menu?category=Burgers" className="home-category-card">
            <span>🍔</span>
            <h3>Burgers</h3>
            <p>Juicy and delicious burgers</p>
          </Link>

          <Link to="/menu?category=Drinks" className="home-category-card">
            <span>🥤</span>
            <h3>Drinks</h3>
            <p>Fresh and refreshing drinks</p>
          </Link>
        </div>
      </section>

      {/* Today's Specials */}
      <section className="home-section">
        <div className="section-header">
          <h2>Today's Specials</h2>
          <p>Some of our popular choices.</p>
        </div>

        <div className="specials-placeholder">
          <p>
            Our special dishes will appear here.
          </p>

          <Link to="/menu" className="hero-button">
            View Full Menu
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;