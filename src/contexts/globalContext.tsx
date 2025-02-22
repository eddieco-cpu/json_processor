"use client";
import { useState, useContext, createContext, ReactNode } from "react";
import { JSONValue } from "@/types/jsonProcessor"

//
interface GlobalContextType {
	isLoading: boolean;
	setIsLoading: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	jsonData: JSONValue;
	setJsonData: React.Dispatch<
		React.SetStateAction<JSONValue>
	>;
}

//
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	//
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [jsonData, setJsonData] = useState<JSONValue>("");

	//
	return (
		<>
			<GlobalContext.Provider
				value={{
					isLoading,
					setIsLoading,
					jsonData, 
					setJsonData
				}}
			>
				{children}
			</GlobalContext.Provider>
		</>
	);
};

//
const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

//
export default GlobalProvider;
export { GlobalContext, useGlobalContext };
