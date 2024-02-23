import React from 'react'
import styles from "./ModalOverlay.module.css";
import { useNavigate } from 'react-router-dom';

type TModalOverlay = {
};

const ModalOverlay = ({  }:TModalOverlay):JSX.Element => {
  const navigate = useNavigate();

  const handleOverlayClick = (evt: React.MouseEvent) => {
    if (evt.currentTarget === evt.target) {
      navigate(-1)
    }
  } 

  return (
    <div className={styles.overlay}
     onClick={handleOverlayClick}
      />
    )
}

export default React.memo(ModalOverlay)