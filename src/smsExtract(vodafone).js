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

	if (data.includes("sent to")) {
		return send(data);
	}

	return purchase(data);
};
