import React, { useRef, useState } from 'react';
import { Accordion, Button, Card, Col, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import orImg from '../images/or-img.png';
import {
    faArrowLeft,
    faCalendarDay,
    faCaretRight,
    faCheckCircle,
    faHistory,
    faMapMarkerAlt,
    faSearch,
    faTrash,
    faUpload,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import * as EmailValidator from 'email-validator';
import evetImg from '../images/Screenshot_1.png';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    openModal: boolean;
    closeModal: any;
}

function ModalInvite({ openModal, closeModal }: IThisProps) {
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    return <h1>Modal</h1>; // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО
    // --------->>>>>>СЕЙЧАС ЭТО НЕ НАДО

    // const [arrayToAddMAils, setArrayToAddMAils] = useState<any[]>([]);
    // const [emailsToUploadFile, setEmailsToUploadFile] = useState<any[]>([]);
    // const [fileUploadet, setFileUpLoaded] = useState('');
    // const [openEventPrev, setOpenEventPrev] = useState(false);
    //
    // function FindAndAddMailsToInput(e: any) {
    //     e.preventDefault();
    //     const inpValue = e.target.querySelector('#email-to-add').value;
    //
    //     inpValue !== '' && EmailValidator.validate(inpValue)
    //         ? setArrayToAddMAils((oldArray: any) => [...oldArray, inpValue])
    //         : false;
    // }
    //
    // const processData = (dataString: any) => {
    //     const dataStringLines = dataString.split(/\r\n|\n/);
    //
    //     dataStringLines.map((e: any, x: number) => {
    //         const rows = e.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    //
    //         rows.map((emails: string) => {
    //             if (emails !== '' && EmailValidator.validate(emails)) {
    //                 setEmailsToUploadFile((array: any) => [...array, emails]);
    //             }
    //         });
    //     });
    // };
    //
    // const handleFileUpload = (e: any) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setFileUpLoaded(file.name);
    //         const reader = new FileReader();
    //         reader.onload = (evt) => {
    //             const bstr = evt.target?.result;
    //             const wb = XLSX.read(bstr, { type: 'binary' });
    //             const wsname = wb.SheetNames[0];
    //             const ws = wb.Sheets[wsname];
    //             const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    //             processData(data);
    //         };
    //         reader.readAsBinaryString(file);
    //     }
    // };
    //
    // const chooseFileToInviteUser = useRef();
    // function removeUploadedTable() {
    //     setEmailsToUploadFile([]);
    //     setFileUpLoaded('');
    //     chooseFileToInviteUser.current.value = '';
    // }
    //
    // function RemoveEmailsArray() {
    //     setArrayToAddMAils([]);
    // }
    //
    // function closeEventBlock() {
    //     setOpenEventPrev(false);
    // }
    //
    // function removeEmail(mail) {
    //     console.log(mail);
    //     console.log(arrayToAddMAils);
    //     let array = [];
    //     // eslint-disable-next-line array-callback-return
    //     arrayToAddMAils.map((e, x) => {
    //         if (e !== mail) {
    //             array.push(e);
    //         }
    //         if (x === arrayToAddMAils.length - 1) {
    //             setArrayToAddMAils(array);
    //             array = [];
    //         }
    //     });
    // }
    //
    // function removeEmailToUploaded(mail) {
    //     console.log(emailsToUploadFile);
    //     let array = [];
    //     // eslint-disable-next-line array-callback-return
    //     emailsToUploadFile.map((e, x) => {
    //         if (e !== mail) {
    //             array.push(e);
    //         }
    //         if (x === emailsToUploadFile.length - 1) {
    //             setEmailsToUploadFile(array);
    //             array = [];
    //         }
    //     });
    // }
    //
    // // document.querySelector('.remove-emails')
    // //     .addEventListener('click', function (){
    // //         console.log(this)
    // //     })
    //
    // return (
    //     <>
    //         <Modal
    //             className="modal-to-invite"
    //             size="xl"
    //             show={openModal}
    //             onHide={closeModal}>
    //             <Modal.Header className="border-bottom" closeButton>
    //                 {openEventPrev ? (
    //                     <Modal.Title>
    //                         <div className="row mb-3 d-flex justify-content-between align-items-center">
    //                             <div className="col-5 d-flex align-items-center justify-content-start">
    //                                 <FontAwesomeIcon
    //                                     onClick={closeEventBlock}
    //                                     icon={faArrowLeft}
    //                                     className="fs22 cursor-pointer c-red mr-3"
    //                                 />
    //                                 <h2 className="mb-0">Previous Events</h2>
    //                             </div>
    //                             <div className="col-5 d-flex justify-content-end">
    //                                 <form
    //                                     action="#"
    //                                     className="form-to-search-event-modal">
    //                                     <input
    //                                         type="text"
    //                                         placeholder="Search an event..."
    //                                     />
    //                                     <FontAwesomeIcon icon={faSearch} />
    //                                 </form>
    //                             </div>
    //                         </div>
    //                     </Modal.Title>
    //                 ) : (
    //                     <Modal.Title>Invite User</Modal.Title>
    //                 )}
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <div
    //                     className={
    //                         openEventPrev
    //                             ? 'modal-body-to-add-email hide'
    //                             : 'modal-body-to-add-email show'
    //                     }>
    //                     <Row className="border-bottom">
    //                         <Col lg={5}>
    //                             <form
    //                                 action="#"
    //                                 onSubmit={FindAndAddMailsToInput}>
    //                                 <label htmlFor="" className="labels">
    //                                     <p className="title">Invite by Email</p>
    //                                     <input
    //                                         id="email-to-add"
    //                                         type="email"
    //                                         placeholder="email"
    //                                     />
    //                                 </label>
    //                                 <button
    //                                     type="submit"
    //                                     className="btn-add-email-invit btn bgc-red c-white pl-4 pr-4">
    //                                     Add
    //                                 </button>
    //                             </form>
    //                         </Col>
    //                         <img
    //                             src={orImg}
    //                             className="or-image"
    //                             alt="or img"
    //                         />
    //                         <Col lg={5} className="ml-4">
    //                             <Row className="mt-3">
    //                                 <Col lg={6}>
    //                                     <label
    //                                         htmlFor="choose-file-to-invite-user"
    //                                         className="btn-add-email-invit btn bgc-red c-white pl-4 pr-4 mt-2">
    //                                         <FontAwesomeIcon
    //                                             icon={faUpload}
    //                                             className="mr-2"
    //                                         />
    //                                         Upload CVS File
    //                                     </label>
    //                                     <input
    //                                         accept=".csv"
    //                                         onChange={handleFileUpload}
    //                                         type="file"
    //                                         ref={chooseFileToInviteUser}
    //                                         id="choose-file-to-invite-user"
    //                                         style={{ display: 'none' }}
    //                                     />
    //                                 </Col>
    //                                 <Col lg={6}>
    //                                     <button
    //                                         onClick={() => {
    //                                             setOpenEventPrev(true);
    //                                         }}
    //                                         className="btn-add-email-invit btn bgc-red c-white pl-4 pr-4 mt-2">
    //                                         <FontAwesomeIcon
    //                                             icon={faHistory}
    //                                             className="mr-2"
    //                                         />
    //                                         Previous Events
    //                                     </button>
    //                                 </Col>
    //                             </Row>
    //                             {fileUploadet ? (
    //                                 <Row className="mt-2 ">
    //                                     <p className="file-uploaded-status">
    //                                         <FontAwesomeIcon
    //                                             icon={faCheckCircle}
    //                                             className="mr-2"
    //                                             style={{ color: '#26b118' }}
    //                                         />
    //                                         File {fileUploadet} uploaded
    //                                     </p>
    //                                 </Row>
    //                             ) : (
    //                                 ''
    //                             )}
    //                         </Col>
    //                     </Row>
    //
    //                     <Accordion>
    //                         {arrayToAddMAils.length > 0 ? (
    //                             <Card>
    //                                 <Card.Header className="outline">
    //                                     <Accordion.Toggle
    //                                         as={Button}
    //                                         variant="text"
    //                                         eventKey="0">
    //                                         <FontAwesomeIcon
    //                                             icon={faCaretRight}
    //                                             className="mr-2 iconDrop"
    //                                         />
    //                                         Invite by Email
    //                                         <FontAwesomeIcon
    //                                             onClick={RemoveEmailsArray}
    //                                             icon={faTrash}
    //                                             className="ml-2 color-red-to-trash cursor-pointer"
    //                                         />
    //                                     </Accordion.Toggle>
    //                                 </Card.Header>
    //                                 <Accordion.Collapse eventKey="0">
    //                                     <Card.Body
    //                                         style={{ marginLeft: '2rem' }}>
    //                                         {arrayToAddMAils.map((e) => {
    //                                             return (
    //                                                 <span
    //                                                     key={keyGenerator(30)}
    //                                                     className="mails-to-add-invite">
    //                                                     {e}
    //                                                     <FontAwesomeIcon
    //                                                         onClick={() => {
    //                                                             removeEmail(e);
    //                                                         }}
    //                                                         icon={faTrash}
    //                                                         className="ml-2 remove-emails color-red-to-trash cursor-pointer"
    //                                                     />
    //                                                 </span>
    //                                             );
    //                                         })}
    //                                     </Card.Body>
    //                                 </Accordion.Collapse>
    //                             </Card>
    //                         ) : (
    //                             ''
    //                         )}
    //
    //                         {fileUploadet ? (
    //                             <Card>
    //                                 <Card.Header>
    //                                     <Accordion.Toggle
    //                                         as={Button}
    //                                         variant="text"
    //                                         eventKey="1">
    //                                         <FontAwesomeIcon
    //                                             icon={faCaretRight}
    //                                             className="mr-2 iconDrop"
    //                                         />
    //                                         {'"'}
    //                                         {fileUploadet}
    //                                         {'"'} file
    //                                         <FontAwesomeIcon
    //                                             onClick={removeUploadedTable}
    //                                             icon={faTrash}
    //                                             className="ml-2 color-red-to-trash cursor-pointer"
    //                                         />
    //                                     </Accordion.Toggle>
    //                                 </Card.Header>
    //                                 <Accordion.Collapse eventKey="1">
    //                                     <Card.Body
    //                                         style={{ marginLeft: '2rem' }}>
    //                                         <Row>
    //                                             {emailsToUploadFile.map((e) => {
    //                                                 return (
    //                                                     <span
    //                                                         key={keyGenerator(
    //                                                             30
    //                                                         )}
    //                                                         className="mails-to-add-invite">
    //                                                         {e}
    //                                                         <FontAwesomeIcon
    //                                                             onClick={() => {
    //                                                                 removeEmailToUploaded(
    //                                                                     e
    //                                                                 );
    //                                                             }}
    //                                                             icon={faTrash}
    //                                                             className="ml-2 remove-emails color-red-to-trash cursor-pointer"
    //                                                         />
    //                                                     </span>
    //                                                 );
    //                                             })}
    //                                         </Row>
    //                                     </Card.Body>
    //                                 </Accordion.Collapse>
    //                             </Card>
    //                         ) : (
    //                             ''
    //                         )}
    //
    //                         <Card>
    //                             <Card.Header>
    //                                 <Accordion.Toggle
    //                                     as={Button}
    //                                     variant="text"
    //                                     eventKey="2">
    //                                     <FontAwesomeIcon
    //                                         icon={faCaretRight}
    //                                         className="mr-2 iconDrop"
    //                                     />
    //                                     {'"'}Redbul Enduro 2018{'"'} Event{' '}
    //                                     Assistants
    //                                     <FontAwesomeIcon
    //                                         icon={faTrash}
    //                                         className="ml-2 color-red-to-trash cursor-pointer"
    //                                     />
    //                                 </Accordion.Toggle>
    //                             </Card.Header>
    //                             <Accordion.Collapse eventKey="2">
    //                                 <Card.Body style={{ marginLeft: '2rem' }}>
    //                                     Hello! I{"'"}m another body
    //                                 </Card.Body>
    //                             </Accordion.Collapse>
    //                         </Card>
    //                     </Accordion>
    //                 </div>
    //
    //                 {/*--------event prev block-------------------*/}
    //                 <div
    //                     className={
    //                         openEventPrev
    //                             ? 'Event-block-to-modal show'
    //                             : 'Event-block-to-modal hide'
    //                     }>
    //                     <Row className="border mr-2 ml-2 pt-2 pb-2 mb-2">
    //                         <div className="col-2 d-flex justify-content-center align-items-center">
    //                             <img className="rounded" src={evetImg} alt="" />
    //                         </div>
    //                         <div className="col-9">
    //                             <div className="row">
    //                                 <h2 className="font-bold">Event Name</h2>
    //                             </div>
    //                             <div className="row mt-2">
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faUser}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         500 Users
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faCalendarDay}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         1 - 2 June 2021, 10:00 AM
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faMapMarkerAlt}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         Madrid, Spain
    //                                     </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="col-1 d-flex justify-content-center align-items-center">
    //                             <FontAwesomeIcon
    //                                 icon={faCheckCircle}
    //                                 className="fs30 c-red"
    //                             />
    //                         </div>
    //                     </Row>
    //
    //                     <Row className="border mr-2 ml-2 pt-2 pb-2 mb-2">
    //                         <div className="col-2 d-flex justify-content-center align-items-center">
    //                             <img className="rounded" src={evetImg} alt="" />
    //                         </div>
    //                         <div className="col-9">
    //                             <div className="row">
    //                                 <h2 className="font-bold">Event Name</h2>
    //                             </div>
    //                             <div className="row mt-2">
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faUser}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         500 Users
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faCalendarDay}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         1 - 2 June 2021, 10:00 AM
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faMapMarkerAlt}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         Madrid, Spain
    //                                     </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="col-1 d-flex justify-content-center align-items-center">
    //                             <FontAwesomeIcon
    //                                 icon={faCheckCircle}
    //                                 className="fs30 c-red"
    //                             />
    //                         </div>
    //                     </Row>
    //
    //                     <Row className="border mr-2 ml-2 pt-2 pb-2 mb-2">
    //                         <div className="col-2 d-flex justify-content-center align-items-center">
    //                             <img className="rounded" src={evetImg} alt="" />
    //                         </div>
    //                         <div className="col-9">
    //                             <div className="row">
    //                                 <h2 className="font-bold">Event Name</h2>
    //                             </div>
    //                             <div className="row mt-2">
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faUser}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         500 Users
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faCalendarDay}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         1 - 2 June 2021, 10:00 AM
    //                                     </span>
    //                                 </div>
    //                                 <div className="col pl-0">
    //                                     <FontAwesomeIcon
    //                                         icon={faMapMarkerAlt}
    //                                         className="mr-2 c-red"
    //                                     />
    //                                     <span className="information c-gray">
    //                                         Madrid, Spain
    //                                     </span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="col-1 d-flex justify-content-center align-items-center">
    //                             <FontAwesomeIcon
    //                                 icon={faCheckCircle}
    //                                 className="fs30 c-red"
    //                             />
    //                         </div>
    //                     </Row>
    //                 </div>
    //
    //                 {/*--------event prev block-------------------*/}
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 {openEventPrev ? (
    //                     <Button
    //                         variant="outline"
    //                         className="bgc-red c-white"
    //                         onClick={closeModal}>
    //                         Add Previous Users
    //                     </Button>
    //                 ) : (
    //                     <Button
    //                         variant="outline"
    //                         className="bgc-red c-white"
    //                         onClick={closeModal}>
    //                         Send Invites
    //                     </Button>
    //                 )}
    //             </Modal.Footer>
    //         </Modal>
    //     </>
    // );
}

export default ModalInvite;
