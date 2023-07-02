import {Button, Col, Row, Table, TablePaginationConfig} from "antd";
import React, {useContext, useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {ColumnsType, ColumnType} from "antd/es/table";
import {type Division} from "../../../../models/divisions";
import {FilterValue, SorterResult, TableLocale} from "antd/es/table/interface";
import {DivisionsContext} from "../../contexts/DivisionsContext.tsx";
import useFilters, {DivisionColumnFilterItems} from "./hooks/useFilter.ts";
import isNumeric from "antd/es/_util/isNumeric";
import useSelection from "./hooks/useSelection.ts";

type FilterableColumnName = keyof DivisionColumnFilterItems;

const labels: TableLocale = {
    selectionAll: 'Seleccionar todo',
    selectNone: 'Limpiar selección',
    selectInvert: 'Invertir selección',
    filterTitle: 'Filtrar',
    filterConfirm: 'Aplicar',
    filterReset: 'Reiniciar',
    emptyText: 'No hay datos',
};

const paginationConfig: TablePaginationConfig = {
    position: ['bottomRight'],
    locale: {
        items_per_page: '/ página',
        prev_page: 'Página anterior',
        next_page: 'Página siguiente',
    },
};

const DivisionsTable: React.FC = () => {
    const {divisions, refreshDivisions} = useContext(DivisionsContext);
    const [filteredConf, configureFilters] = useState<Record<string, FilterValue | null>>({});
    const [sortedConf, configureSort] = useState<SorterResult<Division>>({});
    const {filters} = useFilters({divisions});
    const {rowSelection} = useSelection();

    useEffect(() => {
        refreshDivisions();
    }, []);

    const onTableFilterChanged = (
        _: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Division>
    ): void => {
        configureSort(sorter);
        configureFilters(filters);
    };

    const createColumn = (
        title: string,
        key: keyof Division,
        render: ((value: unknown, record: Division, index: number) => React.ReactNode) | undefined = undefined
    ): ColumnType<Division> => {
        const filterable: FilterableColumnName[] = ['name', 'nivel', 'parentDivisionName'];
        const canFilter = filterable.includes(key as FilterableColumnName);

        return {
            title,
            dataIndex: key,
            key,
            filters: canFilter ? filters[key as FilterableColumnName] : undefined,
            filterSearch: canFilter,
            filteredValue: filteredConf[key],
            onFilter: (value, record) => {
                return record[key].toString().includes(value.toString());
            },
            sorter: (a, b) => {
                if (isNumeric(a[key])) {
                    return Number(a[key]) - Number(b[key]);
                }

                return a[key].toString().localeCompare(b[key].toString())
            },
            sortOrder: sortedConf.columnKey === key ? sortedConf.order : null,
            ellipsis: true,
            render,
        };
    }

    const columns: ColumnsType<Division> = [
        createColumn('División', 'name'),
        createColumn('División Superior', 'parentDivisionName'),
        createColumn('Colaboradores', 'collaborators'),
        createColumn('Nivel', 'nivel'),
        createColumn(
            'SubDivisiones',
            'totalSubdivisions',
            (_, record) => (
                <div>
                    <span>{record.totalSubdivisions}</span>
                    <span><Button type="default" size="small" className="btn-expand" icon={<PlusOutlined/>}/></span>
                </div>
            )
        ),
        createColumn('Embajador', 'ambassadorName'),
    ];

    return (
        <Row>
            <Col>
                <Table
                    locale={labels}
                    pagination={paginationConfig}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={divisions}
                    onChange={onTableFilterChanged}
                    rowKey={(record) => record.id}
                />
            </Col>
        </Row>
    )
}

export default DivisionsTable;