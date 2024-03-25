import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { LogOut, UserRound } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
	const userContextValue = useContext(UserContext);

	if (!userContextValue) {
		// Context value is undefined, return null or handle appropriately
		return null; // or return <div>Loading...</div>, etc.
	}

	// Destructure user and setUser from the context value
	const { user } = userContextValue;

	return (
		<div className="h-screen w-full flex items-center justify-around bg-[#FFF7F1] font-nanum">
			<div className="h-auto w-auto bg-white rounded-md p-6 shadow-md">
				<div className="flex items-center justify-center gap-2 mb-4">
					<UserRound className="h-8 w-8" />
					<h2 className="text-2xl font-bold">User Profile</h2>
				</div>
				<div className="flex flex-col gap-3">
					<h2 className="text-xl">
						<span className="text-[#FF6363] font-bold mr-2">
							Username:
						</span>
						{user?.account_name}
					</h2>
					<p className="text-xl">
						<span className="text-[#FF6363] font-bold mr-2">
							Account Number:
						</span>
						{user?.account_number}
					</p>
					<Button
						variant="custom"
						className="flex items-center gap-2"
					>
						<Link
							to="/"
							className="text-xl flex items-center gap-2"
						>
							<LogOut />
							Exit
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserProfilePage;
