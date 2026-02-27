import "./Products.css";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { BASE_URL } from "../../const";
import { useState } from "react";
import { Link } from "react-router-dom";

const Products = ({ isUserLoggedIn, isLoading }) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		console.log("Component Mounted");
		const fetchProducts = async () => {
			try {
				const response = await fetch(`${BASE_URL}/products`);
				const result = await response.json();
				setProducts(result);
			} catch (err) {
				console.log(err);
			}
		};
		//fetch the list of products
		fetchProducts();
	}, []);

	if (isLoading) {
		return <Loader component={"Products"} />;
	}
	if (isUserLoggedIn) {
		return (
			<div className="content">
				<h3>Hoodies</h3>
				<div className="products">
					{products?.Hoodies?.map((p) => (
						<div key={p.id}>
							<Link to={`/products/${p.id}/Hoody`}>
								<img src={p.image} alt="product" />
							</Link>
							<p style={{ textAlign: "center" }}>{p.name}</p>
						</div>
					))}
				</div>
				<h3>Tees</h3>
				<div className="products">
					{products?.Tees?.map((p) => (
						<div key={p.id}>
							<Link to={`/products/${p.id}/Tee`}>
								<img src={p.image} alt="product" />
							</Link>
							<p style={{ textAlign: "center" }}>{p.name}</p>
						</div>
					))}
				</div>
				<h3>Sneakers</h3>
				<div className="products">
					{products?.Sneakers?.map((p) => (
						<div key={p.id}>
							<Link to={`/products/${p.id}/Sneaker`}>
								<img src={p.image} alt="product" />
							</Link>
							<p style={{ textAlign: "center" }}>{p.name}</p>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div className="content" style={{ textAlign: "center" }}>
				Please Login To See Products
			</div>
		);
	}
};

export default Products;
