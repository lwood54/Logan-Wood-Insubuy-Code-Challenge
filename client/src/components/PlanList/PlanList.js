import React, { useState } from 'react';
import axios from 'axios';
import CompareModal from '../CompareModal/CompareModal';

const PlanList = () => {
        axios.get('http://localhost:8080/quotes').then(res => {
                console.log('data: ', res.data);
        });
        const [showModal, setShowModal] = useState(true);

        // switch showModal to false to show background
        // and remove modal
        const cancelModal = () => {
                setShowModal(false);
        };
        return (
                <div>
                        <h1>Plan 1</h1>
                        <h1>Plan 2</h1>
                        <h1>Plan 3</h1>
                        <CompareModal showModal={showModal} cancelModal={cancelModal}>
                                <h1>This is where we will compare up to 4 plans, but not fewer than 2.</h1>
                        </CompareModal>
                </div>
        );
};

export default PlanList;
