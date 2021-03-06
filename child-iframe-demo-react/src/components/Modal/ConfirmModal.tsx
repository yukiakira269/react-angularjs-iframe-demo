import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from './ConfirmModal.module.css';
import './ConfirmModal.module.css';
import { triggerInput } from "../configuration/ConfigurationPage";


function ProcessorConfirmModal(props: any) {
    //Only show the modal when the processor's name changes
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(!show);
    }, [props.processorName]);


    //Closes the modal
    function handleClose() {
        setShow(false);
    }
    function handleCancel() {
        handleClose();
        triggerInput("processor", '');
    }

    //Confirmimg processor's choice
    function handleConfirm() {
        handleClose();
        //Disabled to prevent re-selection
        (document.getElementById("processor") as HTMLSelectElement).disabled = true;
    }

    return <div>
        <Modal show={show} onHide={handleCancel} className={styles.modal}>
            <div className={styles.modalDialog}>
                <Modal.Header className={styles.modalHeader}>
                    <Modal.Title>Select Processor</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <div className="row">
                        <div className="col col-md-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" fill="yellow" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                            </svg></div>
                        <div className="col offset-xs-2 col-md-9">
                            <div>
                                Once you leave the current tab the selected
                                <span className="fw-bold"> {props.processorName} </span>
                                will be save and cannot be changed.
                                <br />
                                <br />
                                Please confirm that  you want to continue with
                                <span className="fw-bold"> {props.processorName} </span>
                                processor
                            </div>
                        </div>
                    </div>
                    <div className={styles.modalButton}>
                        <Button variant="primary" onClick={handleConfirm}>
                            Confirm
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    </div>
}
export default ProcessorConfirmModal;