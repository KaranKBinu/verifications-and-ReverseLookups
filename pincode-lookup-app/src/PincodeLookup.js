import React, { useState } from 'react';
import pincodeDirectory from 'india-pincode-lookup';
import './PincodeLookup.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function PincodeLookup() {
    const [pincode, setPincode] = useState('');
    const [placeDetails, setPlaceDetails] = useState([]);
    const [error, setError] = useState('');

    const handlePincodeChange = (e) => {
        setPincode(e.target.value);
    };

    const lookupPincode = () => {
        const trimmedPincode = pincode.trim();

        if (trimmedPincode === '') {
            setError('Please enter a PIN code or details to search.');
            return;
        }

        const result = pincodeDirectory.lookup(trimmedPincode);

        if (result && result.length > 0) {
            setPlaceDetails(result);
            setError(''); // Clear any previous error
        } else {
            setPlaceDetails([]);
            setError('No results found for the entered details.');
        }
    };

    const clearPincode = () => {
        setPincode('');
        setPlaceDetails([]);
        setError('');
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">PIN Code Lookup</h1>
            <div className="form-group">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter PIN code or other details to search"
                        value={pincode}
                        onChange={handlePincodeChange}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-danger" onClick={clearPincode}>
                            Clear
                        </button>
                    </div>
                </div>
                {error && <div className="text-danger">{error}</div>}
            </div>
            <button className="btn btn-primary mt-2" onClick={lookupPincode}>
                Lookup
            </button>

            {placeDetails.length > 0 && (
                <div className="mt-4">
                    <h2>Place Details</h2>
                    <ul className="list-group">
                        {placeDetails.map((place, index) => (
                            <li key={index} className="list-group-item">
                                <p className="mb-1">Post Office Name: {place.officeName}</p>
                                <p className="mb-1">PIN Code: {place.pincode}</p>
                                <p className="mb-1">Taluk: {place.taluk}</p>
                                <p className="mb-1">District: {place.districtName}</p>
                                <p className="mb-1">State: {place.stateName}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default PincodeLookup;
