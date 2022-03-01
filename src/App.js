import { useState, useEffect } from "react";
import { checkVodafone } from "./smsExtract/vodafone";
import { checkAirtelTigo } from "./smsExtract/airteltigo";
import { checkMTN } from "./smsExtract/mtn";
import { checGWater } from "./smsExtract/g_water";
import {
	identifier_vodafone,
	withdarawal_airteltigo,
	customer_airteltigo,
	receipt_airteltigo,
	service_charge_g_water,
	prev_acc_g_water,
	fire_rural_g_water,
} from "./smsExtract/constant";

function App() {
	const [state, setState] = useState("");
	const [output, setOutput] = useState(false);
	const [notify, setNotify] = useState(false);
	const [data, setData] = useState({});

	const checkNetwork = (data) => {
		if (data.startsWith(identifier_vodafone)) {
			return checkVodafone(data);
		}

		if (
			data.startsWith(withdarawal_airteltigo) ||
			data.startsWith(customer_airteltigo) ||
			data.startsWith(receipt_airteltigo)
		) {
			return checkAirtelTigo(data);
		}

		if (
			data.includes(service_charge_g_water) ||
			data.includes(prev_acc_g_water) ||
			data.includes(fire_rural_g_water)
		) {
			return checGWater(data);
		}

		return checkMTN(data);
	};

	const submit = () => {
		const smsBody = state;
	
		if (smsBody.length >= 112) {
			const res = checkNetwork(smsBody);

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
		setOutput(false);
		setNotify(false);
	};

	const handleOnChange = (e) => {
		setState(e.target.value);

		if (e.target.value.length <= 112) {
			setNotify(true);
		}
		setNotify(false);
	};

	const close = () => {
		setOutput(false);
	};

	useEffect(() => {
		let didCancel = false;

		const close = () => {
			if (!state) {
				return setOutput(false);
			}
		};

		if (!didCancel) {
			close();
		}

		return () => {
			didCancel = true;
		};
	});

	return (
		<div className="container">
			<div className="bg-white p-4">
				<div className="max-w-md">
					<textarea
						type="text"
						value={state}
						placeholder="Copy and Paste message"
						onChange={handleOnChange}
						className="rounded-md border border-sky-500 w-full h-48 p-2 shadow-md"
					/>
				</div>

				<div>{notify && <p className="py-2">Word count not enough!</p>}</div>

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
						<div className="rounded-md border border-sky-200 w-full p-2">
							<p className="text-sm text-gray-500 break-all ">{data}</p>

							<div className="mt-2 flex justify-end content-end">
								<button
									disabled={!state ? true : false}
									className={`rounded-md bg-red-500 w-auto text-sm px-4 py-2 text-base font-medium text-white inline-flex justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
										!state ? `bg-red-400` : `hover:bg-red-700`
									}`}
									onClick={close}
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
