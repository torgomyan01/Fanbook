import React from 'react';
import { Modal } from 'react-bootstrap';
import infoCircle from 'assets/images/publisher-profile/CSV-file.svg';
import { Link } from 'react-router-dom';

interface IThisProps {
    show: boolean;
    hide: any;
}

function ModalFollowers({ show, hide }: IThisProps) {
    return (
        <>
            <Modal
                size="xl"
                show={show}
                onHide={hide}
                id="follower-modal"
                className="modal-bg-blur-effect">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="d-md-flex align-items-center">
                            <h2 className="fs24 f-omnesMedium mb-md-0 mb-2 mr-5">
                                MotoGP Followers
                            </h2>
                            <Link
                                to="#"
                                className="down-btn btn d-flex align-items-center">
                                <img src={infoCircle} alt="" className="mr-2" />
                                Download as a CSV
                            </Link>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="table-header d-flex">
                        <li className="table-header-item">
                            <span className="table-title">Name</span>
                        </li>
                        <li className="table-header-item">
                            <span className="table-title">Email</span>
                        </li>
                        <li className="table-header-item">
                            <span className="table-title">Events</span>
                        </li>
                        <li className="table-header-item">
                            <span className="table-title">Date of Follow</span>
                        </li>
                    </ul>
                    <div className="scroll-vertical">
                        <table className="w-100">
                            <tbody>
                                <tr>
                                    <td className="table-header-item">
                                        Michael Romero
                                    </td>
                                    <td className="table-header-item">
                                        michael.romero@example.com
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                        <span className="red-btn ml-1">+3</span>
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                        <span className="red-btn ml-1">+1</span>
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item" />
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                                <tr>
                                    <td className="table-header-item">
                                        Alicia Ramos
                                    </td>
                                    <td className="table-header-item">
                                        alice@ramos.es
                                    </td>
                                    <td className="table-header-item">
                                        Harley-Davidson Event 2020
                                    </td>
                                    <td className="table-header-item">
                                        Feb. 27, 2020
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalFollowers;
