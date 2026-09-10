function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <h2>Addis Eats</h2>

        <p>
          Delicious food delivered across Addis Ababa.
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} Addis Eats. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;