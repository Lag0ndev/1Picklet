export default function Home() {
  return (
    <main className="background" aria-label="Animated Picklet-style background">
      <div className="tile" aria-hidden="true"></div>

      <div className="container">
        <div className="hero">
          <h1>1Picklet</h1>
          <p className="tagline">The Picklet Hub</p>
          <p className="desc">Look up any Picklet account and explore tools for the game.</p>

          <div className="btn-group">
            <a href="#" className="btn">
              Login
            </a>
            <a href="#" className="btn">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
