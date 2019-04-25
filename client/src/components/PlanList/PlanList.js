// import React and React Hooks to use
import React, { useState, useEffect } from 'react';
// axios helps with Http requests
import axios from 'axios';
// Modal for plan comparison
import CompareModal from '../CompareModal/CompareModal';
// individual plan component
import Plan from './Plan/Plan';

const PlanList = () => {
        // setting initial plans state to an empty array
        const [plans, setPlans] = useState([]);

        // setting initial errorMessage to empty string
        const [errorMessage, setErrorMessage] = useState('');

        // on initial mount of component, fetch data and store in plans
        // this will only run once
        useEffect(() => {
                // get data using proxy server, this could be http if proxy had not been set up
                axios.get('/quotes')
                        .then(res => {
                                setPlans(res.data.quotes);
                        })
                        .catch(error => {
                                console.log('error message: ', error);
                                setErrorMessage('Sorry, we are unable to compare plans right now.');
                        });
        }, []);

        // set initial showModal visibility to false
        const [showModal, setShowModal] = useState(false);

        // function to handle showing Modal
        const handleShowModal = () => {
                setShowModal(true);
        };
        // switch showModal to false to show background
        // and remove modal
        const cancelModal = () => {
                setShowModal(false);
        };
        const [sortedPlans, setSortedPlans] = useState([]);
        const [isSorted, setIsSorted] = useState(false);
        const handleSort = e => {
                let newPlans = [...plans];
                if (e.target.id === 'byName') {
                        newPlans.sort((a, b) => {
                                if (a.name > b.name) {
                                        return 1;
                                }
                                if (a.name < b.name) {
                                        return -1;
                                }
                                return 0;
                        });
                        setIsSorted(true);
                        setSortedPlans(newPlans);
                } else if (e.target.id === 'byPrice') {
                        newPlans.sort((a, b) => {
                                if (a.price > b.price) {
                                        return 1;
                                }
                                if (a.price < b.price) {
                                        return -1;
                                }
                                return 0;
                        });
                        setIsSorted(true);
                        setSortedPlans(newPlans);
                }
        };
        // creating display component by mapping the array of objects
        // this will need to change later to include filtering and sorting
        // it should have the filtering and sorting done first, then it should map through
        // the array and pass along data to display individually
        const plansDisplay = plans.map(plan => <Plan {...plan} key={plan.id} />);
        const sortedPlansDisplay = sortedPlans.map(plan => <Plan {...plan} key={plan.id} />);
        return (
                <div>
                        <button onClick={handleShowModal}>Show Modal</button>
                        <button onClick={handleSort} id="byName">
                                Sort By Name
                        </button>
                        <button onClick={handleSort} id="byPrice">
                                Sort By Price
                        </button>
                        {isSorted ? sortedPlansDisplay : plansDisplay}
                        <CompareModal showModal={showModal} cancelModal={cancelModal}>
                                <h1>This is where we will compare up to 4 plans, but not fewer than 2.</h1>
                        </CompareModal>
                </div>
        );
};

export default PlanList;
