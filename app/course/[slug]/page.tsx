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
    <style
  dangerouslySetInnerHTML={{
    __html: `
      .why-choose-html,
      .why-choose-html ul {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .why-choose-html li {
        position: relative;
        padding-left: 40px;
        margin-bottom: 18px;
        color: #ffffff;
        line-height: 1.7;
        font-size: 15px;
      }

      .why-choose-html li::before {
        content: "✔";
        position: absolute;
        left: 0;
        top: 4px;
        width: 24px;
        height: 24px;
        background: #20b2aa;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  }}
/>
    
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
              <div className="btn-wrap mt-10">
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
        <div className="row gy-60 justify-content-center">
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
                <span 
                  >{course?.second_title || "Why Rankridge"}</span>
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
                    <i className={item.font_icon || "fal fa-graduation-cap fa-2x"}></i>
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
              className="why-choose-html"
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



// import EnquiryForm from "@/app/components/EnquiryForm";

// async function getHomeData() {
//   const res = await fetch(`http://145.223.18.188:7000/uploads/api/home.json`, {
//     cache: "no-store",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   if (!res.ok) return null;
//   const json = await res.json();
//   return json.data;
// }

// export default async function HomePage() {
//   const data = await getHomeData();

//   if (!data) {
//     return <div className="container py-5">Failed to load data.</div>;
//   }

//   const { choosus, faqs, page, api_url, admission_image } = data;
//   const pageData = page?.[0]; // Accessing Home page specific data
//   const whyChoose = choosus?.[0]; // Accessing why choose us details

//   return (
//     <>
//       {/* --- INTERNAL CSS TO MATCH HTML PATTERN --- */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         .cyan { background-color: #20b2aa !important; }
        
//         /* Banner Container & Text Overlay to match screenshot */
//         .banner-container { 
//           position: relative; 
//           width: 100%; 
//           background-color: #20b2aa; 
//           display: flex; 
//           align-items: center; 
//           min-height: 450px;
//         }
//         .banner-flex {
//           display: flex;
//           align-items: center;
//           width: 100%;
//           justify-content: space-between;
//         }
//         .banner-image-wrapper { width: 40%; }
//         .banner-text-wrapper { width: 55%; color: #fff; text-align: left; padding-right: 50px; }
//         .banner-text-wrapper h1 { 
//           font-size: 38px; 
//           font-weight: 800; 
//           line-height: 1.1; 
//           text-transform: uppercase;
//           margin-bottom: 20px;
//         }
//         .banner-text-wrapper p { font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

//         /* Why Choose List Styling */
//         .why-choose-list { list-style: none; padding: 0; margin: 0; }
//         .why-choose-list li { display: flex; align-items: start; margin-bottom: 20px; }
//         .why-choose-list i { color: #20b2aa; margin-right: 12px; margin-top: 4px; flex-shrink: 0; }
//         .why-choose-item-title { color: #20b2aa; font-weight: 700; display: block; margin-bottom: 5px; font-size: 18px; }
//         .why-choose-item-desc { color: #ffffff; font-size: 14px; line-height: 1.6; }
        
//         /* FAQ Styling */
//         .faq-card { border-left: 3px solid #20b2aa !important; border-radius: 6px; margin-bottom: 10px; border: 1px solid #eee; overflow: hidden; background: #fff; }
//         .accordion-button:not(.collapsed) { color: #20b2aa !important; background: #fff !important; box-shadow: none; }
//         .accordion-button { font-weight: 600; font-size: 16px; padding: 20px; }
//         .accordion-button:focus { box-shadow: none; }
//         .sec-title.white { color: #ffffff !important; }

//         @media (max-width: 992px) {
//           .banner-flex { flex-direction: column; text-align: center; padding: 40px 0; }
//           .banner-image-wrapper, .banner-text-wrapper { width: 100%; padding: 0; }
//           .banner-text-wrapper h1 { font-size: 32px; }
//         }
//       `}} />

//       {/* --- SECTION 0: BANNER (Matching Screenshot Layout) --- */}
//       <div className="banner-container">
//         <div className="container">
//           <div className="banner-flex">
//             <div className="banner-image-wrapper">
//               <img
//                 src="/assets/img/student-banner.png" 
//                 alt="Student"
//                 className="img-fluid"
//                 style={{ maxHeight: '450px' }}
//               />
//             </div>
//             <div className="banner-text-wrapper">
//               <h1>Best IIT Junior Colleges in Hyderabad for MPC & JEE Coaching</h1>
//               <p>Start your success journey with Rankridge</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- SECTION 1: ABOUT / INTRO --- */}
//       <section className="position-relative overflow-hidden space">
//         <div className="container">
//           <div className="row gy-60 align-items-center justify-content-center">
//             <div className="col-xl-6">
//               <div className="about-content">
//                 <div className="title-area mb-0">
//                   <span className="sub-title text-anim" style={{ color: '#20b2aa', fontWeight: 'bold' }}>
//                     MPC WITH IIT-JEE COACHING
//                   </span>
//                   <h2 className="sec-title text-anim2 mt-2" style={{ fontSize: "40px", lineHeight: "48px", fontWeight: '800' }}>
//                     Best IIT Junior Colleges in Hyderabad for MPC & JEE Coaching
//                   </h2>
//                   <div className="sec-text mt-30" dangerouslySetInnerHTML={{ __html: pageData?.short_description }} />
//                 </div>
//                 <div className="btn-wrap mt-40">
//                   <a href="/contactus" className="th-btn th-icon">Apply Now</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img
//                 src="/assets/img/college.jpg" 
//                 alt="Rankridge Classroom"
//                 className="img-fluid rounded shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 2: WHY CHOOSE US (Data from choosus array) --- */}
//       <section className="position-relative overflow-hidden space" id="why-choose-sec" style={{ backgroundColor: '#081933' }}>
//         <div className="container">
//           <div className="row gy-50 align-items-start">
//             <div className="col-xl-6">
//               <span className="sub-title text-anim">Why Choose Us</span>
//               <h2 className="sec-title mb-35 white">
//                 {whyChoose?.title || "What Sets Rankridge Apart?"}
//               </h2>
//               <ul className="why-choose-list">
//                 {/* Dynamically grabbing the 4 options from your home.json */}
//                 {[1, 2, 3, 4].map((num) => {
//                   const titleKey = `option_${num}_title` as keyof typeof whyChoose;
//                   const descKey = `option_${num}_description` as keyof typeof whyChoose;
                  
//                   if (!whyChoose?.[titleKey]) return null;

//                   return (
//                     <li key={num}>
//                       <i className="fas fa-check-circle fa-lg"></i>
//                       <div>
//                         <span className="why-choose-item-title">{whyChoose[titleKey]}</span>
//                         <p className="why-choose-item-desc">{whyChoose[descKey]}</p>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             {/* ADMISSION FORM BOX */}
//             <div className="col-xl-6">
//               <div className="admission-form-box p-4 p-md-5" style={{ backgroundColor: '#20b2aa', borderRadius: 8, border: '2px solid #081933' }}>
//                 <h3 className="mb-1" style={{ color: '#0a1628', fontWeight: 700 }}>Apply for Admission.</h3>
//                 <p className="mb-30" style={{ color: '#0a1628', fontSize: 14 }}>Our Team will contact you shortly.</p>
//                 <EnquiryForm />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 3: FAQ (Data from faqs array) --- */}
//       <section className="position-relative overflow-hidden space bg-white">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-10">
//               <div className="text-center">
//                 <span className="sub-title" style={{ color: '#20b2aa' }}>Have Questions?</span>
//                 <h2 className="sec-title mb-40" style={{ color: '#081933', fontWeight: 700 }}>
//                   General FAQs
//                 </h2>
//               </div>
//               <div className="faq-box">
//                 <div className="accordion" id="faqAccordion">
//                   {faqs?.map((faq: any, index: number) => (
//                     <div className="faq-card" key={faq.id}>
//                       <div className="accordion-header">
//                         <button
//                           className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
//                           type="button"
//                           data-bs-toggle="collapse"
//                           data-bs-target={`#faq-collapse-${faq.id}`}
//                           aria-expanded={index === 0 ? "true" : "false"}
//                         >
//                           {index + 1}. {faq.title}
//                         </button>
//                       </div>
//                       <div
//                         id={`faq-collapse-${faq.id}`}
//                         className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
//                         data-bs-parent="#faqAccordion"
//                       >
//                         <div className="accordion-body">
//                           <p className="faq-text mb-0" style={{ color: '#555', lineHeight: '1.7' }}>
//                             {faq.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 4: ADMISSIONS CTA --- */}
//       <section className="scholar-area scholar-style position-relative space-top overflow-hidden">
//         <div className="container">
//           <div className="row gy-60 justify-content-center align-items-center mb-5">
//             <div className="col-xl-6">
//               <div className="scholar-content text-center text-lg-start">
//                 <span className="sub-title text-anim" style={{ color: '#20b2aa' }}>Admissions Open 2026-27</span>
//                 <h2 className="sec-title text-anim2">Start Your Journey Today</h2>
//                 <p className="sec-text mt-25">
//                   Take the first step toward a successful future in Engineering or Medicine. Our guidance ensures a smooth transition from application to success.
//                 </p>
//                 <div className="btn-wrap mt-40 justify-content-center justify-content-lg-start">
//                   <a href="/contactus" className="th-btn th-icon">Admission Enquiry</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img src={admission_image} alt="Admissions Open" className="img-fluid" style={{ maxWidth: '450px' }} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





// import EnquiryForm from "@/app/components/EnquiryForm";
// import Script from "next/script";

// async function getHomeData() {
//   const res = await fetch(`http://145.223.18.188:7000/uploads/api/home.json`, {
//     cache: "no-store",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

//   if (!res.ok) return null;
//   const json = await res.json();
//   return json.data;
// }

// export default async function HomePage() {
//   const data = await getHomeData();

//   if (!data) {
//     return <div className="container py-5">Failed to load data.</div>;
//   }

//   const { choosus, faqs, page, api_url, admission_image, banners } = data;
//   const pageData = page?.[0]; 
//   const whyChoose = choosus?.[0];
//   const mainBanner = banners?.[0]; // Get dynamic banner from API

//   return (
//     <>
//       {/* Ensure Bootstrap JS is loaded for Accordion functionality */}
//       <Script 
//         src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
//         strategy="afterInteractive" 
//       />

//       <style dangerouslySetInnerHTML={{ __html: `
//         .cyan { background-color: #20b2aa !important; }
        
//         /* Banner Fix: Dynamic API Image */
//         .breadcumb-wrapper {
//           position: relative;
//           padding: 0;
//           width: 100%;
//           overflow: hidden;
//         }
//         .breadcumb-wrapper img {
//           width: 100%;
//           height: auto;
//           display: block;
//         }

//         /* FAQ Fix: Answer Visibility */
//         .faq-card { 
//           border-left: 3px solid #20b2aa !important; 
//           border-radius: 6px; 
//           margin-bottom: 10px; 
//           border: 1px solid #eee; 
//           background: #fff; 
//         }
//         .accordion-button:not(.collapsed) { 
//           color: #20b2aa !important; 
//           background: #fff !important; 
//           box-shadow: none; 
//         }
//         .accordion-collapse.show {
//           visibility: visible !important;
//           display: block !important;
//         }
//         .accordion-body {
//           padding: 20px;
//           border-top: 1px solid #eee;
//         }
//         .faq-text {
//           color: #555 !important;
//           font-size: 16px;
//           line-height: 1.6;
//         }

//         .why-choose-list { list-style: none; padding: 0; margin: 0; }
//         .why-choose-list li { display: flex; align-items: start; margin-bottom: 20px; }
//         .why-choose-list i { color: #20b2aa; margin-right: 12px; margin-top: 4px; flex-shrink: 0; }
//         .why-choose-item-title { color: #20b2aa; font-weight: 700; display: block; margin-bottom: 5px; font-size: 18px; }
//         .why-choose-item-desc { color: #ffffff; font-size: 14px; line-height: 1.6; }
//       `}} />

//       {/* --- SECTION 0: DYNAMIC BANNER --- */}
//       <div className="breadcumb-wrapper">
//         <img
//           src={mainBanner?.image_path ? `${api_url}uploads/courses/${mainBanner.image_path}` : "/assets/img/breadcrumb/banner1.png"}
//           alt={mainBanner?.title || "Course Banner"}
//         />
//       </div>

//       {/* --- SECTION 1: ABOUT / INTRO --- */}
//       <section className="position-relative overflow-hidden space">
//         <div className="container">
//           <div className="row gy-60 align-items-center justify-content-center">
//             <div className="col-xl-6">
//               <div className="about-content">
//                 <div className="title-area mb-0">
//                   <span className="sub-title text-anim" style={{ color: '#20b2aa', fontWeight: 'bold' }}>
//                     MPC WITH IIT-JEE COACHING
//                   </span>
//                   <h2 className="sec-title text-anim2 mt-2" style={{ fontSize: "40px", lineHeight: "48px", fontWeight: '800' }}>
//                     Best IIT Junior Colleges in Hyderabad for MPC & JEE Coaching
//                   </h2>
//                   <div className="sec-text mt-30" dangerouslySetInnerHTML={{ __html: pageData?.short_description }} />
//                 </div>
//                 <div className="btn-wrap mt-40">
//                   <a href="/contactus" className="th-btn th-icon">Apply Now</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img
//                 src="/assets/img/college.jpg" 
//                 alt="Rankridge Classroom"
//                 className="img-fluid rounded shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 2: WHY CHOOSE US --- */}
//       <section className="position-relative overflow-hidden space" id="why-choose-sec" style={{ backgroundColor: '#081933' }}>
//         <div className="container">
//           <div className="row gy-50 align-items-start">
//             <div className="col-xl-6">
//               <span className="sub-title text-anim">Why Choose Us</span>
//               <h2 className="sec-title mb-35 white" style={{color: '#fff'}}>
//                 {whyChoose?.title || "What Sets Rankridge Apart?"}
//               </h2>
//               <ul className="why-choose-list">
//                 {[1, 2, 3, 4].map((num) => {
//                   const titleKey = `option_${num}_title` as keyof typeof whyChoose;
//                   const descKey = `option_${num}_description` as keyof typeof whyChoose;
//                   if (!whyChoose?.[titleKey]) return null;
//                   return (
//                     <li key={num}>
//                       <i className="fas fa-check-circle fa-lg"></i>
//                       <div>
//                         <span className="why-choose-item-title">{whyChoose[titleKey]}</span>
//                         <p className="why-choose-item-desc">{whyChoose[descKey]}</p>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             <div className="col-xl-6">
//               <div className="admission-form-box p-4 p-md-5" style={{ backgroundColor: '#20b2aa', borderRadius: 8, border: '2px solid #081933' }}>
//                 <h3 className="mb-1" style={{ color: '#0a1628', fontWeight: 700 }}>Apply for Admission.</h3>
//                 <p className="mb-30" style={{ color: '#0a1628', fontSize: 14 }}>Our Team will contact you shortly.</p>
//                 <EnquiryForm />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 3: FAQ (Answer Visibility Fix) --- */}
//       <section className="position-relative overflow-hidden space bg-white">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-10">
//               <div className="text-center">
//                 <span className="sub-title" style={{ color: '#20b2aa' }}>HAVE QUESTIONS?</span>
//                 <h2 className="sec-title mb-40" style={{ color: '#081933', fontWeight: 700 }}>
//                   General FAQs
//                 </h2>
//               </div>
//               <div className="faq-box">
//                 <div className="accordion" id="faqAccordion">
//                   {faqs?.map((faq: any, index: number) => (
//                     <div className="faq-card" key={faq.id}>
//                       <div className="accordion-header">
//                         <button
//                           className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
//                           type="button"
//                           data-bs-toggle="collapse"
//                           data-bs-target={`#faq-collapse-${faq.id}`}
//                           aria-expanded={index === 0 ? "true" : "false"}
//                           aria-controls={`faq-collapse-${faq.id}`}
//                         >
//                           {index + 1}. {faq.title}
//                         </button>
//                       </div>
//                       <div
//                         id={`faq-collapse-${faq.id}`}
//                         className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
//                         data-bs-parent="#faqAccordion"
//                       >
//                         <div className="accordion-body">
//                           <p className="faq-text mb-0">
//                             {faq.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- SECTION 4: ADMISSIONS CTA --- */}
//       <section className="scholar-area scholar-style position-relative space-top overflow-hidden">
//         <div className="container">
//           <div className="row gy-60 justify-content-center align-items-center mb-5">
//             <div className="col-xl-6">
//               <div className="scholar-content text-center text-lg-start">
//                 <span className="sub-title text-anim" style={{ color: '#20b2aa' }}>Admissions Open 2026-27</span>
//                 <h2 className="sec-title text-anim2">Start Your Journey Today</h2>
//                 <p className="sec-text mt-25">
//                   Take the first step toward a successful future in Engineering or Medicine. Our guidance ensures a smooth transition from application to success.
//                 </p>
//                 <div className="btn-wrap mt-40 justify-content-center justify-content-lg-start">
//                   <a href="/contactus" className="th-btn th-icon">Admission Enquiry</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img src={admission_image} alt="Admissions Open" className="img-fluid" style={{ maxWidth: '450px' }} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



// import EnquiryForm from "@/app/components/EnquiryForm";
// import Script from "next/script";

// async function getCourse(slug: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/academics/${slug}`,
//     {
//       cache: "no-store",
//       headers: {
//         "Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8`,
//         "Content-Type": "application/json"
//       }
//     }
//   );

//   if (!res.ok) return null;
//   const json = await res.json();

//   if (!json?.data?.getAcademic?.length) return null;

//   return {
//     course: json.data.getAcademic[0],
//     subCourses: json.data.getAcademicSub || [],
//     courseFaqs: json.data.faqs || [], // Pulling general FAQs from the root data
//     whyChoose: json.data.choosus?.[0] || null, // Pulling why choose us from root
//     api_url: json.data.api_url
//   };
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const data = await getCourse(slug);
//   if (!data) return {};
//   const { course } = data;

//   return {
//     title: course?.meta_title || course?.title,
//     description: course?.meta_description,
//     keywords: course?.meta_keyword,
//     alternates: { canonical: `/academics/${slug}` },
//     openGraph: {
//       title: course?.meta_title || course?.title,
//       description: course?.meta_description,
//       type: "article",
//     },
//   };
// }

// export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const data = await getCourse(slug);

//   if (!data) {
//     return <div className="container py-5">Course not found</div>;
//   }

//   const { course, subCourses, courseFaqs, whyChoose, api_url } = data;
  
//   const labelGrid = [
//     'benefit-card-teal', 'benefit-card-orange', 'benefit-card-pink', 
//     'benefit-card-indigo', 'benefit-card-blue', 'benefit-card-coral', 
//     'benefit-card-gold', 'benefit-card-purple', 'benefit-card-green'
//   ];

//   return (
//     <>
//       <Script 
//         src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
//         strategy="afterInteractive" 
//       />

//       <style dangerouslySetInnerHTML={{ __html: `
//         .cyan { background-color: #20b2aa !important; }
//         .faq-card { 
//           border-left: 3px solid #20b2aa !important; 
//           border-radius: 6px; 
//           margin-bottom: 10px; 
//           border: 1px solid #eee; 
//           background: #fff; 
//         }
//         .accordion-button:not(.collapsed) { 
//           color: #20b2aa !important; 
//           background: #fff !important; 
//           box-shadow: none; 
//         }
//         .why-choose-list { list-style: none; padding: 0; margin: 0; }
//         .why-choose-list li { display: flex; align-items: start; margin-bottom: 20px; }
//         .why-choose-list i { color: #20b2aa; margin-right: 12px; margin-top: 4px; flex-shrink: 0; }
//         .why-choose-item-title { color: #20b2aa; font-weight: 700; display: block; margin-bottom: 5px; font-size: 18px; }
//         .why-choose-item-desc { color: #ffffff; font-size: 14px; line-height: 1.6; }
//       `}} />

//       {/* Breadcrumb Section */}
//       <div 
//   className="breadcumb-wrapper position-relative d-flex align-items-center"
//   style={{
//     backgroundImage: `url(${
//       course?.image_path 
//         ? `${api_url}uploads/courses/${course?.image_path}` 
//         : "/assets/img/breadcrumb/banner1.png"
//     })`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     minHeight: "400px",
//     padding: "60px 0"
//   }}
// >
//   {/* DARK OVERLAY */}
//   <div style={{
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     background: "rgba(0,0,0,0.4)"
//   }} />

//   {/* CONTENT */}
//   <div className="container" style={{ position: "relative", zIndex: 2 }}>
//     <div className="row align-items-center">

//       <div className="col-xl-6"></div>

//       <div className="col-xl-6">
//         <div style={{ color: "#fff" }}>
          
//           <span style={{ 
//             color: "#20b2aa", 
//             fontWeight: "600"
//           }}>
//             {course?.title}
//           </span>

//           <h1 style={{
//             fontSize: "42px",
//             fontWeight: "800",
//             marginTop: "10px",
//             color: "white",
//           }}>
//             {course?.sub_title || "Start your Success journey with Rankridge!"}
//           </h1>

//           <p style={{ marginTop: "15px", color: "white" }}>
//             {course?.short_description || 
//               "Rankridge is a premier institute in Hyderabad known for IIT-JEE & NEET coaching."}
//           </p>

//         </div>
//       </div>

//     </div>
//   </div>
// </div>

//       {/* Section 1: Intro */}
//       <section className="position-relative overflow-hidden space" id="iit-intro-sec">
//         <div className="container">
//           <div className="row gy-60 align-items-center justify-content-center">
//             <div className="col-xl-6">
//               <div className="about-content">
//                 <div className="title-area mb-0">
//                   <span className="sub-title text-anim" style={{ color: '#20b2aa', fontWeight: 'bold' }}>{course?.title}</span>
//                   <h2 className="sec-title text-anim2 mt-2" style={{ fontSize: "40px", lineHeight: "48px", fontWeight: '800' }}>
//                     {course?.sub_title || course?.title}
//                   </h2>
//                   <div className="sec-text mt-30" dangerouslySetInnerHTML={{ __html: course?.description }} />
//                 </div>
//                 <div className="btn-wrap mt-40">
//                   <a href="/contactus" className="th-btn th-icon">Apply Now</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img
//                 src={course?.section_one_image ? `${api_url}uploads/courses/${course.section_one_image}` : "/assets/img/college.jpg"}
//                 alt={course?.title}
//                 className="img-fluid rounded shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 2: Details (Cyan Background) */}
//       <section className="position-relative overflow-hidden space bg-smoke cyan">
//         <div className="container">
//           <div className="row gy-60 align-items-center justify-content-center">
//             <div className="col-xl-6 text-center">
//               <img
//                 src={course?.section_two_image ? `${api_url}uploads/courses/${course.section_two_image}` : "/assets/img/college1.jpg"}
//                 alt="Coaching"
//                 className="img-fluid rounded shadow-lg"
//               />
//             </div>
//             <div className="col-xl-6">
//               <div className="about-content ms-xxl-4 ps-xxl-2 ms-xl-2">
//                 <div className="title-area mb-0">
//                   <span className="sub-title text-anim text-white">{course?.second_title || "Course Details"}</span>
//                   <h2 className="sec-title text-anim2 text-white">
//                     {course?.second_sub_title}
//                   </h2>
//                   <div className="sec-text mt-30 text-white" dangerouslySetInnerHTML={{ __html: course?.second_description }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 3: Benefits Grid */}
//       <section id="course-benefits-sec" className="position-relative overflow-hidden space">
//         <div className="container">
//           <div className="row justify-content-center text-center">
//             <div className="col-xl-8">
//               <div className="title-area">
//                 <span className="sub-title text-anim">Why Rankridge</span>
//                 <h2 className="sec-title text-anim2">
//                   {course?.section_title || "Course Benefits"}
//                 </h2>
//               </div>
//             </div>
//           </div>
//           <div className="row gy-30 justify-content-center">
//             {subCourses.map((item: any, index: number) => (
//               <div className="col-xl-4 col-md-6" key={index}>
//                 <div className={`benefit-card ${labelGrid[index % labelGrid.length]} text-center p-4 rounded h-100`}>
//                   <div className="benefit-icon mb-3">
//                     <i className={item.font_icon || "fal fa-graduation-cap fa-2x"}></i>
//                   </div>
//                   <h4 className="box-title mb-2">{item.title}</h4>
//                   <div className="box-text" dangerouslySetInnerHTML={{ __html: item.description }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Section 4: Why Choose Us (UPDATED) */}
//       <section className="position-relative overflow-hidden space" id="why-choose-sec" style={{ backgroundColor: '#081933' }}>
//         <div className="container">
//           <div className="row gy-50 align-items-start">
//             <div className="col-xl-6">
//               <span className="sub-title text-anim">Why Choose Us</span>
//               <h2 className="sec-title mb-35 white" style={{color: '#fff'}}>
//                 {whyChoose?.title || "What Sets Rankridge Apart?"}
//               </h2>
//               <ul className="why-choose-list">
//                 {[1, 2, 3, 4].map((num) => {
//                   const titleKey = `option_${num}_title`;
//                   const descKey = `option_${num}_description`;
//                   if (!whyChoose?.[titleKey]) return null;
//                   return (
//                     <li key={num}>
//                       <i className="fas fa-check-circle fa-lg"></i>
//                       <div>
//                         <span className="why-choose-item-title">{whyChoose[titleKey]}</span>
//                         <p className="why-choose-item-desc">{whyChoose[descKey]}</p>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             <div className="col-xl-6">
//               <div className="admission-form-box p-4 p-md-5" style={{ backgroundColor: '#20b2aa', borderRadius: 8, border: '2px solid #081933' }}>
//                 <h3 className="mb-1" style={{ color: '#0a1628', fontWeight: 700 }}>Apply for Admission.</h3>
//                 <p className="mb-30" style={{ color: '#0a1628', fontSize: 14 }}>Our Team will contact you shortly.</p>
//                 <EnquiryForm />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 5: FAQs (UPDATED) */}
//       <section className="position-relative overflow-hidden space bg-white">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-xl-10">
//               <div className="text-center">
//                 <span className="sub-title" style={{ color: '#20b2aa' }}>HAVE QUESTIONS?</span>
//                 <h2 className="sec-title mb-40" style={{ color: '#081933', fontWeight: 700 }}>
//                   General FAQs
//                 </h2>
//               </div>
//               <div className="faq-box">
//                 <div className="accordion" id="faqAccordion">
//                   {courseFaqs?.map((faq: any, index: number) => (
//                     <div className="faq-card" key={faq.id}>
//                       <div className="accordion-header">
//                         <button
//                           className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
//                           type="button"
//                           data-bs-toggle="collapse"
//                           data-bs-target={`#faq-collapse-${faq.id}`}
//                           aria-expanded={index === 0 ? "true" : "false"}
//                           aria-controls={`faq-collapse-${faq.id}`}
//                         >
//                           {index + 1}. {faq.title}
//                         </button>
//                       </div>
//                       <div
//                         id={`faq-collapse-${faq.id}`}
//                         className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
//                         data-bs-parent="#faqAccordion"
//                       >
//                         <div className="accordion-body">
//                           <p className="faq-text mb-0">
//                             {faq.description}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 6: CTA / Scholar Area */}
//       <section className="scholar-area scholar-style position-relative space-top overflow-hidden">
//         <div className="container">
//           <div className="row gy-60 justify-content-center align-items-center mb-5">
//             <div className="col-xl-6">
//               <div className="scholar-content text-center text-lg-start">
//                 <span className="sub-title text-anim" style={{ color: '#20b2aa' }}>Admissions Open 2026-27</span>
//                 <h2 className="sec-title text-anim2">Start Your Journey Today</h2>
//                 <p className="sec-text mt-25">
//                   Take the first step toward a successful future in Engineering or Medicine. Our guidance ensures a smooth transition from application to success.
//                 </p>
//                 <div className="btn-wrap mt-40 justify-content-center justify-content-lg-start">
//                   <a href="/contactus" className="th-btn th-icon">Admission Enquiry</a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-6 text-center">
//               <img src={`${api_url}/commonimg/scholar-1-1.png`} alt="Admissions Open" className="img-fluid" style={{ maxWidth: '450px' }} />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }