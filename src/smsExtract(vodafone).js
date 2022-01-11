//regex
//eslint-disable-next-line
const trxn_id_pattern = /(^[0-9]*)/gim;
//eslint-disable-next-line
const ref_no_pattern = /.?Ref\:?.?([0-9]+)/gm;
//eslint-disable-next-line
const amount_pattern = /GHS.?.?[0-9]+(.([0-9]+))/gi;
//eslint-disable-next-line
const from_name_pattern = / -.?[a-z]*.?[a-z]*.?[0-9]/gim;
//eslint-disable-next-line
const from_number_pattern = /(from).?[a-z]+(\d*)/gi;
//eslint-disable-next-line
const to_name_pattern = /(to).?(\d*) ((\w+).?(\w+)?.?(\w+)?)/;
//eslint-disable-next-line
const to_number_pattern = /(to).?(\d*)/gi;
//eslint-disable-next-line
const date_pattern = /([0-9]*\-[0-9]*\-[0-9]*).?/gim;
//eslint-disable-next-line
const time_pattern = /(([0-9]+\:[0-9]+\:[0-9]+))/gim;
//eslint-disable-next-line
const transfer_from = /Transfer From\:.?([0-9]+)-([0-9]+)/;
//eslint-disable-next-line
const transfer_name = /from.?([a-z]+).?([a-z]+)?.?([a-z]+)?/gi;
//eslint-disable-next-line
const for_number_pattern = /(for).?(\d*)/g;
//eslint-disable-next-line
const for_name_pattern = /(of).?(\w*)/g;
//eslint-disable-next-line
const reference_pattern = /Reference:.?[a-z]+/gi;

const withdrawal = (data) => {
	console.log({ Withdrawal: data });

	let trnx_id = data.match(trxn_id_pattern);
	let from_number = data.match(from_number_pattern);
	let from_name = data.match(from_name_pattern);
	let time = data.match(time_pattern);
	let date = data.match(date_pattern);

	let amounts = data.match(amount_pattern);
	let withdrawal_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;

	// console.log({ withdrawal_amount: withdrawal_amount });
	// console.log({ current_balance: current_balance });
	// console.log({ trnx_id: String(trnx_id[0]) });
	// console.log({
	// 	from_number: from_number ? String(from_number).substring(5) : null,
	// });
	// console.log({ from_name: from_name ? String(from_name).substring(3) : null });
	// console.log({ time: time ? String(time) : null });
	// console.log({ date: date ? String(date).trim() : null });

	return {
		Withdrawal: data,

		withdrawal_amount: withdrawal_amount,
		current_balance: current_balance,
		trnx_id: String(trnx_id[0]),
		from_number: from_number ? String(from_number).substring(5) : null,
		from_name: from_name ? String(from_name).substring(3) : null,
		time: time ? String(time) : null,
		date: date ? String(date).trim() : null,
	};
};

const receipt = (data) => {
	console.log({ Receipt: data });

	let trnx_id = data.match(trxn_id_pattern);
	let time = data.match(time_pattern);
	let date = data.match(date_pattern);
	let reference_no = data.match(ref_no_pattern);

	let from_number = data.match(transfer_from);
	let from_name = data.match(transfer_name);
	let amounts = data.match(amount_pattern);
	let receipt_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;

	// console.log({ receipt_amount: receipt_amount });
	// console.log({ current_balance: current_balance });
	// console.log({ from_number: from_number ? String(from_number[1]) : null });
	// console.log({ from_name: from_name ? String(from_name).substring(5) : null });
	// console.log({ trnx_id: String(trnx_id) });
	// console.log({ time: time ? String(time) : null });
	// console.log({ date: date ? String(date).trim() : null });
	// console.log({ reference_no: String(reference_no).substring(6) });

	return {
		Receipt: data,

		receipt_amount: receipt_amount,
		current_balance: current_balance,
		from_number: from_number ? String(from_number[1]) : null,
		from_name: from_name ? String(from_name).substring(5) : null,
		trnx_id: String(trnx_id),
		time: time ? String(time) : null,
		date: date ? String(date).trim() : null,
		reference_no: String(reference_no).substring(6),
	};
};

const purchase = (data) => {
	console.log({ Purchase: data });
};

const send = (data) => {
	console.log({ Send: data });

	let trnx_id = data.match(trxn_id_pattern);
	let to_number = data.match(to_number_pattern);
	let to_name = data.match(to_name_pattern);
	let time = data.match(time_pattern);
	let date = data.match(date_pattern);
	let amounts = data.match(amount_pattern);
	let reference = data.match(reference_pattern);
	let sent_amount = amounts ? amounts[0] : null;
	let fee_charged = amounts ? amounts[1] : null;
	let current_balance = amounts ? amounts[2] : null;

	// console.log({ trnx_id: String(trnx_id) });
	// console.log({ to_number: to_number ? String(to_number).substring(3) : null });
	// console.log({ to_name: to_name ? to_name[3] : null });
	// console.log({ time: time ? String(time) : null });
	// console.log({ date: date ? String(date).trim() : null });
	// console.log({ sent_amount: sent_amount });
	// console.log({ fee_charged: fee_charged });
	// console.log({ current_balance: current_balance });
	// console.log({ reference: String(reference).substring(11) });

	return {
		trnx_id: String(trnx_id),
		to_number: to_number ? String(to_number).substring(3) : null,
		to_name: to_name ? to_name[3] : null,
		time: time ? String(time) : null,
		date: date ? String(date).trim() : null,
		sent_amount: sent_amount,
		fee_charged: fee_charged,
		current_balance: current_balance,
		reference: String(reference).substring(11),
	};
};

export const check = (data) => {
	if (data.includes("You have withdrawn")) {
		return withdrawal(data);
	}

	if (data.includes("You have received")) {
		return receipt(data);
	}

	if (data.includes("sent to")) {
		return send(data);
	}

	return purchase(data);
};
