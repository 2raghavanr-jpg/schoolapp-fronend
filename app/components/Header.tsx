import Link from "next/link";

export default function Header() {
  return (
    <header className="th-header header-layout1">

        <div className="header-info">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <div className="header-logo">
                            <a href=""><img src="assets/img/logo-4.png" alt="" style={{width:200}} /></a>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="header-info-right">
                            <nav className="main-menu d-none d-xl-block">
                                <ul>
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li><a href="aboutus.html">About Us</a></li>
                                    <li className="menu-item-has-children">
                                        <a href="#">Academic Programs</a>
                                        <ul className="sub-menu">
                                            <li><a href="mpc.html">MPC with IIT-JEE Coaching</a></li>
                                            <li><a href="bipc.html">BiPC with NEET Coaching</a></li>
                                            <li><a href="mpc.html">MPC with EAMCET Coaching</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="faq.html">FAQ</a></li>
                                    <li><a href="events.html">Events</a></li>
                                    <li><a href="blog.html">Blogs</a></li>
                                    <li><a href="contactus.html">Contact Us</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mobile-header d-block d-xl-none">
            <button className="th-menu-toggle" aria-label="Toggle menu">
                <span className="hamburger" aria-hidden="true"></span>
            </button>
        </div>

        
        <div className="th-menu-wrapper">
            <div className="th-menu-inner">
        
                <div className="mobile-menu-header">
                    <a className="mobile-logo" href="index.html" aria-label="Rankridge home">
                        <img src="assets/img/logo-4.png" alt="Rankridge logo" />
                    </a>
                    <button className="th-menu-close" aria-label="Close menu">
                        <i className="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>

                <nav className="main-menu-mobile">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="aboutus.html">About Us</a></li>
                        <li className="menu-item-has-children">
                            <a href="#">Academic Programs</a>
                            <ul className="sub-menu">
                                <li><a href="mpc.html">MPC with IIT-JEE Coaching</a></li>
                                <li><a href="bipc.html">BiPC with NEET Coaching</a></li>
                                <li><a href="mpc.html">MPC with EAMCET Coaching</a></li>
                            </ul>
                        </li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="events.html">Events</a></li>
                        <li><a href="blog.html">Blogs</a></li>
                        <li><a href="contactus.html">Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  );
}
