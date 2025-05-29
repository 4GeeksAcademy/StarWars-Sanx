import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-warning">STARWARS BLOG</span>
				</Link>
				<Link to="/demo">
					<button className="btn btn-warning rounded-0">Favoritos</button>
				</Link>
			</div>
		</nav>
	);
};