import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import cls from './CompareModal.module.css';

const CompareModal = props => {
        return (
                <div>
                        <Backdrop showModal={props.showModal} clicked={props.cancelModal} />
                        <div
                                className={cls.Modal}
                                style={{
                                        transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                                        opacity: props.showModal ? '1' : '0'
                                }}
                        >
                                {props.children}
                        </div>
                </div>
        );
};

export default CompareModal;
