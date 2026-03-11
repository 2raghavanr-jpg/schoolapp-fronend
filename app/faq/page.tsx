"use client";

import { useEffect, useState } from "react";

interface FAQ {
  id: number;
  title: string;
  description: string;
}

interface Pages {
  id: number;
  title: string;
  slug: string;
  image_path: string;
  description: string;
  short_description: string;
  page_title: string;
  meta_title: string;
  page_type: string;
  meta_description: string;
  meta_keyword: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export default function Faq() {

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [pages, setPages] = useState<Pages[]>([]);
  const [apiurl, setApiurl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function getFaqs() {

      try {

        const res = await fetch("http://162.244.95.11:3000/api/faqs", {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();

        if (json?.data?.faqs) {
          setFaqs(json.data.faqs);
        }

        if (json?.data?.pages) {
          setPages(json.data.pages);
        }

        if (json?.data?.api_url) {
          setApiurl(json.data.api_url);
        }

      } catch (error) {
        console.error("FAQ API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getFaqs();

  }, []);

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

                <h1 className="breadcumb-title">
                  {pages[0]?.title}
                </h1>

                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>FAQ</li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="space overflow-hidden">
        <div className="container">

          <div className="row gy-4 gx-60 flex-row-reverse">

            {/* FAQ Content */}
            <div className="col-xl-7">

              <div className="page-single mb-0">

                <div className="title-area">
                  <span className="sub-title text-anim">
                    FAQ
                  </span>

                 <div
                    dangerouslySetInnerHTML={{
                      __html: pages[0]?.description || ""
                    }}
                  ></div>
                </div>

                <div className="accordion" id="faqAccordion">

                  {loading && <p>Loading FAQs...</p>}

                  {!loading && faqs.length === 0 && (
                    <p>No FAQs found.</p>
                  )}

                  {faqs.map((item, index) => (

                    <div
                      key={item.id}
                      className={`accordion-card style2 ${index === 0 ? "active" : ""}`}
                    >

                      <div
                        className="accordion-header"
                        id={`heading-${item.id}`}
                      >

                        <button
                          className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${item.id}`}
                          aria-expanded={index === 0}
                        >

                          {index + 1}. {item.title}

                        </button>

                      </div>

                      <div
                        id={`collapse-${item.id}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                        data-bs-parent="#faqAccordion"
                      >

                        <div className="accordion-body">

                          <p className="faq-text">
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Sidebar Banner */}
            <div className="col-xl-5">

              <aside className="sidebar-area">

                <div
                  className="widget widget_banner3"
                  data-bg-src={`${apiurl}uploads/pages/${pages[0]?.image_path}`}
                >

                  <div className="widget-banner">

                    <h2 className="title">
                      Admissions Open
                    </h2>

                    <p className="text">
                      Start Your Admission Journey
                    </p>

                    <a
                      href="/contactus"
                      className="th-btn th-icon white-hover"
                    >
                      Admission Enquiry
                    </a>

                  </div>

                </div>

              </aside>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}