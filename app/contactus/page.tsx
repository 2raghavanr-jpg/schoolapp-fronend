"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function ContactPage() {
  const [contactUsData, setContactUsData] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
      .then((res) => res.json())
      .then((data) => setContactUsData(data.data))
      .catch((err) => console.error(err));
  }, []);
  const setting = contactUsData?.setting?.[0];
  const socialMedia = contactUsData?.socialMedia || [];
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.firstname.trim()) {
      newErrors.firstname = "Full name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Form Data:", form);

    // 🔗 Replace with your API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: "POST",
       headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Message sent successfully!");

        // Reset form
        setForm({
          firstname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      })
      .catch(() => alert("Something went wrong"));
  };

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
                    Questions about our programs, admissions or schedules? Send
                    us a message using the form below or use the contact details
                    provided.
                  </p>
                </div>

                <form
                  className="contact-form style-border"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    {/* Full Name */}
                    <div className="form-group style-border col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        placeholder="Full name*"
                      />
                      {errors.firstname && (
                        <small className="text-danger">
                          {errors.firstname}
                        </small>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group style-border col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="E-mail address*"
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="form-group style-border col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                      />
                      {errors.phone && (
                        <small className="text-danger">{errors.phone}</small>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="form-group style-border col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                      />
                    </div>

                    {/* Message */}
                    <div className="form-group style-border col-12">
                      <textarea
                        name="message"
                        rows={6}
                        className="form-control"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message*"
                      ></textarea>
                      {errors.message && (
                        <small className="text-danger">{errors.message}</small>
                      )}
                    </div>

                    {/* Button */}
                    <div className="form-btn col-12 mt-15">
                      <button type="submit" className="th-btn white-hover">
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
                    <a href={`mailto:${setting?.email}`}>
                      {setting?.email || "hello@rankridge.com"}
                    </a>
                  </p>

                  <p className="box-text">
                    Phone:{" "}
                    <a href={`tel:${setting?.phone}`}>
                      {setting?.phone || "+91 00000 00001"}
                    </a>
                  </p>

                  <div className="th-social mt-15 social-fixed-left">
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
            </div>

            {/* Map Section */}

            <div className="col-xl-6">
              <div className="widget">
                <h2 className="widget_title">Our location</h2>

                <div
                  className="global-img"
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.957560816067!2d78.37833727442184!3d17.488007199900192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e20c02a971%3A0x2cf6230ef209dfdc!2sRANKRIDGE%20-%20Best%20NEET%20%7C%20IIT-JEE%20%26%20EAMCET%20Long%20Term%20%26%20Short%20Term%20Coaching%20in%20Hyderabad!5e1!3m2!1sen!2sus!4v1774375076743!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="mt-30">
                  <h4 className="box-title">Office hours</h4>
                  <p className="box-text">Mon - Fri: 9:00 AM - 5:30 PM</p>
                  <p className="box-text">Sat - Sun: Closed</p>
                </div>
              </div>

              <div className="mt-30">
                <div className="program-card p-4">
                  <h4 className="box-title">Visit us</h4>
                  <p className="box-text mb-0">{setting?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
