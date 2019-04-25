import React, { useState } from 'react';

import cls from './QuoteForm.module.css';
import insubuyImg from './images/insubuyImg.png';

const QuoteForm = props => {
        const [policyVal, setPolicyVal] = useState(0);
        const [isPolicyValid, setIsPolicyValid] = useState(true);

        const handlePolicyVal = e => {
                if (e.target.value !== 0) {
                        setIsPolicyValid(true);
                }
                setPolicyVal(e.target.value);
                console.log('you chose: ', e.target.value);
        };
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

        const validateAge = () => {
                const today = new Date();
                const currentYear = today.getFullYear();
                if (!isNaN(age) && age !== '') {
                        if (age <= 100 && age >= 0) {
                                return true;
                        } else if (age > 1890 && age <= currentYear) {
                                setAge(currentYear - age);
                                return true;
                        } else {
                                setAgePlaceholder('Enter valid age');
                                setIsAgeValid(false);
                                setAge('');
                                return false;
                        }
                } else {
                        setAgePlaceholder('Enter age / birth year');
                        setIsAgeValid(false);
                        setAge('');
                        return false;
                }
        };
        const handleAgeReset = () => {
                setAge('');
        };

        const [showStartDate, setShowStartDate] = useState(false);
        const handleShowStartDate = () => {
                setShowStartDate(true);
        };
        const [showEndDate, setShowEndDate] = useState(false);
        const handleShowEndDate = () => {
                setShowEndDate(true);
        };

        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        const [dateError, setDateError] = useState('');
        const handleDatePicker = e => {
                if (e.target.name === 'start') {
                        setStartDate(e.target.value);
                } else if (e.target.name === 'end') {
                        setEndDate(e.target.value);
                }
        };
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

        const [citizenship, setCitizenship] = useState('');
        const [isCitValid, setIsCitValid] = useState(true);
        const handleCitizenship = e => {
                if (e.target.value !== '') {
                        setIsCitValid(true);
                }
                setCitizenship(e.target.value);
        };

        const characterValidation = str => {
                let strArr = str.split(' ');
                let notValidCount = 0;
                strArr.forEach(str => {
                        if (!/^[a-zA-Z]*$/.test(str)) {
                                notValidCount++;
                        }
                });
                return notValidCount === 0;
        };
        const validateCitizenship = () => {
                if (citizenship !== '' && characterValidation(citizenship)) {
                        return true;
                } else {
                        setIsCitValid(false);
                        setCitizenship('enter country name');
                }
        };
        const handleCitizenshipReset = () => {
                setCitizenship('');
        };
        const [mailingState, setMailingState] = useState('');
        const [isStateValid, setIsStateValid] = useState(true);
        const handleMailingState = e => {
                if (e.target.value !== '') {
                        setIsStateValid(true);
                }
                setMailingState(e.target.value);
        };
        const validateMailingState = () => {
                if (mailingState !== '' && characterValidation(mailingState)) {
                        return true;
                } else {
                        setIsStateValid(false);
                        setMailingState('Enter valid state');
                }
        };
        const handleMailingStateReset = () => {
                setMailingState('');
        };

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
                        props.toggleShowPlans();
                        return true;
                }
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
                                                                onClick={handleAgeReset}
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
                                <button className={cls.resetButton}>Reset Form</button>
                        </div>
                </div>
        );
};

export default QuoteForm;
