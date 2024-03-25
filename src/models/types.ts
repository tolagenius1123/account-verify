export type BankInfo = {
	id: number;
	name: string;
	slug: string;
	code: string;
	longcode: string;
	gateway: string;
	pay_with_bank: boolean;
	supports_transfer: boolean;
	active: boolean;
	country: string;
	currency: string;
	type: string;
	is_deleted: boolean;
	createdAt: string;
	updatedAt: string;
};

export type User = {
	bank_id: number;
	account_name: string;
	account_number: string;
};
