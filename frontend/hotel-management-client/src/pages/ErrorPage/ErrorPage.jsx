// src/components/ErrorPage/ErrorPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // If you're using Framer Motion
import './ErrorPage.css'; // We'll create this next

const ErrorPage = ({
    title = 'Error',
    message = 'An unexpected error has occurred.',
    code,
    illustration,
    actionText = 'Go Home',
    actionLink = '/',
    showBackButton = true
}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="error-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="error-content"
                >
                    {code && <div className="error-code">{code}
                    </div>
                    }

                    {illustration && (
                        <div>
                            <img src={illustration} alt="Error illustration" />
                        </div>
                    )}
                    <h1>
                        {title}

                    </h1>
                    <p>
                        {message}

                    </p>
                    <div>
                        <Link>
                            {actionText}
                        </Link>
                        {showBackButton && (
                            <button>
                                Go Back
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ErrorPage;