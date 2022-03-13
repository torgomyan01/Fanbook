import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookInfo, setStep2 } from 'redux/create-book';
import { keyGenerator, plansKey } from 'utils/helpers';
import BookSizingBlock from './book-sazing-block';

interface IBlocksData {
    index: number;
    info: {
        dimension: string;
        pages: string;
        price: string;
    };
}

function SelectBookSection() {
    const dispatch = useDispatch();
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const onBlock = useSelector(
        (state: ICreateBook) => state.CreateBook.oneBlock
    );

    const bookInfo = useSelector(
        (state: ICreateBook) => state.CreateBook.bookCreateInfo
    );
    const SelectBookSection = useRef<HTMLElement>(null);

    useEffect(() => {
        onBlock &&
            window.scrollTo({
                top: SelectBookSection.current?.offsetTop,
                left: 0,
                behavior: 'smooth'
            });
    }, [onBlock]);

    const [bookSetting, setBookSetting] = useState<any[]>([]);

    useEffect(() => {
        if (myPlan) {
            setBookSetting([]);
            myPlan.options.books.sizes.map((size: string) => {
                setBookSetting((old: any[]) => [
                    ...old,
                    {
                        dimension: size,
                        pages: myPlan.options.books.maxPages,
                        price:
                            myPlan.plan === plansKey.basic
                                ? '$39.99'
                                : 'Your Preferred:'
                    }
                ]);
            });
        }
    }, [myPlan]);

    const [activeIndex, setActiveIndex] = useState<number>(-1);

    function inputSizes(e: IBlocksData) {
        console.log(e);
        setActiveIndex(e.index);

        dispatch(setStep2(true));
        dispatch(
            setBookInfo({
                name: bookInfo.name,
                description: bookInfo.description,
                size: e.info.dimension
            })
        );
    }

    // useEffect(() => {
    //     getSizesBook()
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <section
            ref={SelectBookSection}
            className="select-book-section"
            style={{
                height: onBlock ? 'auto' : '0',
                padding: onBlock ? '4.375rem 0' : '0'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 text-center">
                        <span className="step-icon">1</span>
                        <h2 className="f-omnesMedium fs30 mb-3">
                            Select yout Book Size
                        </h2>
                        <p className="fs17 f-myriadprolight mb-3 lh-13">
                            Choose the book size you want.
                        </p>
                        <p className="step-border">STEP 1/3</p>
                    </div>
                    <div className="row w-100 justify-content-center">
                        {bookSetting.map((e: any, index: number) => {
                            return (
                                <BookSizingBlock
                                    onChange={inputSizes}
                                    key={keyGenerator(20)}
                                    e={e}
                                    index={index}
                                    activeNumber={activeIndex}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectBookSection;
