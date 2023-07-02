import React, {useState} from 'react';
import {type Division} from "../../../models/divisions";
import {listDivisions} from "../../../services/division.service.ts";
import useSearch, {SearchForm} from "./hooks/useSearch.ts";


export type DivisionsContextState = {
    divisions: Division[],
    refreshDivisions: () => void
    applyFilters: (form: SearchForm) => void
}

export const DivisionsContext = React.createContext<DivisionsContextState>({
    divisions: [],
    refreshDivisions: () => {
        return;
    },
    applyFilters: () => {
        return;
    }
});

type UserContextProviderProps = {
    children?: JSX.Element | JSX.Element[];
};

export function DivisionsContextProvider({children}: UserContextProviderProps) {
    const [divisions, setDivisions] = useState<Division[]>([]);
    const {filterDivisions, applyFilters} = useSearch({divisions});

    const refreshDivisions = () => {
        listDivisions().then(setDivisions);
    };

    return (
        <DivisionsContext.Provider value={
            {
                divisions: filterDivisions,
                refreshDivisions,
                applyFilters
            }
        }>
            {children}
        </DivisionsContext.Provider>
    );
}
