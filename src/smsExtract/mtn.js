//regex
//eslint-disable-next-line
const trxn_id_pattern = /Transaction I(d|D): \d+/gm;
//eslint-disable-next-line
const amount_pattern = /GHS ?[0-9]+.[0-9]+?./gm || /GHS.?[0-9]+(.([0-9]+))/gi;
//eslint-disable-next-line
const from_pattern = /.[0-9]+.?from.?([a-z]+.?[a-z]+.?[a-z]+.?[a-z]+.?[a-z]+.?[a-z]+)/gim;
//eslint-disable-next-line
const to_pattern = /\.[0-9]+.?to.?\-?\W?(\w+.?\w+.?\w+.?[A-Zz]+.?)?/gim;
//eslint-disable-next-line
const reference_pattern = /Reference:.?\-?(\w+)?.?(\w+)?[0-9]*?-?([0-9]+)?/gim;
//eslint-disable-next-line
const date_pattern = /at ([0-9]*\-[0-9]*\-[0-9]* )/gim;
//eslint-disable-next-line
const time_pattern = /(([0-9]+\:[0-9]+\:[0-9]+)\.)/gim;
//eslint-disable-next-line
const messsage_pattern = /Message:Interest.?[a-z]+.?(\w+)?.(\w+)?.(\w+)?.([0-9]+)?/g;

const withdrawal = (data) => {
	let amounts = data.match(amount_pattern);

	let withdrawal_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;
	let fee_charged = amounts ? amounts[2] : null;
	let payment_to = data.match(to_pattern);
	let trnx_id = data.match(trxn_id_pattern);

	return {
		Withdrawal: data,

		withdrawal_amount: withdrawal_amount,
		current_balance: current_balance,
		fee_charged: fee_charged,
		to: payment_to ? String(payment_to).slice(7) : null,
		trnx_id: trnx_id ? String(trnx_id[0]).slice(16) : null,
	};
};

const receipt = (data) => {
	let amounts = data.match(amount_pattern);

	let receipt_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;
	let available_balance = amounts ? amounts[2] : null;
	let trnx_id = data.match(trxn_id_pattern);
	let from = data.match(from_pattern);
	let message = data.match(messsage_pattern);

	return {
		Receipt: data,

		receipt_amount: receipt_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		trnx_id: trnx_id ? String(trnx_id[0]).slice(16) : null,
		from: from ? String(from).substring(9) : null,
		message: message ? String(message).substring(8) : null,
	};
};

const purchase = (data) => {
	let amounts = data.match(amount_pattern);

	let purchase_amount = amounts ? amounts[0] : null;
	let new_balance = amounts ? amounts[1] : null;
	let fee_charged = amounts ? amounts[2] : null;
	let trnx_id = data.match(trxn_id_pattern);
	let payment_to = data.match(to_pattern);
	let reference = data.match(reference_pattern);
	let time = data.match(time_pattern);
	let date = data.match(date_pattern);

	return {
		Purchase: data,

		purchase_amount: purchase_amount,
		current_balance: new_balance,
		fee_charged: fee_charged,
		trnx_id: trnx_id ? String(trnx_id[0]).slice(16) : null,
		to: payment_to ? String(payment_to).slice(7) : null,
		reference: reference ? String(reference).substring(11) : null,
		time: time ? String(time) : null,
		date: date ? String(date).substring(3).trim() : null,
	};
};

const send = (data) => {
	let amounts = data.match(amount_pattern);
	console.log(amounts);

	if (data.includes("INTEROPERABILITY PUSH")) {
	}
	console.log(data);

	let send_amount = amounts ? amounts[0] : null;
	let current_balance = amounts ? amounts[1] : null;
	let available_balance = amounts.length > 3 ? amounts[2] : amounts[1];
	let fee_charged = amounts.length > 3 ? amounts[3] : amounts[2];
	let trnx_id = data.match(trxn_id_pattern);
	let payment_to = data.match(to_pattern);
	let reference = data.match(reference_pattern);
	let time = data.match(time_pattern);
	let date = data.match(date_pattern);

	return {
		Send: data,

		send_amount: send_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		fee_charged: fee_charged,
		trnx_id: trnx_id ? String(trnx_id[0]).slice(16) : null,
		reference: reference ? String(reference).substring(11) : null,
		time: String(time).length < 8 ? null : String(time),
		date: String(date).length < 10 ? null : String(date).substring(3).trim(),
		to: String(payment_to).includes("-")
			? String(payment_to).slice(9)
			: String(payment_to).slice(7),
	};
};

export const checkMTN = (data) => {
	console.log("MTN");
	if (data.includes("Cash Out")) {
		return withdrawal(data);
	}

	if (data.includes("Payment received") || data.includes("An amount")) {
		return receipt(data);
	}

	if (data.includes("Payment made") || data.includes("INTEROPERABILITY PUSH")) {
		return send(data);
	}

	return purchase(data);
};
