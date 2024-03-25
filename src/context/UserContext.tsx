import { createContext, useState } from "react";
import { User } from "@/models/types";

export interface UserContextValue {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextValue | undefined>(
	undefined
);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | undefined>();

	const userContextValue: UserContextValue = {
		user,
		setUser,
	};

	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	);
};
