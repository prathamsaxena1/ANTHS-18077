const Home = () => {
    return (
        <div>
            <h1>
                Welcome to Hotel Management System

            </h1>
            <p>
                Find and book the best hotels for your next trip.
            </p>
            {/* Featured hotels section placeholder */}
            <div className="mt-12">
                <h2>
                    Featured Hotels

                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-lg shadow-md p-6 hotel-card">
                        <h3>
                            Hotel Example

                        </h3>
                        <p>
                            City, Country

                        </p>
                        <div className="mt-4">
                            <span>
                                $99

                            </span>
                            <span>
                                / night

                            </span>
                        </div>
                    </div>
                    {/* More hotel cards would go here */}
                </div>
            </div>
        </div>
    );
};

export default Home;