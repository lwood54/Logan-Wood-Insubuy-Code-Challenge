// import React and React Hooks to use
import React, { useState, useEffect } from 'react';
// axios helps with Http requests
import axios from 'axios';
// Modal for plan comparison
import CompareModal from '../CompareModal/CompareModal';
// individual plan component
import Plan from './Plan/Plan';
import cls from './PlanList.module.css';

const PlanList = () => {
        // setting initial plans state to an empty array
        const [plans, setPlans] = useState([]);

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
                        });
        }, []);

        // set initial showModal visibility to false
        const [showModal, setShowModal] = useState(false);

        // function to handle showing Modal
        const handleShowModal = () => {
                if (collectCompares.length > 1 && collectCompares.length <= 4) {
                        setShowModal(true);
                }
        };
        // switch showModal to false to show background
        // and remove modal
        const cancelModal = () => {
                setShowModal(false);
                setCollectCompares([]);
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
        const handleFilter = e => {
                let newPlans = [];
                if (e.target.id === 'byBestSellers') {
                        newPlans = plans.filter(plan => plan.bestSellers);
                } else if (e.target.id === 'byComprehensive') {
                        newPlans = plans.filter(plan => plan.type === 'Comprehensive');
                } else if (e.target.id === 'byFixed') {
                        newPlans = plans.filter(plan => plan.type === 'Fixed');
                }
                setIsSorted(true);
                setSortedPlans(newPlans);
        };
        const [section, setSection] = useState('');
        const handleSection = e => {
                let newPlans = [];
                switch (e.target.value) {
                        case 'Travel Medical':
                                newPlans = plans.filter(plan => plan.section === 'Travel Medical');
                                setIsSorted(true);
                                setSortedPlans(newPlans);
                                break;
                        case 'International Travel Medical':
                                newPlans = plans.filter(
                                        plan => plan.section === 'International Travel Medical'
                                );
                                setIsSorted(true);
                                setSortedPlans(newPlans);
                                break;
                        case 'Student Medical':
                                newPlans = plans.filter(plan => plan.section === 'Student Medical');
                                setIsSorted(true);
                                setSortedPlans(newPlans);
                                break;
                        case 'J1 Medical':
                                newPlans = plans.filter(plan => plan.section === 'J1 Medical');
                                setIsSorted(true);
                                setSortedPlans(newPlans);
                                break;
                        default:
                                return;
                }
        };
        const [showList, setShowList] = useState(false);
        const handleToggleList = () => {
                setShowList(!showList);
        };

        const [collectCompares, setCollectCompares] = useState([]);
        const handleComparison = id => {
                let flag = false;
                collectCompares.forEach(collection => {
                        if (collection.id === id) {
                                flag = true;
                        }
                });
                if (collectCompares.length < 4 && !flag) {
                        plans.forEach(plan => {
                                if (plan.id === id) {
                                        console.log('collectedCompares: ', collectCompares);
                                        let addPlan = [...collectCompares, plan];
                                        setCollectCompares(addPlan);
                                }
                        });
                }
        };

        const plansDisplay = plans.map(plan => (
                <Plan {...plan} key={plan.id} handleComparison={handleComparison} />
        ));
        const sortedPlansDisplay = sortedPlans.map(plan => (
                <Plan {...plan} key={plan.id} handleComparison={handleComparison} />
        ));
        const comparePlansDisplay =
                collectCompares.length > 0
                        ? collectCompares.map(plan => (
                                  <Plan {...plan} key={plan.id} handleComparison={handleComparison} />
                          ))
                        : null;
        return (
                <div>
                        <div className={cls.ButtonContainer}>
                                <button onClick={handleShowModal} className={cls.sortButtons}>
                                        Compare Up to 4 Plans
                                </button>
                                <button onClick={handleSort} id="byName" className={cls.sortButtons}>
                                        Sort By Name
                                </button>
                                <button onClick={handleSort} id="byPrice" className={cls.sortButtons}>
                                        Sort By Price
                                </button>
                                <button onClick={handleFilter} id="byBestSellers" className={cls.sortButtons}>
                                        Find Best Sellers
                                </button>
                                <button
                                        onClick={handleFilter}
                                        id="byComprehensive"
                                        className={cls.sortButtons}
                                >
                                        Find Comprehensive Plans
                                </button>
                                <button onClick={handleFilter} id="byFixed" className={cls.sortButtons}>
                                        Find Fixed Plans
                                </button>
                                <select value={section} onChange={handleSection} className={cls.sortButtons}>
                                        <option value="">Filter by section</option>
                                        <option value="Travel Medical">Travel Medical</option>
                                        <option value="International Travel Medical">
                                                International Travel Medical
                                        </option>
                                        <option value="Student Medical">Student Medical</option>
                                        <option value="J1 Medical">J1 Medical</option>
                                </select>
                                <button onClick={handleToggleList} className={cls.sortButtons}>
                                        Toggle Grid/List
                                </button>
                        </div>
                        <div>
                                <h3>Plans to Compare: </h3>
                                {collectCompares.length > 0
                                        ? collectCompares.map(collection => {
                                                  return <p key={collection.id}>{collection.name}</p>;
                                          })
                                        : null}
                        </div>
                        <div className={showList ? cls.ListView : cls.GridView}>
                                {isSorted ? sortedPlansDisplay : plansDisplay}
                        </div>

                        <CompareModal showModal={showModal} cancelModal={cancelModal}>
                                {comparePlansDisplay}
                        </CompareModal>
                </div>
        );
};

export default PlanList;
