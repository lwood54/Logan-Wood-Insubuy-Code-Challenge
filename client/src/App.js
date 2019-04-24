import React from 'react';
import QuoteForm from './components/QuoteForm';
import axios from 'axios';

function App() {
        axios.get('http://localhost:8080/quotes').then(res => {
                console.log('data: ', res.data);
        });
        return (
                <div>
                        <QuoteForm />
                </div>
        );
}

export default App;
