// "use client";

// import { useEffect, useState } from "react";

// export default function Header() {

//   const [homeData, setHomeData] = useState(null);

//   useEffect(() => {
//     fetch("http://162.244.95.11:3000/uploads/api/home.json")
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
//                             <a href="/"><img src="http://162.244.95.11:3000/uploads/school/1771763099573-logo-4.png" alt="" style={{width:200}} /></a>
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
      .then((res) => res.json())
      .then((data) => setHomeData(data.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleAcademic = () => {
    setAcademicOpen(!academicOpen);
  };

  return (
    <header className="th-header header-layout1">
        
        <div className="header-info">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <div className="header-logo">
                            <a href="/"><img src="https://collegeadmin.rankridge.com/uploads/school/1771763099573-logo-4.png" alt="" style={{width:200}} /></a>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="header-info-right">
                            <nav className="main-menu d-none d-xl-block">
                                <ul>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li><a href="/aboutus">About Us</a></li>
                                    {homeData && (
                                    <li className="menu-item-has-children">
                                        <a href="#">Academic Programs</a>

      {/* DESKTOP HEADER */}
      <div className="header-info">
        <div className="container">
          <div className="row justify-content-between align-items-center">

            <div className="col-auto">
              <div className="header-logo">
                <a href="/">
                  <img
                    src="http://162.244.95.11:3000/uploads/school/1771763099573-logo-4.png"
                    alt=""
                    style={{ width: 200 }}
                  />
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
                              <a href={`/course/${item.slug}`}>
                                {item.title}
                              </a>
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
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* MOBILE HEADER */}
      <div className="mobile-header d-block d-xl-none">
        <button
          className="th-menu-toggle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>


      {/* MOBILE MENU */}
      <div className={`th-menu-wrapper ${menuOpen ? "active" : ""}`}>
        <div className="th-menu-inner">

          {/* MOBILE MENU HEADER */}
          <div className="mobile-menu-header">

            <a className="mobile-logo" href="/">
              <img src="/assets/img/logo-4.png" alt="Rankridge logo" />
            </a>

            <button
              className="th-menu-close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              ✕
            </button>

          </div>


          {/* MOBILE MENU LIST */}
          <nav className="main-menu-mobile">
            <ul>

              <li><a href="/">Home</a></li>

              <li><a href="/aboutus">About Us</a></li>


              {/* Academic Programs Dropdown */}
              {homeData && (
                <li className="menu-item-has-children">

  <div className="mobile-dropdown-header" onClick={toggleAcademic}>
      <span>Academic Programs</span>
      <span className="dropdown-icon">{academicOpen ? "−" : "+"}</span>
  </div>

  {academicOpen && (
      <ul className="sub-menu">
          {homeData.getAcademic.map((item, index) => (
              <li key={index}>
                  <a href={`/course/${item.slug}`}>
                      {item.title}
                  </a>
              </li>
          ))}
      </ul>
  )}

</li>
              )}


              <li><a href="/faq">FAQ</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/contactus">Contact Us</a></li>

            </ul>
          </nav>

        </div>
      </div>

    </header>
  );
}