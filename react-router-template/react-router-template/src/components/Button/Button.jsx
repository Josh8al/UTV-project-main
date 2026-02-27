import "./Button.css";
import Loader from "../Loader/Loader.jsx";

const Button = ({
	value,
	displayTrue,
	displayFalse,
	isLoading,
	handleLogin,
}) => {
	if (isLoading) {
		return (
			<>
				<button className="login">
					<Loader component={"Login"} />
				</button>
			</>
		);
	} else {
		return (
			<>
				<button className="login" onClick={handleLogin}>
					{value ? displayTrue : displayFalse}
				</button>
			</>
		);
	}
};

export default Button;
