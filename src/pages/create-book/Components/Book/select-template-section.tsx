import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import imgDefBook from 'assets/images/book/img-def-book.svg';
import { createBook } from 'api/all-apis';
import { history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { UM } from 'utils/user-messages';

function SelectTemplateSection() {
    const dispatch = useDispatch();
    const step2 = useSelector((state: ICreateBook) => state.CreateBook.step2);
    const { eventID }: { eventID: string } = useParams();
    const st2Ref = useRef<any>(null);

    useEffect(() => {
        step2 &&
            window.scrollTo({
                top: st2Ref.current?.offsetTop,
                left: 0,
                behavior: 'smooth'
            });
    }, [step2]);

    const bookInfo = useSelector(
        (state: ICreateBook) => state.CreateBook.bookCreateInfo
    );

    function createAndOpenEditor(e: any) {
        e.preventDefault();

        if (bookInfo.description === 'Book Description') {
            dispatch(setMessageUser(UM.FILL_DESC_BOOK));
        } else if (bookInfo.name === '') {
            dispatch(setMessageUser(UM.FILL_NAME_BOOK));
        } else if (bookInfo.size?.dimension === '') {
            dispatch(setMessageUser(UM.FILL_BOOK_SIZE));
        } else {
            dispatch(setMessageUser(UM.P_W));
            const data = {
                userEventId: eventID,
                name: bookInfo.name,
                description: bookInfo.description,
                size: bookInfo.size,
                frontCoverTexts: [],
                isAvailable: false
            };
            createBook(data)
                .then((res) => {
                    console.log(res);
                    history.push(
                        `${DEF_URL.EDIT_BOOK}/${res.data.data.item.id}`
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <section
            ref={st2Ref}
            className={
                step2
                    ? 'select-template-section show'
                    : 'select-template-section hide'
            }>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 text-center">
                        <span className="step-icon">2</span>
                        <h2 className="f-omnesMedium fs30 mb-3">
                            Select Template
                        </h2>
                        <p className="fs17 f-myriadprolight mb-3 lh-13">
                            Select a template that mixes your own content with
                            that of the organizer.
                        </p>
                        <p className="step-border">STEP 2/3</p>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12 mb-xl-0 mb-3 m-auto">
                        <div className="select-template_box  ml-auto trans h-100 text-center">
                            <p className="c-gray fs16 lh-14 mb-40">
                                Go directly to editor
                                <span className="d-block">
                                    and see all templates
                                </span>
                            </p>
                            <img src={imgDefBook} className="mb-5" alt="" />
                            <Link
                                to="#"
                                className="btn red-btn d-block"
                                onClick={createAndOpenEditor}>
                                Go to Editor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectTemplateSection;
