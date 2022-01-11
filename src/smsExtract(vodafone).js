//regex

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
