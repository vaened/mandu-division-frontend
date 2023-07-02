import React from 'react'
import {Col, Layout as Main, Menu, Row} from 'antd';
import NotificationItem from "./NotificationItem.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faBell, faBriefcase, faCircleQuestion} from '@fortawesome/free-solid-svg-icons';

import logo from '../mandu.svg';
import avatar from '../avatar.svg';
import './Layout.scss';

const {Header, Content} = Main;

const menuApp = ['Dashboard', 'Organización', 'Modelos', 'Seguimiento']
    .map((label, key) => ({key, label}))

type LayoutProps = {
    children?: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Main className="layout">
            <Header className='header-app'>
                <Row>
                    <Col>
                        <div className="logo">
                            <img src={logo} alt="Mandu logo"/>
                        </div>
                    </Col>
                    <Col>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            items={menuApp}
                        />
                    </Col>
                    <Col className="user-options" style={{marginLeft: "auto"}}>
                        <div className='option-right'>
                            <Row>
                                <Col className="user-options__notifications">
                                    <Row>
                                        <Col>
                                            <NotificationItem>
                                                <FontAwesomeIcon icon={faBriefcase} color='#fff'/>
                                            </NotificationItem>
                                        </Col>
                                        <Col>
                                            <NotificationItem>
                                                <FontAwesomeIcon icon={faCircleQuestion} color='#fff'/>
                                            </NotificationItem>
                                        </Col>
                                        <Col>
                                            <NotificationItem notifications={3}>
                                                <FontAwesomeIcon icon={faBell} color='#fff'/>
                                            </NotificationItem>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className='avatar-user'>
                                    <div className='section-avatar'>
                                        <img src={avatar} alt='avatar'/>
                                        <p>Nano</p>
                                        <FontAwesomeIcon icon={faAngleDown} color='#fff'/>
                                    </div>
                                </Col>

                                <Col className='logo-right'>
                                    <span><img src={logo} alt='Logo'/></span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

            </Header>

            <Content className='content-app' style={{padding: '0 50px'}}>
                {children}
            </Content>
        </Main>
    );
}

export default Layout;