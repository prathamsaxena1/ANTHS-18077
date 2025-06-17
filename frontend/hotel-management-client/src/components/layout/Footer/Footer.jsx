const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3>
                            HotelBooking

                        </h3>
                        <p>
                            Find and book the perfect hotel for your next adventure.
                        </p>
                    </div>
                    <div>
                        <h3>
                            Quick Links

                        </h3>
                        <ul>
                            <li>
                                <a>
                                    About Us

                                </a>
                            </li>
                            <li>
                                <a>
                                    Contact Us

                                </a>
                            </li>
                            <li>
                                <a>
                                    Privacy Policy

                                </a>
                            </li>
                            <li>
                                <a>
                                    Terms of Service

                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>
                            Contact

                        </h3>
                        <address>
                            <p>
                                123 Hotel Street

                            </p>
                            <p>
                                City, Country

                            </p>
                            <p>
                                Email: info@hotelbooking.com

                            </p>
                            <p>
                                Phone: +1 234 567 890

                            </p>
                        </address>
                    </div>
                </div>
                <div>
                    <p>
                        © {currentYear} HotelBooking. All rights reserved.

                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;