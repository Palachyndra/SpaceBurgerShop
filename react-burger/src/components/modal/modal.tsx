import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModalProps } from '../../types/generalTypes';

const Modal = (props: TModalProps) => {
    React.useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose()
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close)
    })

    return (
        <>
            <ModalOverlay onClose={props.onClose}/>
            <div className={styles.centered} >
                <div className={styles.header_container + " pl-10 pt-10 pr-10"}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <div className={styles.header_container_close} onClick={() => props.onClose()}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </>
    );
}

const ModalOverlay = (props: any) => {
    return (
        <div className={styles.dark} onClick={() => props.onClose(false)}/>
    )
}

export default Modal;
