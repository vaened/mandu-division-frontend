import React from 'react';
import {Tabs} from "antd";
import DivisionsPanel from "./divisions/DivisionsPanel.tsx";
import Dashboard from "../Dashbord.tsx";

const DEFAULT_ACTIVE_TAB = 'divisions';

const tabs = [
    {
        key: DEFAULT_ACTIVE_TAB,
        label: 'Divisiones',
        children: <DivisionsPanel/>
    },
    {
        key: 'collaborators',
        label: 'Colaboradores',
        children: <p>colaboradores</p>
    }
]

const OrganizationPanel: React.FC = () => {
    return (
        <Dashboard>
            <Tabs defaultActiveKey={DEFAULT_ACTIVE_TAB} items={tabs}/>
        </Dashboard>
    );
}

export default OrganizationPanel;