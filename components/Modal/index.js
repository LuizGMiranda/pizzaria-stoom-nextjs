import { Fragment } from "react";
import styles from '../../styles/Modal.module.css'

function Modal({ show, title, description, onClose }) {
  return (
    <Fragment>
      {show ? (
        <div className={styles.modalContainer} onClick={onClose}>
          <div className={styles.modal}>
            <h2>{title}</h2>
            <span>{description}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default Modal;
