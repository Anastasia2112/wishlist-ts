import { createContext, ReactNode, useContext } from "react";
import { UserContextType } from '../../models';

type AuthContextProviderProps = {
    children: ReactNode
}

const UserContext = createContext<UserContextType | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    
    
    return (
        <UserContext.Provider value={null}>
            { children }
        </UserContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(UserContext)
}
