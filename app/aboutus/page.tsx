export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div
        className="breadcumb-wrapper position-relative"
        style={{ backgroundImage: "url(/assets/img/shape/breadcrumb-shep.png)" }}
      >
        <div className="breadcumb-banner">
          <img src="/assets/img/breadcrumb/breadcumb-banner.png" alt="banner" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xxl-5">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">About Us</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>About Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about1-area position-relative overflow-hidden space" id="about-sec">
        <div
          className="about-shep-2 shape-mockup d-none d-xxl-block"
          style={{ bottom: "0%", right: "0%" }}
        >
          <img src="/assets/img/shape/feature-shep-2-home-1.png" alt="shape" />
        </div>

        <div
          className="about-shape-right shape-mockup jump-reverse"
          style={{ right: "3%", top: "2%" }}
        >
          <img src="/assets/img/shape/shape-7.png" alt="shape" />
        </div>

        <div className="container">
          <div className="about-wrap1 position-relative z-index-2">
            <div className="row gy-60 align-items-center justify-content-center">
              
              {/* Content */}
              <div className="col-xl-5">
                <div className="about-content">
                  <div className="title-area">
                    <span className="sub-title">
                      Best Junior College in Hyderabad with IIT-NEET
                    </span>

                    <h2 className="sec-title">
                      Welcome to Rankridge
                    </h2>

                    <p className="sec-text mt-25">
                      Rankridge is the Best Junior College in Hyderabad with IITJEE | NEET |
                      EAMCET | BITSAT coaching institute guiding students to achieve
                      high scores in medical and engineering entrance examinations.
                      We offer long-term, short-term and crash courses for students
                      preparing for these exams.
                    </p>

                    <p className="sec-text mt-25">
                      Rankridge has exceptional faculty qualified from prominent
                      institutes. We provide unmatched learning experiences and
                      strategies that help students achieve top ranks in
                      Engineering and Medical examinations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="col-xl-7">
                <div className="img-content position-relative">
                  <div className="img-box4">
                    <div className="img1">
                      <img src="/assets/img/college.jpg" alt="college" />
                    </div>

                    <div className="counter-card3">
                      <h3 className="box-number text-white">
                        <span className="counter-number">280</span>k+
                      </h3>
                      <p className="box-text text-white">
                        World-wide Happy Students
                      </p>
                    </div>
                  </div>

                  <div
                    className="shape-mockup jump"
                    style={{ right: "26%", top: "0%" }}
                  >
                    <img src="/assets/img/shape/about-3-2.png" alt="shape" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Why Rankridge */}
      <section className="community-area-2 overflow-hidden position-relative">
        <div className="container">
          <div className="space">

            <div className="title-area text-center text-xl-start">
              <span className="sub-title">Choose Us</span>
              <h2 className="sec-title">Why Rankridge ?</h2>

              <p className="mt-25">
                Rankridge has an unbeatable track record delivering
                outstanding results in medical and engineering examinations.
                With experienced faculty and structured programs,
                we help students achieve the best ranks.
              </p>
            </div>

            <div className="row">

              {/* Features */}
              <div className="col-xl-6">
                <div className="community-wrap2">

                  <div className="community-card2">
                    <div className="card-content">
                      <h3 className="box-title">Experienced Faculty</h3>
                      <p className="box-text">
                        Our faculty consists of experienced academicians
                        and subject experts from premier universities.
                      </p>
                    </div>
                  </div>

                  <div className="community-card2">
                    <div className="card-content">
                      <h3 className="box-title">Our Teaching Approach</h3>
                      <p className="box-text">
                        Our holistic teaching approach creates
                        an excellent classroom environment for learning.
                      </p>
                    </div>
                  </div>

                  <div className="community-card2">
                    <div className="card-content">
                      <h3 className="box-title">Regular Tests</h3>
                      <p className="box-text">
                        We conduct regular tests and assignments
                        to monitor student performance.
                      </p>
                    </div>
                  </div>

                  <div className="community-card2">
                    <div className="card-content">
                      <h3 className="box-title">Great Resources</h3>
                      <p className="box-text">
                        Our students get access to premium study materials
                        and experienced faculty support.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Contact Form */}
              <div className="col-xl-6">
                <form className="contact-form">

                  <div className="row">

                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" placeholder="First Name*" />
                    </div>

                    <div className="form-group col-md-6">
                      <input type="email" className="form-control" placeholder="Email*" />
                    </div>

                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" placeholder="Phone*" />
                    </div>

                    <div className="form-group col-md-6">
                      <input type="date" className="form-control" />
                    </div>

                    <div className="form-group col-12">
                      <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Write your message"
                      ></textarea>
                    </div>

                    <div className="form-btn col-12 mt-15">
                      <button className="th-btn">Send Message</button>
                    </div>

                  </div>

                </form>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}