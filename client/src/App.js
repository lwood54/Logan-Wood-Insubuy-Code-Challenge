import React, { useState } from 'react';
import QuoteForm from './components/QuoteForm/QuoteForm';
import PlanList from './components/PlanList/PlanList';

function App() {
        const [showPlans, setShowPlans] = useState(true);
        const [showCompareModal, setShowCompareModal] = useState(false);
        return <div>{showPlans ? <PlanList /> : <QuoteForm />}</div>;
}

export default App;
