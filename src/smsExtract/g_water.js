//regex
//eslint-disable-next-line
const month_pattern =
  /([a-zA-Z]+)-([0-9]+).?BILL/gm || /([a-zA-Z]+-[0-9]+).?BILL/gm;
//eslint-disable-next-line
const year_pattern =
  /([a-zA-Z]+)-([0-9]+).?BILL/gm || /([a-zA-Z]+-[0-9]+).?BILL/gm;
//eslint-disable-next-line
const account_number_pattern = /(ACC).?(#)\:.?([0-9]+\-[0-9]+\-[0-9]+)/gm;
//eslint-disable-next-line
const account_name_and_id_pattern =
  /([A-Z]+ [A-Z]+ ?[A-Z]+ ?[A-Z]+)\-([0-9]+)/gim;
//eslint-disable-next-line
const prev_usage_pattern = /PREV+\:.?([0-9]+)/gm;
//eslint-disable-next-line
const new_usage_pattern = /NEW+\:.?([0-9]+)/gm;
//eslint-disable-next-line
const usage_rate_pattern = /([a-z]+).?([0-9]+.?[0-9]+)/gm;
//eslint-disable-next-line
const usage_qty_pattern = /(USED)\:.?([1-9]+)/gm;
//eslint-disable-next-line
const usage_pattern = /(USED)\:.?([1-9]+).?([a-z]+).?([0-9]+.?[0-9]+)/gm;
//eslint-disable-next-line
const water_charge_pattern = /(WATER).?(AMT)\:.?([0-9]+.?[0-9]+)/gm;
//eslint-disable-next-line
const fire_tax_pattern = /(1%).?([A-Z]+)\:.?([1-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const rural_tax_pattern = /(2%).?([A-Z]+)\:.?([1-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const service_charge_pattern = /SERVICE.?CHARGE+\:.?([0-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const month_total_pattern = /MONTH.?TOT+\:.?([0-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const prev_balance_pattern = /PREV.?BAL+\:.?([0-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const balance_due_pattern = /BAL.?DUE+\:.?([0-9]+).?([0-9]+)/gm;
//eslint-disable-next-line
const due_by_pattern = /DUE.?BY\:.?(?<day>([0-9]+)\-([a-zA-Z]+)\-([0-9]+))/gm;
//eslint-disable-next-line
const number_pattern = /\d+.?\d+.?\d+/g;
//eslint-disable-next-line
const billable_period_pattern = /([A-Z]+)-\d+ /g;

export const checGWater = (data) => {

  let billable_period = String(data.match(billable_period_pattern)).trim();
  let digits = data.match(number_pattern);
  let due_by = String(data.match(due_by_pattern)).substring(8) 
  let account_name = String(data.match(account_name_and_id_pattern)).slice(0, -4);
  let usage_qty = String(data.match(usage_qty_pattern)).substring(6)

	return {
		Message: data,

		bill_period: billable_period ? billable_period : null,
		account_number: digits ? digits[1] : null,
		account_name: account_name ? account_name : null,
		account_id: digits ? digits[2] : null,

		prev_usage: digits ? digits[3] : null,
		new_usage: digits ? digits[4] : null,
		usage_qty: usage_qty ? usage_qty : null,
		usage_rate: digits ? digits[5] : null,

		water_charge: digits ? digits[6] : null,
		fire_tax: digits ? digits[7] : null,
		rural_tax: digits ? digits[8] : null,

		service_charge: digits ? digits[9] : null,
		month_total: digits ? digits[10] : null,
		prev_balance: digits ? digits[11] : null,
		last_paid: digits ? digits[12] : null,
		balance_due: digits ? digits[13] : null,
		due_by: due_by ? due_by : null,
	};
};
