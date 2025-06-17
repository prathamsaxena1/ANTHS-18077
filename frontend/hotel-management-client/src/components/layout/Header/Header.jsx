import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    // This would typically come from your auth context/state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Logout logic would go here
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header>
            <div>
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link>
                            <span>
                                HotelBooking

                            </span>
                        </Link>
                        <nav>
                            <Link>
                                Home
                            </Link>
                            <Link>
                                Hotels
                            </Link>
                            <Link>
                                About
                            </Link>
                        </nav>
                    </div>
                    <div>
                        {isLoggedIn ? (
                            <div className="flex space-x-4">
                                <Link>
                                    Dashboard
                                </Link>
                                <button>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Link>
                                    Login
                                </Link>
                                <Link>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;