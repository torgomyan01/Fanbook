import React, { ReactElement, useCallback, useState } from 'react';
import s from './drop-down-style.module.css';

interface IThisProps {
    name: string | ReactElement;
    style?: React.CSSProperties;
    children?: ReactElement | any;
    downIcon?: ReactElement | null;
    className?: string;
    downBodyStyle?: React.CSSProperties;
}

function DropDownAnd({
    name,
    style = {},
    children,
    downIcon,
    className = '',
    downBodyStyle = {}
}: IThisProps) {
    const [openCLose, setOpenCLose] = useState<boolean>(false);
    const [openOpacity, setOpenOpacity] = useState<boolean>(false);

    const openDown = useCallback(() => {
        const val = !openCLose;
        if (val) {
            setOpenCLose(val);
            setTimeout(() => setOpenOpacity(val), 10);
        } else {
            setOpenOpacity(val);
            setTimeout(() => setOpenCLose(val), 100);
        }
    }, [openCLose, openOpacity]);

    return (
        <>
            {openCLose && <div className={s.dropBody} onClick={openDown} />}
            <div className={s.body}>
                <button
                    style={style}
                    className={`${s.header} ${className}`}
                    onClick={openDown}>
                    {name}
                    {downIcon === undefined ? (
                        <i
                            className="fas fa-angle-down i-down"
                            style={{
                                transform: `rotate(${openCLose ? -180 : 0}deg)`,
                                marginLeft: 10
                            }}
                        />
                    ) : (
                        downIcon
                    )}
                </button>
                {openCLose && (
                    <div
                        className={s.downBlock}
                        style={{
                            opacity: openOpacity ? 1 : 0,
                            transform: `scaleY(${openOpacity ? 1 : 0.5})`,
                            top: openOpacity ? '100%' : '30%',
                            ...downBodyStyle
                        }}>
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}

export default DropDownAnd;
