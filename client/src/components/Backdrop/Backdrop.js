import React from 'react';

import cls from './Backdrop.module.css';

const backdrop = props => {
        // use backdrop to cover non modal background components
        // check for showModal boolean, if clicked then cancel modal
        return props.showModal ? <div className={cls.Backdrop} onClick={props.clicked} /> : null;
};

export default backdrop;
