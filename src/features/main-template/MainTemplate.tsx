import React from 'react';

import FooterComponent from '../footer/footer.component';
import HeaderComponent from '../header/header.component';

interface IMainTemplate {
    SubHeader?: React.FC;
    children: any;
    blackLogo?: boolean;
    shopBlock?: boolean;
    searchBlock?: boolean;
    style?: string;
    BlackFontUser?: boolean;
}

const MainTemplate = ({
    SubHeader,
    children,
    blackLogo,
    shopBlock,
    searchBlock,
    style,
    BlackFontUser
}: IMainTemplate) => {
    return (
        <>
            <HeaderComponent
                BlackFontUser={BlackFontUser}
                blackLogo={blackLogo}
                searchBlock={searchBlock}
                shopBlock={shopBlock}>
                {SubHeader && <SubHeader />}
            </HeaderComponent>
            <main style={{ background: style }}>{children}</main>
            <FooterComponent />
        </>
    );
};

export default MainTemplate;
