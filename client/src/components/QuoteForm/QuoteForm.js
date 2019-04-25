import React, { useState } from 'react';

import cls from './QuoteForm.module.css';
import insubuyImg from './images/insubuyImg.png';

const QuoteForm = props => {
        // create and set state and default for policy selection
        const [policyVal, setPolicyVal] = useState(0);
        const [isPolicyValid, setIsPolicyValid] = useState(true);

        // handles controlled component upon selection
        const handlePolicyVal = e => {
                // compares event value to make sure it's not still default
                if (e.target.value !== 0) {
                        // removes red box notification when user begins input
                        // to correct error
                        setIsPolicyValid(true);
                }
                // allows user view to be that which user inputs
                setPolicyVal(e.target.value);
        };
        // used on submit to confirm that user didn't leave policy unselected
        const validatePolicy = () => {
                if (policyVal !== 0) {
                        return true;
                } else {
                        setIsPolicyValid(false);
                        return false;
                }
        };

        // handling age input / changes / validation
        const [age, setAge] = useState('');
        const [agePlaceholder, setAgePlaceholder] = useState('age');
        const [isAgeValid, setIsAgeValid] = useState(true);
        const handleAgeChange = e => {
                if (e.target.value.length > 0) {
                        setIsAgeValid(true);
                }
                setAge(e.target.value);
        };

        // used to validate on submit that user has entered an appropriate age or birth year
        const validateAge = () => {
                // accessed current date to get year
                const today = new Date();
                const currentYear = today.getFullYear();
                // confirms age is a number and is not an empty field
                if (!isNaN(age) && age !== '') {
                        // if age falls between 0 and 100, then valid
                        if (age <= 100 && age >= 0) {
                                return true;
                        } else if (age > 1890 && age <= currentYear) {
                                // tests if the input was equivalent to a year
                                // calculates age based on current year
                                setAge(currentYear - age);
                                return true;
                        } else {
                                // user had an error and is prompted to correct
                                setAgePlaceholder('Enter valid age');
                                setIsAgeValid(false);
                                setAge('');
                                return false;
                        }
                } else {
                        // if user did not use numbers, user is prompted to correct
                        setAgePlaceholder('Enter age / birth year');
                        setIsAgeValid(false);
                        setAge('');
                        return false;
                }
        };

        // define whether to show the calendar selector, which will
        // be switched when user clicks in selector
        const [showStartDate, setShowStartDate] = useState(false);
        const handleShowStartDate = () => {
                setShowStartDate(true);
        };
        // defines default no show of calendar selector until user clicks
        const [showEndDate, setShowEndDate] = useState(false);
        const handleShowEndDate = () => {
                setShowEndDate(true);
        };

        // defines start date from user selection
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        // sets error message for user prompt if they end up
        // using date range backwards or incorrect
        const [dateError, setDateError] = useState('');
        // manages date selector input from user
        const handleDatePicker = e => {
                if (e.target.name === 'start') {
                        setStartDate(e.target.value);
                } else if (e.target.name === 'end') {
                        setEndDate(e.target.value);
                }
        };
        // used to confirm that user did not put start date chronologically after end date
        const validateDateRange = () => {
                if (startDate < endDate) {
                        return true;
                } else {
                        setShowStartDate(false);
                        setShowEndDate(false);
                        setDateError('Invalid Date Range');
                        return false;
                }
        };

        // sets default value for citizenship input
        const [citizenship, setCitizenship] = useState('');
        // defines validation flag
        const [isCitValid, setIsCitValid] = useState(true);
        // handles user input from citizenship
        const handleCitizenship = e => {
                if (e.target.value !== '') {
                        setIsCitValid(true);
                }
                setCitizenship(e.target.value);
        };

        // compares string input to regex expression to confirm that letters
        // are used, but first handles when multiple words in one string
        const characterValidation = str => {
                let strArr = str.split(' ');
                let notValidCount = 0;
                strArr.forEach(str => {
                        if (!/^[a-zA-Z]*$/.test(str)) {
                                notValidCount++;
                        }
                });
                // if count is 0, then only letters were used
                return notValidCount === 0;
        };
        // on submit, this validates the citizenship using validation func
        const validateCitizenship = () => {
                if (citizenship !== '' && characterValidation(citizenship)) {
                        return true;
                } else {
                        setIsCitValid(false);
                        setCitizenship('enter country name');
                }
        };
        // removes error when user begins input again
        const handleCitizenshipReset = () => {
                setCitizenship('');
        };

        // define variable and default for state input
        const [mailingState, setMailingState] = useState('');
        const [isStateValid, setIsStateValid] = useState(true);
        // manages user input of mailingState prompt
        const handleMailingState = e => {
                if (e.target.value !== '') {
                        setIsStateValid(true);
                }
                setMailingState(e.target.value);
        };
        // used on submit to confirm that that only letters are used
        // validation fun reused from citizenship validation
        const validateMailingState = () => {
                if (mailingState !== '' && characterValidation(mailingState)) {
                        return true;
                } else {
                        setIsStateValid(false);
                        setMailingState('Enter valid state');
                }
        };
        // resets when user begins input to remove error box
        const handleMailingStateReset = () => {
                setMailingState('');
        };

        // handles user submit and goes through validation for each input field
        // and adds flags validation boolean to trigger class addition for CSS red box
        const handleSubmit = e => {
                e.preventDefault();
                let policyValidation = validatePolicy();
                let ageValidation = validateAge();
                let dateValidation = validateDateRange();
                let citizenshipValidation = validateCitizenship();
                let mailingStateValidation = validateMailingState();
                if (
                        !policyValidation ||
                        !ageValidation ||
                        !dateValidation ||
                        !citizenshipValidation ||
                        !mailingStateValidation
                ) {
                        return false;
                } else {
                        // activates method from props from a parent component
                        // in order to show quote plans or not
                        // if user inputs are all valid, quote plans will be shown
                        props.toggleShowPlans();
                        return true;
                }
        };

        // resets state and booleans for all form fields
        const handleFormReset = () => {
                setPolicyVal(0);
                setAge('');
                setStartDate(null);
                setEndDate(null);
                setDateError('');
                setShowStartDate(false);
                setShowEndDate(false);
                setCitizenship('');
                setMailingState('');
                setIsPolicyValid(true);
                setIsAgeValid(true);
                setIsCitValid(true);
                setIsStateValid(true);
        };

        return (
                <div className={cls.FormCard}>
                        <div className={cls.FormHeading}>
                                <img className={cls.HeaderImage} src={insubuyImg} alt="Insubuy Logo" />
                                <h3 className={cls.HeaderTitle}>Travel Insurance</h3>
                        </div>
                        <form className={cls.QuoteForm}>
                                <label
                                        className={
                                                !isPolicyValid
                                                        ? [cls.policyLabel, cls.formFieldError].join(' ')
                                                        : cls.policyLabel
                                        }
                                >
                                        <h4 className={cls.labelHeading}>Policy Maximum</h4>
                                        <select value={policyVal} onChange={handlePolicyVal}>
                                                <option value="">Choose your policy maximum</option>
                                                <option value={50}>$50,000</option>
                                                <option value={100}>$100,000</option>
                                                <option value={250}>$250,000</option>
                                                <option value={500}>$500,000</option>
                                        </select>
                                </label>
                                <label
                                        className={
                                                !isAgeValid
                                                        ? [cls.ageLabel, cls.formFieldError].join(' ')
                                                        : cls.ageLabel
                                        }
                                >
                                        <h4 className={cls.labelHeading}>Age</h4>
                                        <input
                                                type="text"
                                                value={age}
                                                name="age"
                                                className={[cls.ageInputFullScreen].join(' ')}
                                                placeholder="Enter your age"
                                                onChange={handleAgeChange}
                                        />
                                        <div className={cls.ageContainer}>
                                                <div className={cls.ageTitle}>
                                                        <h4 className={cls.ageCol1}>#</h4>
                                                        <h4 className={cls.ageCol2}>Age</h4>
                                                </div>
                                                <hr className={cls.hr} />
                                                <div className={cls.ageInputContainer}>
                                                        <h3 className={cls.ageCol1}>1</h3>
                                                        <input
                                                                type="text"
                                                                value={age}
                                                                name="age"
                                                                className={[cls.ageCol2, cls.ageInput].join(
                                                                        ' '
                                                                )}
                                                                placeholder={agePlaceholder}
                                                                onChange={handleAgeChange}
                                                        />
                                                </div>
                                        </div>
                                </label>
                                <label
                                        className={
                                                dateError
                                                        ? [cls.dateLabel, cls.formFieldError].join(' ')
                                                        : cls.dateLabel
                                        }
                                >
                                        <h4 className={cls.labelHeading}>Travel Dates (mm/dd/yyyy)</h4>
                                        {dateError ? (
                                                <p
                                                        style={{
                                                                margin: 0,
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                fontSize: '0.7rem'
                                                        }}
                                                >
                                                        {dateError}
                                                </p>
                                        ) : null}
                                        <div className={cls.dateContainer}>
                                                <div className={cls.date}>
                                                        {showStartDate ? (
                                                                <input
                                                                        type="date"
                                                                        name="start"
                                                                        onChange={handleDatePicker}
                                                                        onClick={() => setDateError('')}
                                                                        className={cls.dateSelector}
                                                                />
                                                        ) : (
                                                                <p
                                                                        className={cls.datePlaceholder}
                                                                        onClick={handleShowStartDate}
                                                                >
                                                                        Start Date
                                                                </p>
                                                        )}
                                                </div>
                                                <div className={cls.date}>
                                                        {showEndDate ? (
                                                                <input
                                                                        type="date"
                                                                        name="end"
                                                                        onChange={handleDatePicker}
                                                                        onClick={() => setDateError('')}
                                                                        className={cls.dateSelector}
                                                                />
                                                        ) : (
                                                                <p
                                                                        className={cls.datePlaceholder}
                                                                        onClick={handleShowEndDate}
                                                                >
                                                                        End Date
                                                                </p>
                                                        )}
                                                </div>
                                        </div>
                                </label>
                                <label
                                        className={
                                                !isCitValid
                                                        ? [cls.citizenshipLabel, cls.formFieldError].join(' ')
                                                        : cls.citizenshipLabel
                                        }
                                >
                                        <h4 className={cls.labelHeading}>Citizenship</h4>
                                        <input
                                                type="text"
                                                value={citizenship}
                                                onChange={handleCitizenship}
                                                onClick={handleCitizenshipReset}
                                                className={cls.citizenshipInput}
                                                name="citizenship"
                                                placeholder="Enter Country of Citizenship"
                                        />
                                </label>
                                <label
                                        className={
                                                !isStateValid
                                                        ? [cls.mailingStateLabel, cls.formFieldError].join(
                                                                  ' '
                                                          )
                                                        : cls.mailingStateLabel
                                        }
                                >
                                        <h4 className={cls.labelHeading}>Mailing State</h4>
                                        <input
                                                type="text"
                                                value={mailingState}
                                                onChange={handleMailingState}
                                                onClick={handleMailingStateReset}
                                                className={cls.mailingStateInput}
                                                name="mailingState"
                                                placeholder="Enter State"
                                        />
                                </label>
                                <label className={cls.submit}>
                                        <input
                                                type="submit"
                                                value="Get Quotes"
                                                onClick={handleSubmit}
                                                className={cls.submitButton}
                                        />
                                </label>
                        </form>
                        <div className={cls.resetButtonContainer}>
                                <button className={cls.resetButton} onClick={handleFormReset}>
                                        Reset Form
                                </button>
                        </div>
                </div>
        );
};

export default QuoteForm;
