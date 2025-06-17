import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Login logic would go here
        console.log('Login attempt with:', formData);
    };

    return (
        <div>
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2>
                        Sign in to your account
                    </h2>
                </div>
                <form>
                    <div>
                        <div>
                            <label>
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button>
                            Sign in
                        </button>
                    </div>
                    <div>
                        <Link>
                            Don't have an account? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;