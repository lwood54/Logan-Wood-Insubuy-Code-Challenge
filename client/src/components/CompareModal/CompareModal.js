import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import cls from './CompareModal.module.css';

// higher order component that takes in whether or not to display
// this will take an array of up to 4 different plans to compare, minimum of 2
// it also passes whether to show to the backdrop, which will coverup any other components
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
