import React from "react";

import './NotificationItem.scss';

type NotificationItemProps = {
    children: React.ReactElement,
    notifications?: number,
}

const NotificationItem: React.FC<NotificationItemProps> = ({children, notifications = 0}) => {
    return (
        <button className='btn-icon-header'>
            {children} {notifications > 1 && <span className="icon-bell">{notifications}</span>}
        </button>
    );
}

export default NotificationItem;
