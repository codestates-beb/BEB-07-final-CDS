
// modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

// actions
import { 
    openModal, 
    closeModal,
    setProcessing,
    setSuccess,
    setFail,
    setWaiting
} from '../features/modalSlice';

// css
import '../assets/css/modal.css';

// images
import processing from '../assets/img/processing.gif';
import success from '../assets/img/success.svg';
import fail from '../assets/img/fail.svg';


function Notice() {
    const dispatch = useDispatch();

    const isModalOpened = useSelector(state=> state.modal.isModalOpened);
    const status = useSelector(state=> state.modal.status);
    const swapId = useSelector(state=> state.modal.swapId);
    const timeoutId = useSelector(state=> state.modal.timeoutId);

    const closeModalHandler = ()=>{
        clearTimeout(timeoutId);
        dispatch( closeModal() );
        dispatch( setWaiting() );
    }

    return(
        <Modal 
            className='notice'
            overlayClassName={'overlay'}
            isOpen={isModalOpened}
            ariaHideApp={false}
        >
            <div className='modal-head'>
                <div className='modal-title'>
                    <h1>Notice</h1>
                </div>
            </div>
            <div className='modal-content'>
                { status === 1 ?
                    <div className='notice-wrapper processing'>
                        <img src={processing}/>
                        <p>Your Transaction Processing</p>
                    </div>
                    : <></>
                }
                { status === 2 ?
                    <div className='notice-wrapper success'>
                        <img src={success}/>
                        <p>Your Transaction Success</p>
                        <p>For Swap ID # {swapId}</p>
                        <p>After 3 Seconds,</p>
                        <p>you will go main.</p>
                    </div>
                    : <></>
                }
                { status === 3 ?
                    <div className='notice-wrapper fail'>
                        <img src={fail}/>
                        <p>Your Transaction Failed</p>
                        <p>After 3 Seconds,</p>
                        <p>This modal will be Closed</p>
                    </div>
                    : <></>
                }
            </div>
            <div className='modal-tail'>
                { status === 3 ?
                    <div className='button-group'>
                        <button onClick={closeModalHandler}>Close</button>
                    </div>
                    : <></>
                }
                
            </div>
        </Modal>
    )
}

export default Notice;