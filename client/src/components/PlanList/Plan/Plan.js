import React from 'react';

import cls from './Plan.module.css';

// this will be the individual visual component that displays each plan
const Plan = props => {
        return (
                <div className={cls.PlanCard} onClick={() => props.handleComparison(props.id)}>
                        <h1 className={cls.PlanTitle}>{props.name}</h1>
                        <p className={cls.Description}>{props.description}</p>
                        <h4 className={cls.Price}>Price: ${props.price}</h4>
                        <h4 className={cls.PackageType}>Type: {props.type}</h4>
                        <h4 className={cls.Section}>Section: {props.section}</h4>
                        {props.bestSellers ? <h4 className={cls.BestSellers}>**Best Seller**</h4> : null}
                </div>
        );
};

export default Plan;
