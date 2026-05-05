"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Footer() {
      const [contactUsData, setContactUsData] = useState(null);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
          .then((res) => res.json())
          .then((data) => setContactUsData(data.data))
          .catch((err) => console.error(err));
      }, []);
      const setting = contactUsData?.setting?.[0];
      const socialMedia = contactUsData?.socialMedia || [];
      const accademicPrograms = contactUsData?.getAcademic || [];
      const footer_logo = contactUsData?.footer_logo;
      console.log("footer_logo", footer_logo);
      console.log("contactUsData", contactUsData);
  return (
   <footer className="rr-footer">
      <div className="rr-footer-top">
        <div className="container">
          <div className="row gy-40">
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <div className="rr-footer-widget">
                <div className="rr-footer-brand mb-3">
                  <a href="index.html">
                    <img
                      src={footer_logo}
                      alt="Rankridge"
                      style={{ maxWidth: '200px' }}
                    />
                  </a>
                  <p className="rr-footer-tagline">
                    Junior Colleges with IIT-JEE &amp; NEET<br /><span
                      >— Hyderabad —</span
                    >
                  </p>
                </div>
                <p className="rr-footer-social-label">Join us on Social Media</p>
                <div className="rr-footer-social">
                   {socialMedia
                      .filter((item) => item.status === 1)
                      .map((item) => (
                        <a
                          key={item.id}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={item.icon}></i>
                        </a>
                      ))}
                 
                </div>
              </div>
            </div>
            
            <div className="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
              <div className="rr-footer-widget">
                <h4 className="rr-footer-col-title">Other Links</h4>
                <ul className="rr-footer-list">
                  <li><a href="/blogs">Blog</a></li>
                  <li><a href="/events">Events</a></li>
                  <li><a href="/privacy-policy">Privacy Policy</a></li>
                  <li><a href="/terms-conditions">Terms &amp; Conditions</a></li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2">
              <div className="rr-footer-widget">
                <h4 className="rr-footer-col-title">Quick Links</h4>
                <ul className="rr-footer-list">
                  <li><a href="/index">Home</a></li>
                  <li><a href="/about-us">About Us</a></li>

                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/contactus">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2">
              <div className="rr-footer-widget">
                <h4 className="rr-footer-col-title">Our Courses</h4>
               
                <ul className="rr-footer-list">
                    {accademicPrograms.map((item, index) => {
                    return (
                      <li key={index}>
                        <a href={`/course/${item.slug}`}>
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                  
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="rr-footer-widget">
                <div className="rr-footer-info">
                  <h4 className="rr-footer-col-title">Hyderabad Head Office</h4>

                  <p className="rr-footer-info-item">
                    <i className="fas fa-map-marker-alt"></i>
                    {setting?.address}
                  </p>
                  <a href="/contactus" className="rr-footer-contact-link"
                    >Contact Us</a
                  >
                  <p className="rr-footer-info-item">
                    <i className="fas fa-phone-alt"></i>
                    <a href={`tel:${setting?.phone}`}>{setting?.phone}</a>
                  </p>
                  <p className="rr-footer-info-item">
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${setting?.email}`}>{setting?.email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-wrap rr-footer-bottom z-index-common">
        <div className="container">
          <div className="row justify-content-center gy-3 align-items-center">
            <div className="col-lg-12 text-center">
              <p className="copyright-text">
                <i className="fal fa-copyright"></i> Copyright 2026
                <a href="index.html">Rankridge</a>. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
