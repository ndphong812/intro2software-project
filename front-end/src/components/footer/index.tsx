import { faCoffee, faCreditCard, faCreditCardAlt, faEnvelope, faLocation, faLocationDot, faMailBulk, faMailForward, faMap, faPhone, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-upper">
                <div className="container">
                    <div className="footer-upper-main">
                        <div className="footer-upper-main-child footer-upper-main-child-contact">
                            <h3 className="footer-upper-main-child-title">About us</h3>
                            <div className="footer-upper-main-child-contact-list">
                                <p className="footer-upper-main-child-contact-list-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                <div className="footer-upper-main-child-contact-list-item">
                                    <a href="https://goo.gl/maps/3pAkA2RoNsaPwt7z5">
                                        <FontAwesomeIcon className="footer-upper-main-child-contact-list-item-icon" icon={faLocationDot} />
                                        <span className="footer-upper-main-child-contact-list-item-text">University of Science</span>
                                    </a>
                                </div>
                                <div className="footer-upper-main-child-contact-list-item">
                                    <a href="tel:0387672029">
                                        <FontAwesomeIcon className="footer-upper-main-child-contact-list-item-icon" icon={faPhone} />
                                        <span className="footer-upper-main-child-contact-list-item-text">0123456789</span>
                                    </a>
                                </div>
                                <div className="footer-upper-main-child-contact-list-item">
                                    <a href="mailto:software@gmail.com">
                                        <FontAwesomeIcon className="footer-upper-main-child-contact-list-item-icon" icon={faEnvelope} />
                                        <span className="footer-upper-main-child-contact-list-item-text">software@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-upper-main-child footer-upper-main-child-portfolio">
                            <h3 className="footer-upper-main-child-title">Categories</h3>
                            <ul className="footer-upper-main-child-portfolio-list">
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Hot deals</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Laptops</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Smartphones</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Cameras</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Accessories</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-upper-main-child footer-upper-main-child-portfolio">
                            <h3 className="footer-upper-main-child-title">Information</h3>
                            <ul className="footer-upper-main-child-portfolio-list">
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">About Us</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Contact Us</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Orders and Returns</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Terms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-upper-main-child footer-upper-main-child-portfolio">
                            <h3 className="footer-upper-main-child-title">Service</h3>
                            <ul className="footer-upper-main-child-portfolio-list">
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">My Account</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">View Cart</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Wishlist</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Track My Order</a>
                                </li>
                                <li className="footer-upper-main-child-portfolio-list-item">
                                    <a href="#">Help</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-lower">
                <div className="container">
                    <div className="footer-lower-main">
                        <div className="footer-lower-main-cards">
                            <FontAwesomeIcon className="footer-lower-main-cards-icon" icon={faCreditCard} />
                            <FontAwesomeIcon className="footer-lower-main-cards-icon" icon={faCreditCard} />
                            <FontAwesomeIcon className="footer-lower-main-cards-icon" icon={faCreditCard} />
                            <FontAwesomeIcon className="footer-lower-main-cards-icon" icon={faCreditCard} />
                            <FontAwesomeIcon className="footer-lower-main-cards-icon" icon={faCreditCard} />
                        </div>
                        <p className="footer-lower-main-text">
                            Copyright ©2023 by No Name Group | This template is made with  by Colorlib
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;