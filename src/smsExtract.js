//regex
//eslint-disable-next-line
const trxn_id_pattern = /Transaction I(d|D): \d+/gm;
//eslint-disable-next-line
const amount_pattern = /GHS ?[0-9]+.[0-9]+?./gm || /GHS.?[0-9]+(.([0-9]+))/gi;
//eslint-disable-next-line
const from_pattern =/.[0-9]+.?from.?([a-z]+.?[a-z]+.?[a-z]+.?[a-z]+.?[a-z]+.?[a-z]+)/gim;
//eslint-disable-next-line
const to_pattern = /\.[0-9]+.?to.?\-?\W?(\w+.?\w+.?\w+.?[A-Zz]+.?)?/gim;
//eslint-disable-next-line
const reference_pattern = /Reference:.?\-?(\w+)?.?(\w+)?[0-9]*?-?([0-9]+)?/gim;
//eslint-disable-next-line
const date_pattern = /at ([0-9]*\-[0-9]*\-[0-9]* )/gim;
//eslint-disable-next-line
const time_pattern = /(([0-9]+\:[0-9]+\:[0-9]+)\.)/gim;
//eslint-disable-next-line
const messsage_pattern =
	/Message:Interest.?[a-z]+.?(\w+)?.(\w+)?.(\w+)?.([0-9]+)?/g;

export const withdrawal = (data) => {
	let amounts = data.match(amount_pattern);

	if (amounts === null) {
		return;
	}

	let trnx_id = data.match(trxn_id_pattern);
	let withdrawal_amount = amounts[0];
	let current_balance = amounts[1];
	let fee_charged = amounts[2];
	let payment_to = data.match(to_pattern);

	return {
		Withdrawal: data,

		trnx_id: String(trnx_id[0]).slice(16),
		withdrawal_amount: withdrawal_amount,
		current_balance: current_balance,
		fee_charged: fee_charged,
		to: String(payment_to).slice(7),
	};
};

export const receipt = (data) => {
	let amounts = data.match(amount_pattern);

	if (amounts === null) {
		return;
	}

	let receipt_amount = amounts[0];
	let current_balance = amounts[1];
	let available_amount = amounts[2] || null;
	let trnx_id = data.match(trxn_id_pattern);
	let from = data.match(from_pattern) || null;
	let message = data.match(messsage_pattern) ;

	return {
		Receipt: data,

		receipt_amount: receipt_amount,
		current_balance: current_balance,
		available_amount: available_amount ,
		trnx_id: String(trnx_id[0]).slice(16),
		from: String(from).substring(9) ,
		message: message ? String(message).substring(8) : null,
	};
};

export const purchase = (data) => {
	let amounts = data.match(amount_pattern);

	if (amounts === null) {
		return;
	}

	let purchase_amount = amounts[0];
	let new_balance = amounts[1];
	let fee_charged = amounts[2];
	let trnx_id = data.match(trxn_id_pattern);
	let payment_to = data.match(to_pattern);
	let reference = data.match(reference_pattern);
	let time = data.match(time_pattern) || null;
	let date = data.match(date_pattern) || null;

	return {
		Purchase: data,

		trnx_id: String(trnx_id[0]).slice(16),
		purchase_amount: purchase_amount,
		current_balance: new_balance,
		fee_charged: fee_charged,
		to: String(payment_to).slice(7),
		reference: String(reference).substring(11),
		time: String(time),
		date: String(date).substring(3),
	};
};

export const send = (data) => {
	let amounts = data.match(amount_pattern);
	let trnx_id = data.match(trxn_id_pattern);
	let payment_to = data.match(to_pattern);
	let reference = data.match(reference_pattern);
	let time = data.match(time_pattern) || null;
	let date = data.match(date_pattern) || null;
	let send_amount = amounts[0];
	let current_balance = amounts[1];
	let available_balance = amounts[2];
	let fee_charged = amounts[3];

	return {
		Send: data,

		trnx_id: String(trnx_id[0]).slice(16),
		send_amount: send_amount,
		current_balance: current_balance,
		available_balance: available_balance,
		fee_charged: fee_charged,
		reference: String(reference).substring(11),
		time: String(time),
		date: String(date).substring(3),
		to: String(payment_to).includes("-")
			? String(payment_to).slice(9)
			: String(payment_to).slice(7),
	};
};

export const check = (data) => {
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
