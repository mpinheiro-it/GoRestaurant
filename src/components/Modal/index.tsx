import { Component } from 'react';
import ReactModal from 'react-modal';

interface ModalProps{
  isOpen: boolean, 
  setIsOpen: () => void,
}


function Modal({ isOpen, setIsOpen }: ModalProps) {

    // componentDidUpdate(prevProps) {   

  //   if (prevProps.isOpen !== isOpen) {
  //     console.log(this.props)
  //     this.setState({ modalStatus: isOpen })
  //   }
  // }

  
    //const { children, setIsOpen } = this.props;
    //const { modalStatus } = this.state;

    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {/* {children} */}
      </ReactModal>
    );
  }


export default Modal;