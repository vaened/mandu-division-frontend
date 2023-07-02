import React, {useState} from 'react';
import {Col, Radio, Row} from "antd";
import DivisionsTable from "./list/DivisionsTable.tsx";
import DivisionsSearcher from "./list/DivisionsSearcher.tsx";
import {RadioChangeEvent} from "antd/es/radio/interface";
import {DivisionsContextProvider} from "../contexts/DivisionsContext.tsx";

const enum TABS {
    Listing,
    Tree,
}

const renderContent = (tab: TABS) => {
    switch (tab) {
        case TABS.Listing:
            return <DivisionsTable/>;
        case TABS.Tree:
            return <p>Arbol</p>
    }
}

const DivisionsPanel: React.FC = () => {
    const [tab, selectTab] = useState<TABS>(TABS.Listing);

    const onTabSelected = (e: RadioChangeEvent) => {
        selectTab(Number(e.target.value));
    }

    return (
        <DivisionsContextProvider>
            <Row justify="space-between">
                <Col>
                    <Radio.Group value={tab} onChange={onTabSelected} style={{marginBottom: 16}}>
                        <Radio.Button value={TABS.Listing}>Listado</Radio.Button>
                        <Radio.Button value={TABS.Tree}>Arbol</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col>
                    <DivisionsSearcher></DivisionsSearcher>
                </Col>
            </Row>
            <Row>
                {renderContent(tab)}
            </Row>
        </DivisionsContextProvider>
    );
};

export default DivisionsPanel;
