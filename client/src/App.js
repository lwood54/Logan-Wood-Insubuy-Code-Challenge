import React, { useState } from 'react';
import QuoteForm from './components/QuoteForm/QuoteForm';
import PlanList from './components/PlanList/PlanList';

function App() {
        const [showPlans, setShowPlans] = useState(false);
        const toggleShowPlans = () => {
                setShowPlans(!showPlans);
        };

        return <div>{showPlans ? <PlanList /> : <QuoteForm toggleShowPlans={toggleShowPlans} />}</div>;
}

export default App;
