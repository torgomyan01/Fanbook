import React from 'react';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    width: number | string;
    height: number;
    borderRadius: number;
    status: boolean;
    count: number;
    className: string | any;
    difference?: number | undefined | 'random';
}

function BlockPlaceholder({
    width,
    height,
    borderRadius,
    status,
    count,
    className,
    difference = 0
}: IThisProps) {
    const countArray: any = [...Array.from(Array(count).keys())];

    let _difference = 0;
    return (
        <>
            {countArray.map(() => {
                if (difference !== 'random') {
                    _difference += difference;
                }
                const randomNum = Math.floor(Math.random() * 100);
                return (
                    <span
                        className={`block-placeholder ${className}`}
                        key={keyGenerator(30)}
                        style={{
                            display: status ? 'inline-block' : 'none',
                            width:
                                difference > 0 || difference === 'random'
                                    ? `calc(${width} - ${
                                          difference === 'random'
                                              ? randomNum
                                              : _difference
                                      }px)`
                                    : width,
                            height,
                            borderRadius: `${borderRadius}px`
                        }}
                    />
                );
            })}
        </>
    );
}

export default BlockPlaceholder;
