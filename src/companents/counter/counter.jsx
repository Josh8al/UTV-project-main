import { useState } from "react";
import "./counter.css";
import Logs from "../logs/logs";

const Counter = () => {
	const [counter, setCounter] = useState(0);
	const [incVal, setIncVal] = useState(0);
	const [decVal, setDecVal] = useState(0);
	const [logs, setLogs] = useState([]);
	const [showLogs, setShowLogs] = useState(false);

	const handleOperation = (event) => {
		if (event.target.id === "value_inc") {
			if (+event.target.value >= 0) {
				setIncVal(+event.target.value);
			}
		} else if (event.target.id === "value_dec") {
			if (+event.target.value >= 0) {
				setDecVal(+event.target.value);
			}
		}
	};

	const deleteLog = (id) => {
		// setLogs(logs.filter((log) => log.id !== id));
		setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
	};
	const handleCounter = (operator) => {
		let newVal = null;
		let oldVal = counter;
		if (operator === "+") {
			newVal = counter + incVal;
			setIncVal(0);
		} else if (operator === "-") {
			newVal = counter - decVal;
			setDecVal(0);
		}
		setCounter(newVal);
		const newLog = {
			id: Math.random(),
			value: `Previous Value = ${oldVal}, Value ${
				operator === "+" ? "Added" : "Subtracted"
			} = ${operator === "+" ? incVal : decVal}, New Value = ${newVal}`,
		};
		// console.log(newLog)
		setLogs([...logs, newLog]);
	};

	return (
		<div className="main" data-testid="conter-component">
			<div>
				<h1>COUNTER</h1>
			</div>
			<div>
				<h3 data-testid="counter-value"> Value of Counter: {counter}</h3>
			</div>
			<div className="buttons">
				<div className="action_section">
					<form action="">
						<input
							type="number"
							value={incVal}
							placeholder="0"
							id="value_inc"
							onChange={(event) => handleOperation(event)}
						/>
					</form>
					<button
						className="button button_inc"
						onClick={() => handleCounter("+")}
					>
						Increase
					</button>
				</div>
				<div className="action_section">
					<form action="">
						<input
							type="number"
							value={decVal}
							placeholder="0"
							id="value_dec"
							onChange={(event) => handleOperation(event)}
						/>
					</form>
					<button
						className="button button_dec"
						onClick={() => handleCounter("-")}
					>
						Decrease
					</button>
				</div>
			</div>
			{logs.length >= 1 && (
				<button
					className="button button_logs"
					onClick={() => setShowLogs(!showLogs)}
					style={{
						backgroundColor: showLogs ? "#211f1f" : "#fff",
						color: showLogs ? "#fff" : "#211f1f",
					}}
				>
					{showLogs ? "Hide Logs" : "Show Logs"}
				</button>
			)}
			<button>
				{showLogs && (
					<div className="logs">
						<div className="logs_container">
							<Logs logsData={logs} deleteLog={(id) => deleteLog(id)} />
						</div>
					</div>
				)}
			</button>
		</div>
	);
};

export default Counter;
