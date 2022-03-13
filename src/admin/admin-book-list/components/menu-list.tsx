import React, { ReactElement } from 'react';
import { keyGenerator } from 'utils/helpers';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';

interface IThisProps {
    item: { url: string; icon: ReactElement; name: string };
}

function MenuList({ item }: IThisProps) {
    const { tabName }: { tabName: string } = useParams();
    return (
        <Link
            key={keyGenerator(20)}
            to={item.url}
            style={{
                color: tabName === item.url ? '#fff' : '#0000008a'
            }}>
            <ListItem
                button
                style={{
                    background: tabName === item.url ? '#B12029' : ''
                }}>
                <ListItemIcon
                    style={{
                        color: tabName === item.url ? '#fff' : '#0000008a'
                    }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>
        </Link>
    );
}

export default MenuList;
