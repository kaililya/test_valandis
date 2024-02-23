import React  from 'react';
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

type TModal = {
  children: JSX.Element;
};

const Modal = ({ children}:TModal):JSX.Element => {
  const navigate = useNavigate();

  React.useEffect(()=> {
    function handleKeyPressEsc(e:KeyboardEvent) {
      if (e.key === "Escape") {
        navigate(-1);
      }
    }
    document.addEventListener("keydown",  handleKeyPressEsc);

    return () => {
      document.removeEventListener("keydown", handleKeyPressEsc);
    }
  }, []);

  return ReactDOM.createPortal(
    (
      <div>
        <ModalOverlay />
        <section className={styles.modal}>
          <MdClose size={'30px'} color='white' onClick={() => navigate(-1)}/>
          {children}
        </section>
      </div>
    ), document.getElementById("root-modal") as HTMLElement
  )
}

export default React.memo(Modal)