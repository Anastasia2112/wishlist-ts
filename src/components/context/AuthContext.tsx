import { createContext, ReactNode, useState } from "react";
import { AuthContextType } from "../../models";

type AuthContextProviderProps = {
    children: ReactNode
  }
  
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const updateAuth = (value: boolean) => {
        setIsAuth(value);
    }

    const updateLoading = (value: boolean) => {
        setIsLoading(value);
    }

    return <AuthContext.Provider value = {{ isAuth, updateAuth, isLoading, updateLoading }} >{ children }</AuthContext.Provider>
}

export default AuthContextProvider;