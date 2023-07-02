import {Division} from "../../../../../models/divisions";
import {TableRowSelection} from "antd/es/table/interface";
import {Table} from "antd";
import React, {useState} from "react";

export const useSelection = () => {
    const [selectedRows, selectRows] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRows: React.Key[]) => {
        selectRows(newSelectedRows);
    };

    const rowSelection: TableRowSelection<Division> = {
        selectedRowKeys: selectedRows,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: 'Seleccionar impares',
                onSelect: (rows: React.Key[]) => {
                    selectRows(
                        rows.filter((_, index) => index % 2 !== 0)
                    );
                },
            },
            {
                key: 'even',
                text: 'Seleccionar pares',
                onSelect: (rows: React.Key[]) => {
                    selectRows(
                        rows.filter((_, index) => index % 2 === 0)
                    );
                },
            },

            Table.SELECTION_NONE,
        ],
    };

    return {rowSelection};
}

export default useSelection;