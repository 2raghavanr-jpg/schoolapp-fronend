import EnquiryForm from "@/app/components/EnquiryForm";
import Image from "next/image";

async function getCourse(slug: string) {

  const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/academics/${slug}`,
  {
    cache: "no-store",
    headers: {
    "Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8`,
      "Content-Type": "application/json"
    }
  }
);

  if (!res.ok) return null;

  const json = await res.json();

  if (!json?.data?.getAcademic?.length) return null;

  return {
    course: json.data.getAcademic[0],
    subCourses: json.data.getAcademicSub || [],
    courseFaqs: json.data.getAcademicFaqs || [],
    api_url: json.data.api_url
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getCourse(slug);

  if (!data) return {};

  const { course } = data;

  return {
    title: course?.meta_title || course?.title,
    description: course?.meta_description,
    keywords: course?.meta_keyword,

    alternates: {
      canonical: `/academics/${slug}`,
    },

    openGraph: {
      title: course?.meta_title || course?.title,
      description: course?.meta_description,
      type: "article",
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getCourse(slug);
  console.log("course",data);

  if (!data) {
    return <div className="container py-5">Course not found</div>;
  }
  const labelGrid = ['benefit-card-green', 'benefit-card-teal', 'benefit-card-orange', 'benefit-card-pink', 'benefit-card-indigo', 'benefit-card-blue', 'benefit-card-coral', 'benefit-card-gold', 'benefit-card-purple'];
  const { course, subCourses, courseFaqs, api_url } = data;
  return (
    <>
    
      {/* Breadcrumb */}
    <div className="breadcumb-wrapper position-relative" style={{ padding: 0 }}>
      <img
        src={course?.image_path ? `${api_url}uploads/courses/${course?.image_path}` : "assets/img/breadcrumb/banner1.png"}
        alt="Course Banner"
      />
    </div>

    
    <section className="position-relative overflow-hidden space">
      <div className="container">
        <div className="row gy-60 align-items-center justify-content-center">
          <div className="col-xl-6">
            <div className="about-content">
              <div className="title-area mb-0">
                <span className="sub-title text-anim"
                  >{course?.title || "MPC with IIT-JEE Coaching"}</span
                >
                <h1
                  className="sec-title text-anim2"
                  style={{
                    fontSize: "40px",
                    lineHeight: "48px",
                    letterSpacing: "0.8px",
                  }}
                >
                 {course?.sub_title || "MPC with IIT-JEE Coaching"}
                </h1>
                <p className="sec-text mt-30"  dangerouslySetInnerHTML={{
                      __html: course?.description,
                    }}></p>
              </div>
              <div className="btn-wrap mt-40">
                <a href="/contactus" className="th-btn th-icon">Apply Now</a>
              </div>
            </div>
          </div>
          <div className="col-xl-6 text-center">
            <img
              src={course?.section_one_image ? `${api_url}uploads/courses/${course.section_one_image}` : "assets/img/college.jpg"}
              alt="IIT Junior College Students"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>

    
    <section className="position-relative overflow-hidden space bg-smoke cyan">
      <div className="container">
        <div className="row gy-60 align-items-center justify-content-center">
          <div className="col-xl-6 text-center">
            <img
              src={course?.section_two_image ? `${api_url}uploads/courses/${course.section_two_image}` : "assets/img/college1.jpg"}
              alt="MPC classNameroom Coaching"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-xl-6">
            <div className="about-content ms-xxl-4 ps-xxl-2 ms-xl-2">
              <div className="title-area mb-0">
                <span className="sub-title text-anim text-white"
                  >{course?.second_title || "Why Rankridge"}</span
                >
                <h2 className="sec-title text-anim2 text-white" style={{fontSize:"36px", lineHeight:"44px", letterSpacing:"0.8px"}}>
                  {course?.second_sub_title || "Why Choose Rankridge for MPC with IIT-JEE Coaching in Hyderabad"} 
                </h2>
                <p className="sec-text mt-30"  dangerouslySetInnerHTML={{
                      __html: course?.second_description,
                    }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section
      id="course-benefits-sec"
      className="position-relative overflow-hidden space"
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-xl-8">
            <div className="title-area">
              <span className="sub-title text-anim">Why Rankridge</span>
              <h2 className="sec-title text-anim2">
                {course?.section_title || "Benefits of MPC with IIT-JEE Coaching at Rankridge"}
              </h2>
            </div>
          </div>
        </div>
        <div className="row gy-30 justify-content-center">
          {subCourses.map((item, index) => {
            return (
              <div className="col-xl-4 col-md-6" key={index}>
                <div
                  className={`benefit-card ${labelGrid[index % labelGrid.length]} text-center p-4 rounded h-100`}
                >
                  <div className="benefit-icon mb-3">
                    <i className={item.font_icon}></i>
                  </div>
                  <h4 className="box-title mb-2">{item.title}</h4>
                  <p className="box-text" dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            );
          })} 
          

        </div>
      </div>
    </section>
    
    <section
      className="position-relative overflow-hidden space"
      id="why-choose-sec"
      style={{ backgroundColor: '#081933' }}
    >
      <div className="container">
        <div className="row gy-50 align-items-start">
          
          <div className="col-xl-6">
            <span className="sub-title text-anim">Why Choose Us</span>

            <h2 className="sec-title mb-35" style={{ color: '#fff' }}>
              {course?.why_choose_us_title || "Why Choose Rankridge for MPC with IIT-JEE Coaching in Hyderabad?"}
            </h2>
            <ul
              className="why-choose-list"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
              dangerouslySetInnerHTML={{
                      __html: course?.why_choose_us_description,
                    }}
            >
            </ul>
          </div>

          
          <div className="col-xl-6">
            <div
              className="admission-form-box p-4 p-md-5"
              style={{
                backgroundColor: '#20b2aa',
                borderRadius: 8,
                border: '2px solid #081933',
              }}
            >
              <h3 className="mb-1" style={{ color: '#0a1628', fontWeight: 700 }}>
                Apply for Admission.
              </h3>
              <p className="mb-30" style={{ color: '#0a1628', fontSize: 14 }}>
                Our Team will contact you shortly.
              </p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section
      className="position-relative overflow-hidden space"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <span className="sub-title text-anim">Have Questions?</span>
            <h2
              className="sec-title mb-40"
              style={{ color: '#081933', fontWeight: 700 }}
            >
              FAQs for Intermediate MPC with IIT JEE
            </h2>
            <div className="faq-box">
              <div className="faq-wrap1">
                <div className="accordion" id="faqAccordion">
                  {courseFaqs.map((item, index) => {
                    return (
                      <div className="accordion-card wow fadeInUp" data-wow-delay={`.${index + 1}s`} key={index}>
                        <div className="accordion-header" id={`collapse-item-${index}`}>
                          <button
                            className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`collapse-${index}`}
                          >
                            {item.title}
                          </button>
                        </div>
                        <div
                          id={`collapse-${index}`}
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          data-bs-parent="#faqAccordion"
                        >
                          <div className="accordion-body">
                            <p className="faq-text" dangerouslySetInnerHTML={{ __html: item.description }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="scholar-area scholar-style position-relative space-top overflow-hidden"
    >
      <div className="container">
        <div className="row gy-60 justify-content-center">
          <div className="col-xl-6">
            <div
              className="scholar-content z-index-common ms-xxl-4 ps-xxl-2 ms-xl-2"
            >
              <div className="title-area text-center text-lg-start">
                <span className="sub-title text-anim">Admissions Open</span>
                <h2 className="sec-title text-anim2">
                  Start Your Admission Journey
                </h2>
                <p className="sec-text mt-25 wow fadeInUp" data-wow-delay=".3s">
                  Take the first step toward a successful future. Our admissions
                  process is designed to guide you smoothly from application to
                  enrollment, ensuring you have all the support you need to
                  succeed.
                </p>
              </div>
              <div
                className="btn-wrap wow fadeInUp justify-content-center justify-content-lg-start"
                data-wow-delay=".4s"
              >
                <a href="/contactus" className="th-btn th-icon"
                  >Admission Enquiry</a
                >
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="scholar-right">
              <div
                className="scholar-imgbox ms-xl-5 wow fadeInUp"
                data-wow-delay=".5s"
              >
                <img src={`${api_url}/commonimg/scholar-1-1.png`} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="about-shep-2 shape-mockup d-none d-xxl-block"
        data-top="0%"
        data-left="0%"
      >
        <img src={`${api_url}/commonimg/shape-3.png`} alt="shape" />
      </div>
      <div
        className="about-shep-2 shape-mockup d-none d-xxl-block"
        data-bottom="4%"
        data-left="0%"
      >
        <img src={`${api_url}/commonimg/shape-4.png`} alt="shape" />
      </div>
    </section>
    </>
  );
}