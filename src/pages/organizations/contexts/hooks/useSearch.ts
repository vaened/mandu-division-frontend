import {useEffect, useState} from "react";
import {Division} from "../../../../models/divisions";

export type SearchableColumn = keyof Omit<Division, 'id'> | 'all';

export type SearchForm = {
    search: string,
    column: SearchableColumn,
}

export type useSearchType = {
    divisions: Division[]
}

const filterable: Array<keyof Division> = [
    'name',
    'ambassadorName',
    'collaborators',
    'nivel',
    'parentDivisionName',
    'totalSubdivisions',
];

const canApplyFilterFor = (query: string) => query !== '';

export const useSearch = ({divisions}: useSearchType) => {
    const [filterDivisions, setFilteredDivisions] = useState<Division[]>(divisions);
    const [form, fillForm] = useState<SearchForm>({column: 'all', search: 'string'});

    const applyFilters = ({column, search}: SearchForm) => {
        fillForm({column, search});
    }

    const setDefaultRecords = (divisions: Division[]) => {
        setFilteredDivisions(divisions);
    }

    useEffect(() => {
        const {column, search} = form;
        const query = search.toLowerCase();


        if (!canApplyFilterFor(query)) {
            setDefaultRecords(divisions);
            return;
        }

        setFilteredDivisions(
            divisions.filter((division): boolean => {
                if (column !== 'all') {
                    return division[column].toString().toLowerCase().includes(query);
                }

                return filterable.some(
                    attribute => division[attribute].toString().toLowerCase().includes(query)
                );
            })
        );
    }, [form, divisions]);

    return {applyFilters, filterDivisions};
}

export default useSearch;