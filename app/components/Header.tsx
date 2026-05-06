// "use client";

// import { useEffect, useState } from "react";

// export default function Header() {

//   const [homeData, setHomeData] = useState(null);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
//       .then((res) => res.json())
//       .then((data) => setHomeData(data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <header className="th-header header-layout1">
        
//         <div className="header-info">
//             <div className="container">
//                 <div className="row justify-content-between align-items-center">
//                     <div className="col-auto">
//                         <div className="header-logo">
//                             <a href="/"><img src="https://collegeadmin.rankridge.com/uploads/school/1771763099573-logo-4.png" alt="" style={{width:200}} /></a>
//                         </div>
//                     </div>
//                     <div className="col-auto">
//                         <div className="header-info-right">
//                             <nav className="main-menu d-none d-xl-block">
//                                 <ul>
//                                     <li>
//                                         <a href="/">Home</a>
//                                     </li>
//                                     <li><a href="/aboutus">About Us</a></li>
//                                     {homeData && (
//                                     <li className="menu-item-has-children">
//                                         <a href="#">Academic Programs</a>

//                                         <ul className="sub-menu">
//                                         {homeData.getAcademic.map((item, index) => {
//                                             return (
//                                             <li key={index}>
//                                                 <a href={`/course/${item.slug}`}>
//                                                 {item.title}
//                                                 </a>
//                                             </li>
//                                             );
//                                         })}
//                                         </ul>

//                                     </li>
//                                     )}
//                                     <li><a href="/faq">FAQ</a></li>
//                                     <li><a href="/events">Events</a></li>
//                                     <li><a href="/blogs">Blogs</a></li>
//                                     <li><a href="/contactus">Contact Us</a></li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className="mobile-header d-block d-xl-none">
//             <button className="th-menu-toggle" aria-label="Toggle menu">
//                 <span className="hamburger" aria-hidden="true"></span>
//             </button>
//         </div>

        
//         <div className="th-menu-wrapper">
//             <div className="th-menu-inner">
        
//                 <div className="mobile-menu-header">
//                     <a className="mobile-logo" href="index.html" aria-label="Rankridge home">
//                         <img src="/assets/img/logo-4.png" alt="Rankridge logo" />
//                     </a>
//                     <button className="th-menu-close" aria-label="Close menu">
//                         <i className="fas fa-times" aria-hidden="true"></i>
//                     </button>
//                 </div>

//                 <nav className="main-menu-mobile">
//                     <ul>
//                          <li>
//                                         <a href="/">Home</a>
//                                     </li>
//                                     <li><a href="/aboutus">About Us</a></li>
//                                     {homeData && (
//                                     <li className="menu-item-has-children">
//                                         <a href="#">Academic Programs</a>

//                                         <ul className="sub-menu">
//                                         {homeData.getAcademic.map((item, index) => {
//                                             return (
//                                             <li key={index}>
//                                                 <a href={`/course/${item.slug}`}>
//                                                 {item.title}
//                                                 </a>
//                                             </li>
//                                             );
//                                         })}
//                                         </ul>

//                                     </li>
//                                     )}
//                                     <li><a href="/faq">FAQ</a></li>
//                                     <li><a href="/events">Events</a></li>
//                                     <li><a href="/blogs">Blogs</a></li>
//                                     <li><a href="/contactus">Contact Us</a></li>
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     </header>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [homeData, setHomeData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggle

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
      .then((res) => res.json())
      .then((data) => setHomeData(data.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to toggle menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="th-header header-layout1">
        <div className="header-info">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <div className="header-logo">
                  <a href="/">
                    <img src="https://collegeadmin.rankridge.com/uploads/school/1771763099573-logo-4.png" alt="Logo" style={{ width: 200 }} />
                  </a>
                </div>
              </div>
              <div className="col-auto">
                <div className="header-info-right">
                  <nav className="main-menu d-none d-xl-block">
                    <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/aboutus">About Us</a></li>
                      {homeData && (
                        <li className="menu-item-has-children">
                          <a href="#">Academic Programs</a>
                          <ul className="sub-menu">
                            {homeData.getAcademic.map((item, index) => (
                              <li key={index}>
                                <a href={`/course/${item.slug}`}>{item.title}</a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                      <li><a href="/faq">FAQ</a></li>
                      <li><a href="/events">Events</a></li>
                      <li><a href="/blogs">Blogs</a></li>
                      <li><a href="/contactus">Contact Us</a></li>
                    </ul>
                  </nav>
                  {/* Mobile Toggle Button */}
                  <div className="mobile-header d-block d-xl-none">
                    <button className="th-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                      <span className="hamburger"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Wrapper */}
        <div className={`th-menu-wrapper ${isMenuOpen ? "th-body-visible" : ""}`}>
          <div className="th-menu-inner">
            <div className="mobile-menu-header">
              <a className="mobile-logo" href="/">
                <img src="https://collegeadmin.rankridge.com/uploads/school/1771763099573-logo-4.png" alt="Logo" style={{ width: 150 }} />
              </a>
              <button className="th-menu-close" onClick={toggleMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <nav className="main-menu-mobile">
              <ul>
                <li><a href="/" onClick={toggleMenu}>Home</a></li>
                <li><a href="/aboutus" onClick={toggleMenu}>About Us</a></li>
                {homeData && (
                  <li className="menu-item-has-children">
                    <a href="#">Academic Programs</a>
                    <ul className="sub-menu">
                      {homeData.getAcademic.map((item, index) => (
                        <li key={index}>
                          <a href={`/course/${item.slug}`} onClick={toggleMenu}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="/contactus" onClick={toggleMenu}>Contact Us</a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Overlay to close menu when clicking outside */}
        {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
      </header>

      <style jsx global>{`
        /* Hamburger Styling */
        .hamburger {
          display: block;
          width: 22px;
          height: 2px;
          background: #000;
          position: relative;
        }
        .hamburger::before, .hamburger::after {
          content: "";
          position: absolute;
          left: 0;
          width: 22px;
          height: 2px;
          background: #000;
        }
        .hamburger::before { top: -7px; }
        .hamburger::after { top: 7px; }

        .th-menu-toggle {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        /* Mobile Menu Sidebar */
        .th-menu-wrapper {
          position: fixed;
          top: 0;
          left: -100%; /* Hidden by default */
          width: 300px;
          height: 100%;
          background: #fff;
          z-index: 9999;
          transition: all 0.4s ease-in-out;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        /* When Open */
        .th-menu-wrapper.th-body-visible {
          left: 0;
        }

        .th-menu-inner {
          padding: 20px;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }

        .th-menu-close {
          background: #f4f4f4;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }

        .main-menu-mobile ul {
          list-style: none;
          padding: 0;
        }

        .main-menu-mobile ul li {
          padding: 12px 0;
          border-bottom: 1px solid #f9f9f9;
        }

        .main-menu-mobile ul li a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          display: block;
        }

        /* Background Overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
        }
      `}</style>
    </>
  );
}