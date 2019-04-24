import React from 'react';

// this will be the individual visual component that displays each plan
const Plan = props => {
        return (
                <div>
                        <h1>Plan Name: {props.name}</h1>
                        <h2>Price: ${props.price}</h2>
                        <h2>Type: {props.type}</h2>
                        <h3>Section: {props.section}</h3>
                        {props.bestSellers ? <h4>**Best Seller**</h4> : null}
                        <p>{props.description}</p>
                </div>
        );
};

export default Plan;
