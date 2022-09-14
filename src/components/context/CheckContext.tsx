import { ReactNode, createContext, useState } from 'react';
import { CheckContextType } from '../../models';

type CheckContextProviderProps = {
    children: ReactNode
}

export const CheckContext = createContext<CheckContextType | null>(null);

const CheckContextProvider = ({ children }: CheckContextProviderProps) => {
    const [checkedWishes, setCheckedWishes] = useState<string[]>([]);
    const wishCount = checkedWishes.length;

    const addCheck = (id: string) => {
        setCheckedWishes([...checkedWishes, id]);
    }

    const deleteCheck = (id: string) => {
        setCheckedWishes(checkedWishes.filter(check => check !== id))
    }

    const updateCheck = (id: string) => {
        if (checkedWishes.includes(id)) {
            deleteCheck(id)
        } else addCheck(id);
    }

    return <CheckContext.Provider value={{ checkedWishes, deleteCheck, wishCount, updateCheck }}>{ children }</CheckContext.Provider>
}

export default CheckContextProvider;