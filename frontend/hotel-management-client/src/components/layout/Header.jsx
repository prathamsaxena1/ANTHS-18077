// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    // This could be replaced with actual auth state from context or Redux
    const isLoggedIn = false;
    const userRole = null;

    return (
        <header>
            <div>
                <Link>
                    Hotel Manager
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Link>
                                Home

                            </Link>
                        </li>
                        {/* These links can be added when the pages are created */}
                        {/*
<li>
<Link>
Hotels

</Link>
</li>
/}
{/

<li>
<Link>
About

</Link>
</li>
/}
{/

<li>
<Link>
Contact

</Link>
</li>
*/}
                        {userRole === 'hotelOwner' && (

                            <li>
                                <Link>
                                    My Hotels

                                </Link>
                            </li>
                        )}
                        {userRole === 'admin' && (
                            <li>
                                <Link>
                                    Admin Dashboard

                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <>
                            <Link>
                                My Profile

                            </Link>
                            <button>
                                Logout

                            </button>
                        </>
                    ) : (
                        <>
                            <Link>
                                Login

                            </Link>
                            <Link>
                                Register

                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;