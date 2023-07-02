import React from 'react';
import Layout from '../components/Layout'

type DashboardProps = {
    children?: JSX.Element;
};

const Dashboard: React.FC<DashboardProps> = ({children}) => {
    return (
        <Layout>
            {children}
        </Layout>
    );
}

export default Dashboard;