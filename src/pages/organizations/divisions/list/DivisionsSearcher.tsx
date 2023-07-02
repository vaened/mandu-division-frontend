import React, {useContext, useEffect, useState} from 'react';
import {Col, Input, Row, Select} from "antd";
import {DivisionsContext} from "../../contexts/DivisionsContext.tsx";
import {SearchableColumn, SearchForm} from "../../contexts/hooks/useSearch.ts";

const {Search} = Input;

type DivisionsSearcherProps = {};

type Option = {
    value: SearchableColumn,
    label: string,
}

const options: Option[] = [
    {value: 'all', label: 'Cualquiera'},
    {value: 'name', label: 'División'},
    {value: 'parentDivisionName', label: 'División Superior'},
    {value: 'collaborators', label: 'Colaboradores'},
    {value: 'nivel', label: 'Nivel'},
    {value: 'totalSubdivisions', label: 'SubDivisiones'},
    {value: 'ambassadorName', label: 'Embajador'},
]

type Column = SearchForm['column'];

const DivisionsSearcher: React.FC<DivisionsSearcherProps> = () => {
    const {applyFilters} = useContext(DivisionsContext);
    const [search, setRequestQuery] = useState<string>('');
    const [column, setRequestColumn] = useState<Column>('all');

    useEffect(() => {
        applyFilters({search, column});
    }, [search, column]);

    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequestQuery(e.target.value);
    }

    return (
        <Row>
            <Col>
                <Select
                    defaultValue="all"
                    style={{width: 160}}
                    onChange={setRequestColumn}
                    options={options}
                />
            </Col>
            <Col>
                <Search placeholder="Buscar" onSearch={setRequestQuery} onChange={onSearchChanged} allowClear/>
            </Col>
        </Row>
    );
}

export default DivisionsSearcher;