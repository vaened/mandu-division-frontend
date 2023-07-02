import {useEffect, useState} from "react";
import {Division} from "../../../../../models/divisions";
import {ColumnFilterItem} from "antd/es/table/interface";

export type DivisionColumnFilterItems = {
    name: ColumnFilterItem[],
    nivel: ColumnFilterItem[],
    parentDivisionName: ColumnFilterItem[]
};

type useFiltersType = { divisions: Division[] }

export const useFilters = ({divisions}: useFiltersType) => {
    const [filters, refresh] = useState<DivisionColumnFilterItems>({name: [], nivel: [], parentDivisionName: []})

    const createFilterItem = (columns: string[]): ColumnFilterItem[] => {
        return [...new Set(columns)].map(column => ({text: column, value: column}));
    }

    useEffect(() => {
        const collect: { [K in keyof DivisionColumnFilterItems]: string[] } = {
            name: [],
            nivel: [],
            parentDivisionName: []
        };

        divisions.forEach((division) => {
            collect.name.push(division.name);
            collect.nivel.push(division.nivel.toString());
            collect.parentDivisionName.push(division.parentDivisionName);
        });

        refresh({
            name: createFilterItem(collect.name),
            nivel: createFilterItem(collect.nivel),
            parentDivisionName: createFilterItem(collect.parentDivisionName),
        });
    }, [divisions])

    return {filters};
}

export default useFilters;