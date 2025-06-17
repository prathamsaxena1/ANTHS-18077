const Home = () => {
    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold">
                Welcome to Hotel Management System
            </h1>
            <p className="text-lg mt-2">
                Find and book the best hotels for your next trip.
            </p>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold">
                    Featured Hotels
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white text-black rounded-lg shadow-md p-6 hotel-card">
                        <h3 className="text-xl font-bold">
                            Hotel Example
                        </h3>
                        <p>City, Country</p>
                        <div className="mt-4">
                            <span className="font-semibold">$99</span>
                            <span className="ml-1">/ night</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;