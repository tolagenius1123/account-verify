import { useContext, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BankInfo } from "@/models/types";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

const formSchema = z.object({
	accountNumber: z
		.string()
		.min(10, {
			message: "Account number must contain atleast 10 character(s)",
		})
		.max(10, {
			message: "Account number cannot be more than 10 character(s)",
		}),
	bankCode: z.string().trim().min(1, { message: "Bank is required" }),
});

export default function UserForm() {
	const userContextValue = useContext(UserContext);
	const navigate = useNavigate();

	if (!userContextValue) {
		// Context value is undefined, return null or handle appropriately
		return null; // or return <div>Loading...</div>, etc.
	}

	// Destructure user and setUser from the context value
	const { setUser } = userContextValue;

	const [bankList, setBankList] = useState<BankInfo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			accountNumber: "",
			bankCode: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		setIsLoading(true);
		const res = await fetch(
			`https://api.paystack.co/bank/resolve?account_number=${values.accountNumber}&bank_code=${values.bankCode}`,
			{
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
				},
			}
		);
		console.log(res);
		if (res.status === 200) {
			setIsLoading(false);
			const userData = await res.json();
			console.log(userData);
			console.log(userData.data);
			setUser(userData.data);
			toast.success("Account Retrieved Successfully");
			setTimeout(() => {
				navigate("/user-profile");
			}, 3000);
		} else {
			setIsLoading(false);
			const error = await res.json();
			setTimeout(() => {
				toast.success(error.message);
			}, 3000);
		}
	}

	const getBanks = async () => {
		try {
			const res = await fetch("https://api.paystack.co/bank", {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
				},
			});

			if (!res.ok) {
				throw new Error("Failed to fetch banks");
			}

			const data = await res.json(); // Parse the JSON response
			console.log(data.data); // Use the parsed JSON data
			setBankList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getBanks();
	}, []);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-[70%]"
			>
				<div>
					<h1 className="font-bold text-2xl">Account Verify</h1>
				</div>
				<FormField
					control={form.control}
					name="accountNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter a valid account number"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bankCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Bank</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select your bank" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{bankList.map((bank) => (
										<SelectItem
											value={bank.code}
											key={bank.id}
										>
											{bank.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="custom" disabled={isLoading}>
					{isLoading ? (
						<Oval
							height="25"
							width="25"
							ariaLabel="loading"
							color="white"
						/>
					) : (
						"Submit"
					)}
				</Button>
			</form>
		</Form>
	);
}
