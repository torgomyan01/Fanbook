import React from 'react';
import { MenuAdmin } from '../index';
import { keyGenerator } from 'utils/helpers';
import { Link, useParams } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';

function SidebarDetails() {
    const { tabName }: { tabName: string } = useParams();
    return (
        <div className="sidebar-details">
            {MenuAdmin.map((menu) => (
                <p key={keyGenerator(30)} className="menu-admin-left-p">
                    <Link
                        to={`${DEF_URL.ADMIN_BOOK_LIST}/${menu.url}`}
                        className="c-white">
                        {menu.icon}
                        {menu.name}
                        {tabName === menu.url && (
                            <i className="fas fa-arrow-right ml-3" />
                        )}
                    </Link>
                </p>
            ))}
        </div>
    );
}

export default SidebarDetails;
