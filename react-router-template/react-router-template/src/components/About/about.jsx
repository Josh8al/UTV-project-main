import { NavLink, Outlet } from "react-router-dom";

const About = () => {
	return (
		<div>
			<Outlet />
			<nav
				data-testid="mini_switch"
				style={{ border: "none", justifyContent: "center" }}
			>
				<NavLink to="info">Info</NavLink>
				<NavLink to="offers">Offers</NavLink>
			</nav>
		</div>
	);
};
export default About;
