import { Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/about.jsx";
import Button from "./components/Button/Button.jsx";
import { useState } from "react";
import Products from "./components/Products/Products.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Offers from "./components/About/offers/Offers.jsx";
import Info from "./components/About/info/Info.jsx";
const App = () => {
	const [loggedIn, setLogin] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleLogin = () => {
		setLoading(true);
		//dummy call to handle login which takes 2secs
		setTimeout(() => {
			setLogin(!loggedIn);
			setLoading(false);
		}, 2000);
	};

	return (
		<div data-testid="App" className="App">
			<nav data-testid="main_nav">
				<h1 data-testid="brandName">The Clothing Company</h1>
				<NavLink data-testid="Home_Link" to="/">
					Home
				</NavLink>
				<NavLink data-testid="About_Link" to="/about">
					About
				</NavLink>
				<NavLink data-testid="Product_Link" to="/products">
					Products
				</NavLink>
				<Button
					value={loggedIn}
					isLoading={loading}
					displayTrue={"Logout"}
					displayFalse={"Login"}
					handleLogin={handleLogin}
				/>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />}>
					<Route path="info" element={<Info />} />
					<Route path="offers" element={<Offers />}>
						<Route path=":id/:type" element={<ProductDetails />} />
					</Route>
				</Route>
				<Route
					path="/products"
					element={<Products isUserLoggedIn={loggedIn} isLoading={loading} />}
				/>
				{loggedIn && (
					<Route path="/products/:id/:type" element={<ProductDetails />} />
				)}
				<Route path="*" element={<h3 className="error">Route not found</h3>} />
			</Routes>
		</div>
	);
};

export default App;
