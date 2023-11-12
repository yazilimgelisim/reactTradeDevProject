import { Modal, Button, CloseButton } from 'react-bootstrap';
import {AllContext} from '../../../context/AllContext'
import { useContext } from 'react';

const BuyModal = () => {
    const {state, dispatch} = useContext(AllContext)
    return (
        <Modal show={state.modalShow}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Payment Status</Modal.Title>
                    <CloseButton onClick={()=>dispatch({type:'modalClose'})}/>
                </Modal.Header>

                <Modal.Body>
                    <p>Payment system is currently not active!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch({type:'modalClose'})}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}

export default BuyModal