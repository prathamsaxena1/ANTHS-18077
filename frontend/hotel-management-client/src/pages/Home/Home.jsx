import React from 'react';
import FormExample from '../../components/FormExample';

const HomePage = () => {
    return (
        <div>
            <h1>
                Welcome to Hotel Manager

            </h1>
            <p>
                Find the perfect hotel for your next trip!

            </p>
            {/* You could add a search form here */}
            <div className="search-container">
                <h2>
                    Search for Hotels

                </h2>
                <form>
                    <div className="form-group">
                        <label>
                            Destination

                        </label>
                        <input
                            type="text"
                            id="destination"
                            placeholder="Where are you going?"
                        />

                    </div>
                    <div>
                        <label>
                            Check-in

                        </label>
                        <input type="date" id="check-in" />
                    </div>
                    <div>
                        <label>
                            Check-out

                        </label>
                        <input type="date" id="check-out" />
                    </div>
                    <div>
                        <label>
                            Guests

                        </label>
                        <select>
                            <option>
                                1 Guest

                            </option>
                            <option>
                                2 Guests

                            </option>
                            <option>
                                3 Guests

                            </option>
                            <option>
                                4 Guests

                            </option>
                            <option>
                                5+ Guests

                            </option>
                        </select>
                    </div>
                    <button>
                        Search

                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;