//regex
//eslint-disable-next-line
const trxn_id_pattern = /Trans I(d|D):.?([a-z]+\d*).(\d*).([a-z]+\d*)/gim;
//eslint-disable-next-line
const ref_no_pattern = /(Ref No).?:(\d*)/gim;
//eslint-disable-next-line
const amount_pattern = /GHS.?.?[0-9]+(.([0-9]+))/gi;
//eslint-disable-next-line
const from_pattern = /(from).?(\d*)/gim;


const withdrawal = (data) => {
	console.log({ Withdrawal: data });
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

	console.log({ receipt_amount: receipt_amount });
	console.log({ current_balance: current_balance });
	console.log({ available_balance: available_balance });
	console.log({ trnx_id: String(trnx_id[0]) });
	console.log({ reference_no: String(reference_no[0]) });
	console.log({ from: from ? `0${String(from).substring(5)}` : null });
};

const purchase = (data) => {
	console.log({ Purchase: data });
};

const send = (data) => {
	console.log({ Send: data });
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
