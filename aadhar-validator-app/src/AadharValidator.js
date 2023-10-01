import React, { useState } from 'react';
import validator from 'aadhaar-validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AadharValidator.css'; // Import your custom CSS file

function AadharValidator() {
    const [aadharParts, setAadharParts] = useState(['', '', '']);
    const [isValid, setIsValid] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validateAadhar = () => {
        const aadharNumber = aadharParts.join('');

        if (aadharNumber === '') {
            setErrorMessage('Aadhar number is required.');
            setIsValid(null);
            return;
        }

        if (!/^[0-9]+$/.test(aadharNumber)) {
            setErrorMessage('Aadhar number should contain only numbers.');
            setIsValid(null);
            return;
        }

        const isAadharValid = validator.isValidNumber(aadharNumber);
        setIsValid(isAadharValid);
        setErrorMessage('');
    };

    const clearInput = () => {
        setAadharParts(['', '', '']);
        setIsValid(null);
        setErrorMessage('');
    };

    const handlePartChange = (partIndex, value) => {
        if (/^\d*$/.test(value) && value.length <= 4) {
            const updatedParts = [...aadharParts];
            updatedParts[partIndex] = value;
            setAadharParts(updatedParts);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Aadhar Number Validator</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        {aadharParts.map((part, index) => (
                            <input
                                key={index}
                                type="text"
                                className="form-control"
                                placeholder="0000"
                                value={part}
                                onChange={(e) => handlePartChange(index, e.target.value)}
                            />
                        ))}
                        <button className="btn btn-primary" onClick={validateAadhar}>
                            Validate
                        </button>
                        <button className="btn btn-danger" onClick={clearInput}>
                            Clear
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    {isValid !== null && !errorMessage && (
                        <div
                            className={`alert ${isValid ? 'alert-success' : 'alert-danger'}`}
                        >
                            <p>
                                Entered Aadhar Number is: <strong>{aadharParts.join('')}</strong>
                            </p>
                            <p>
                                <strong>{isValid ? 'Aadhar Number is Valid' : 'Invalid Aadhar Number'}</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AadharValidator;
