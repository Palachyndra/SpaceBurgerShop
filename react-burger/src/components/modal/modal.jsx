import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const Modal = ({ setIsOpen, modalDetails, orderOrNot }) => {
    React.useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close)
    }, [])

    return (
        <>
            <ModalOverlay setIsOpen={setIsOpen} />
            <div className={styles.centered} >
                <div className={styles.header_container + " pl-10 pt-10 pr-10"}>
                    {!orderOrNot &&
                        <div className="text text_type_main-large">
                            Детали ингредиента
                        </div>
                    }
                    <div className={styles.header_container_close} onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </div>
                </div>
                <div>
                    {modalDetails}
                </div>
            </div>
        </>
    );
}

const ModalOverlay = ({ setIsOpen }) => {
    return (
        <div className={styles.dark} onClick={() => setIsOpen(false)} />
    )
}

export default Modal;
