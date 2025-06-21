"use client";
import {
	useState,
	useEffect,
	useContext,
	createContext,
	ReactNode,
} from "react";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import { JSONValue } from "@/types/jsonProcessor";

import { useConfirmOnRouteChange } from "@/hooks/useConfirmOnRouteChange";

//
interface GlobalContextType {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	jsonData: JSONValue;
	setJsonData: React.Dispatch<React.SetStateAction<JSONValue>>;
	isJsonEdited: boolean;
	setIsJsonEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

//
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
	//
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [jsonData, setJsonData] = useState<JSONValue>("");
	const [isJsonEdited, setIsJsonEdited] = useState<boolean>(false);
	const { setEnabledNavigate } = useConfirmOnRouteChange();

	//
	useEffect(() => {
		//
		if (isDesktop) {
			document.body.classList.add("custom-scrollbar");
		} else {
			document.body.classList.remove("custom-scrollbar");
		}
	}, []);

	useEffect(() => {
		//
		//console.log("isJsonEdited: ", isJsonEdited);
		if (isJsonEdited) {
			setEnabledNavigate(true)
		} else {
			setEnabledNavigate(false)
		}
	}, [isJsonEdited]);

	//
	return (
		<>
			<GlobalContext.Provider
				value={{
					isLoading,
					setIsLoading,
					jsonData,
					setJsonData,
					isJsonEdited, 
					setIsJsonEdited
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
