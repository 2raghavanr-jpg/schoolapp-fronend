"use client";

import { useState } from "react";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    firstname: "",
    email: "",
    phone: "",
    date: "",
    country: "",
    city: "",
    zipcode: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔴 Validation
  const validate = () => {
    let err = {};

    if (!form.firstname.trim()) err.firstname = "First name is required";

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.phone) {
      err.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      err.phone = "Phone must be 10 digits";
    }

    if (!form.country.trim()) err.country = "Country is required";
    if (!form.city.trim()) err.city = "City is required";

    if (!form.zipcode) {
      err.zipcode = "Zip code required";
    } else if (!/^[0-9]{5,6}$/.test(form.zipcode)) {
      err.zipcode = "Invalid zip code";
    }

    if (!form.address.trim()) err.address = "Address is required";

    if (!form.message.trim()) err.message = "Message is required";

    return err;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setMsg("Sending...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`, {
        method: "POST",
          headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
        "Content-Type": "application/json",
      },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status) {
        setMsg("✅ Submitted successfully");
        setForm({
          firstname: "",
          email: "",
          phone: "",
          date: "",
          country: "",
          city: "",
          zipcode: "",
          address: "",
          message: "",
        });
        setErrors({});
      } else {
        setMsg("❌ " + data.message);
      }
    } catch (err) {
      setMsg("❌ Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form style-border">
      <div className="row">

        {/* First Name */}
        <div className="form-group col-md-6">
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            className="form-control"
            placeholder="First name*"
          />
          {errors.firstname && <small className="text-danger">{errors.firstname}</small>}
        </div>

        {/* Email */}
        <div className="form-group col-md-6">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email*"
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        {/* Phone */}
        <div className="form-group col-md-6">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Phone*"
          />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>

        {/* Date */}
        <div className="form-group col-md-6">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Country */}
        <div className="form-group col-md-6">
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="form-control"
            placeholder="Country*"
          />
          {errors.country && <small className="text-danger">{errors.country}</small>}
        </div>

        {/* City */}
        <div className="form-group col-md-6">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="form-control"
            placeholder="City*"
          />
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>

        {/* Zipcode */}
        <div className="form-group col-md-6">
          <input
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            className="form-control"
            placeholder="Zip Code*"
          />
          {errors.zipcode && <small className="text-danger">{errors.zipcode}</small>}
        </div>

        {/* Address */}
        <div className="form-group col-md-6">
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Address*"
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>

        {/* Message */}
        <div className="form-group col-12">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            placeholder="Message*"
          />
          {errors.message && <small className="text-danger">{errors.message}</small>}
        </div>

        {/* Button */}
        <div className="form-btn col-12 mt-15">
          <button className="th-btn white-hover">Send Message</button>
        </div>

        <p className="mt-3">{msg}</p>
      </div>
    </form>
  );
}