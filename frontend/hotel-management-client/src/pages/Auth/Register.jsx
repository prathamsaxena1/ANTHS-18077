import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'guest',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Registration logic would go here
        console.log('Register attempt with:', formData);
    };

    return (
        <div>
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2>
                        Create a new account
                    </h2>
                </div>
                <form>
                    <div>
                        <div>
                            <label>
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="example@email.com"
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
                                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="Password (min. 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-hotel-primary"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                Account Type
                            </label>
                            <select>
                                <option>
                                    Guest

                                </option>
                                <option>
                                    Hotel Owner

                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button>
                            Register
                        </button>
                    </div>
                    <div>
                        <Link>
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;