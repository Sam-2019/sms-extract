import "./App.css";
import { useState } from "react";
import { check } from "./smsExtract";

function App() {
	const [state, setState] = useState("");
	const [output, setOutput] = useState(false);
	const [notify, setNotify] = useState(false);
	const [data, setData] = useState({});

	const submit = () => {
		const smsBody = state;

		if (smsBody.length >= 112) {
			const res = check(smsBody);

			if (notify === true) {
				return setData(JSON.stringify(res));
			}

			setData(JSON.stringify(res));
			return setOutput(true);
		}

		return setNotify(true);
	};

	const clear = () => {
		setState("");
		setOutput(false)
	};

	const handleOnChange = (e) => {
		setState(e.target.value);

		if (e.target.value.length <= 112) {
			setNotify(true);
		}
		setNotify(false);
	};

	return (
		<div className="container">
			<div className="bg-white p-4">
				<div className="max-w-md">
					<textarea
						type="text"
						value={state}
						placeholder="Copy and Paste message"
						onChange={handleOnChange}
						className="rounded-md border border-sky-500  w-full h-48 p-2 shadow-md "
					/>
				</div>

				<div>{notify && <p className="py-2">Word count not enough</p>}</div>

				<div className="py-2">
					<button
						disabled={!state ? true : false}
						className={`rounded-md bg-indigo-500 w-auto text-sm px-4 py-2 text-base font-medium text-white inline-flex justify-center  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
							!state ? `bg-slate-400` : `bg-indigo-500 hover:bg-indigo-700`
						}`}
						onClick={submit}
					>
						Submit
					</button>

					<button
						onClick={clear}
						className={`rounded-md w-auto text-sm px-4 py-2 text-base font-medium  ${
							!state ? `text-gray-500` : `text-indigo-900`
						} inline-flex justify-center focus:outline-none`}
						disabled={!state ? true : false}
					>
						Clear
					</button>
				</div>

				<div className="mt-2 max-w-md">
					{output && (
						<div className="rounded-md border border-sky-500 w-full p-2">
							<p className="text-sm text-gray-500 break-all ">{data}</p>

							<div className="mt-2 flex justify-end content-end">
								<button
									disabled={!state ? true : false}
									className="rounded-md bg-red-500 w-auto text-sm px-4 py-2 text-base font-medium text-white inline-flex justify-center hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
									onClick={() => setOutput(false)}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
