//regex
//eslint-disable-next-line
const trxn_id_pattern = /Trans I(d|D):.?([a-z]+\d*).(\d*).([a-z]+\d*)/gim;
//eslint-disable-next-line
const ref_no_pattern = /(Ref No).?:(\d*)/gim;
//eslint-disable-next-line
const amount_pattern = /GHS.?.?[0-9]+(.([0-9]+))/gi;
//eslint-disable-next-line
const from_pattern = /(from).?(\d*)/gim;
//eslint-disable-next-line
const ghipps_pattern = /(GHIPSS).?(ID:)(\d*)/gim;
//eslint-disable-next-line
const to_name_pattern = /(to)\b.?([a-z]+).?([a-z]+).?([a-z]+).?([a-z]+).?/gim;
//eslint-disable-next-line
const to_number_pattern = /(mobile money wallet)\b ([0-9]+)/gim;

const withdrawal = (data) => {
	console.log({ Withdrawal: data });

	let trnx_id = data.match(trxn_id_pattern);
	let from = data.match(from_pattern);

	let amounts = data.match(amount_pattern);
	let withdrawal_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[2] : null;
	let available_balance = amounts ? amounts[3] : null;
	let fee_charged = amounts ? amounts[1] : null;

	// console.log({ withdrawal_amount: withdrawal_amount });
	// console.log({ current_balance: current_balance });
	// console.log({ available_balance: available_balance });
	// console.log({ fee_charged: fee_charged });
	// console.log({ trnx_id: String(trnx_id[0]) });
	// console.log({ from: from ? String(from).substring(5) : null });

	return {
		Withdrawal: data,

		withdrawal_amount: withdrawal_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		fee_charged: fee_charged,
		trnx_id: String(trnx_id[0]),
		from: from ? String(from).substring(5) : null,
	};
};

const receipt = (data) => {
	console.log({ Receipt: data });

	let trnx_id = data.match(trxn_id_pattern);
	let reference_no = data.match(ref_no_pattern);
	let from = data.match(from_pattern);
	let amounts = data.match(amount_pattern);
	let receipt_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;
	let available_balance = amounts ? amounts[2] : null;

	// console.log({ receipt_amount: receipt_amount });
	// console.log({ current_balance: current_balance });
	// console.log({ available_balance: available_balance });
	// console.log({ trnx_id: String(trnx_id[0]) });
	// console.log({ reference_no: String(reference_no[0]) });
	// console.log({ from: from ? `0${String(from).substring(5)}` : null });

	return {
		Receipt: data,

		receipt_amount: receipt_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		trnx_id: String(trnx_id[0]),
		reference_no: String(reference_no[0]),
		from: from ? `0${String(from).substring(5)}` : null,
	};
};

const purchase = (data) => {
	console.log({ Purchase: data });
};

const send = (data) => {
	console.log({ Send: data });

	let trnx_id = data.match(trxn_id_pattern);
	let ghipps = data.match(ghipps_pattern);

	let to_name = data.match(to_name_pattern);
	let to_number = data.match(to_number_pattern);

	let amounts = data.match(amount_pattern);
	let send_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[2] : null;
	let available_balance = amounts ? amounts[3] : null;
	let fee_charged = amounts ? amounts[1] : null;

	// console.log({ send_amount: send_amount });
	// console.log({ current_balance: current_balance });
	// console.log({ available_balance: available_balance });
	// console.log({ fee_charged: fee_charged });
	// console.log({ trnx_id: String(trnx_id[0]) });
	// console.log({ ghipps_id: String(ghipps[0]) });
	// console.log({ to_name: String(to_name[0]).substring(3) });
	// console.log({ to_number: String(to_number[0]).substring(20) });

	return {
		Send: data,

		send_amount: send_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		fee_charged: fee_charged,
		trnx_id: String(trnx_id[0]),
		ghipps_id: String(ghipps[0]),
		to_name: String(to_name[0]).substring(3),
		to_number: String(to_number[0]).substring(20),
	};
};

export const check = (data) => {
	if (data.includes("You have withdrawn")) {
		return withdrawal(data);
	}

	if (data.includes("You have received")) {
		return receipt(data);
	}

	if (data.includes("Dear Customer, you have sent")) {
		return send(data);
	}

	return purchase(data);
};
