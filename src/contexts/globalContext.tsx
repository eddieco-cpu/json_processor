"use client";
import { useState, useEffect, useContext, createContext, ReactNode } from "react";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
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
	useEffect(() => {
    //
    if (isDesktop) {
      document.body.classList.add("custom-scrollbar");
    } else {
      document.body.classList.remove("custom-scrollbar");
    }
  }, []);

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
