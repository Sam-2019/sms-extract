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
