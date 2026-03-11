import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}

      <div
        className="breadcumb-wrapper position-relative"
        data-bg-src="/assets/img/shape/breadcrumb-shep.png"
      >
        <div className="breadcumb-banner">
          <img
            src="/assets/img/breadcrumb/breadcumb-banner.png"
            alt="bg-banner"
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xxl-5">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Contact Us</h1>

                <ul className="breadcumb-menu">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}

      <section className="space">
        <div className="container">
          <div className="row gy-60 align-items-start justify-content-center">

            {/* Contact Form */}

            <div className="col-xl-6">
              <div className="about-wrap1 position-relative z-index-2">

                <div className="title-area">
                  <span className="sub-title">Get in touch</span>
                  <h2 className="sec-title">We'd love to hear from you</h2>
                  <p className="sec-text">
                    Questions about our programs, admissions or schedules?
                    Send us a message using the form below or use the contact
                    details provided.
                  </p>
                </div>

                <form className="contact-form style-border">

                  <div className="row">

                    <div className="form-group style-border col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        placeholder="Full name*"
                        required
                      />
                    </div>

                    <div className="form-group style-border col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="E-mail address*"
                        required
                      />
                    </div>

                    <div className="form-group style-border col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                      />
                    </div>

                    <div className="form-group style-border col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                      />
                    </div>

                    <div className="form-group style-border col-12">
                      <textarea
                        name="message"
                        rows={6}
                        className="form-control"
                        placeholder="Write your message*"
                        required
                      ></textarea>
                    </div>

                    <div className="form-btn col-12 mt-15">
                      <button
                        type="submit"
                        className="th-btn white-hover"
                      >
                        Send Message
                      </button>
                    </div>

                  </div>
                </form>

                {/* Contact Info */}

                <div className="mt-30">
                  <h4 className="box-title">Other ways to reach us</h4>

                  <p className="box-text">
                    Email:{" "}
                    <a href="mailto:hello@rankridge.com">
                      hello@rankridge.com
                    </a>
                  </p>

                  <p className="box-text">
                    Phone:{" "}
                    <a href="tel:+910000000000">
                      +91 00000 00000
                    </a>
                  </p>

                  <div className="th-social mt-15 social-fixed-left">

                    <a href="https://facebook.com" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </a>

                    <a href="https://instagram.com" target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>

                    <a href="https://twitter.com" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>

                    <a href="https://linkedin.com" target="_blank">
                      <i className="fab fa-linkedin-in"></i>
                    </a>

                    <a href="https://wa.me/919000000000" target="_blank">
                      <i className="fab fa-whatsapp"></i>
                    </a>

                  </div>
                </div>

              </div>
            </div>

            {/* Map Section */}

            <div className="col-xl-6">

              <div className="widget">

                <h2 className="widget_title">Our location</h2>

                <div
                  className="global-img"
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden"
                  }}
                >
                  <iframe
                    className="yt-frame"
                    src="https://www.google.com/maps?q=Hyderabad&output=embed"
                    title="Rankridge location"
                    width="100%"
                    height="350"
                  ></iframe>
                </div>

                <div className="mt-30">
                  <h4 className="box-title">Office hours</h4>
                  <p className="box-text">
                    Mon - Fri: 9:00 AM - 5:30 PM
                  </p>
                  <p className="box-text">
                    Sat - Sun: Closed
                  </p>
                </div>

              </div>

              <div className="mt-30">
                <div className="program-card p-4">
                  <h4 className="box-title">Visit us</h4>
                  <p className="box-text mb-0">
                    Rankridge Junior College
                    <br />
                    123 Sample Street, Hyderabad
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}