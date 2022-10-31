import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

export const Error = ({classname, modal, toggle}) => {
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={classname}>
                <ModalHeader toggle={toggle}>ERROR</ModalHeader>
                <ModalBody>
                    Before Saving: A Food Group Must Be Selected And The Ingredient Name Must Not Be Blank
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}