import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1 text-warning">STARWARS BLOG</span>
				</Link>
				<div>
					<Link to="/">
						<button className="btn btn-warning rounded-0 me-2">Inicio</button>
					</Link>
					<Link to="/favorites">
						<button className="btn btn-warning rounded-0 me-3">Favoritos</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};