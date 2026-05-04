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

  const { course, subCourses, api_url } = data;
  return (
    <>
    
      {/* Breadcrumb */}
    <div className="breadcumb-wrapper position-relative">
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
                <a href="contactus.html" className="th-btn th-icon">Apply Now</a>
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
          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-teal text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-graduation-cap fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">
                Integrated Preparation for Board and Competitive Exams
              </h4>
              <p className="box-text">
                With integrated MPC and IIT-JEE coaching, aspirants efficiently
                prepare for Intermediate exams and also IIT-JEE. This helps
                managing their syllabus effectively and save time by eliminating
                the need for separate coaching classNamees.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-orange text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-chalkboard-teacher fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">Expert Faculty Guidance</h4>
              <p className="box-text">
                Our expert faculty offer personalized, one-on-one mentoring
                applying the latest IIT-JEE strategies. Our approach ensures
                that students grasp challenging concepts with ease and receive
                customised guidance to strengthen their subject knowledge with
                no learning gaps.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-pink text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-clipboard-list fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">Rigorous Practice and Mock Tests</h4>
              <p className="box-text">
                Our regular assessments comprise quizzes and mock exams, which
                evaluate student progress and highlight areas for improvement.
                IIT-JEE mock tests simulate the actual exam, enhancing
                problem-solving speed, accuracy, and confidence for success.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-indigo text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-brain fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">
                Enhanced Problem-Solving and Analytical Skills
              </h4>
              <p className="box-text">
                MPC plus IIT-JEE coaching emphasises critical-thinking and
                trains students with advanced problem sets, enhancing their
                analytical skills and problem-solving abilities for success and
                also future career growth to give them an edge.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-blue text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-trophy fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">Competitive Edge in Entrance Exams</h4>
              <p className="box-text">
                Students opting for MPC with IIT-JEE coaching can secure
                admission in any top engineering college like the IITs and NITs.
                Such a preparation also helps in excelling at other entrance
                exams like BITSAT, VITEEE, and EAMCET.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-coral text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-calendar-alt fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">Structured Study Approach</h4>
              <p className="box-text">
                The program has a structured plan with a detailed time-table,
                breaking the curriculum into manageable segments for effective
                learning. Regular revision and doubt-clearing sessions help
                students retain concepts and prepare well for Intermediate board
                and IIT-JEE.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-gold text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-cogs fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">Skill Development Beyond Academics</h4>
              <p className="box-text">
                Preparing for Intermediate and also IIT-JEE helps master time
                and stress management, fostering discipline, prioritization,
                focus under pressure, and a positive mindset which are skills
                crucial for exam success and life.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-purple text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-briefcase fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">
                Career Flexibility and Opportunities
              </h4>
              <p className="box-text">
                Completing MPC with IIT-JEE offers diverse career opportunities
                in engineering, technology, and research. High scores can help
                secure scholarships, reducing financial strain and supporting
                higher education in top institutions.
              </p>
            </div>
          </div>

          
          <div className="col-xl-4 col-md-6">
            <div
              className="benefit-card benefit-card-green text-center p-4 rounded h-100"
            >
              <div className="benefit-icon mb-3">
                <i className="fal fa-users fa-2x"></i>
              </div>
              <h4 className="box-title mb-2">
                Motivational Environment and Peer Learning
              </h4>
              <p className="box-text">
                The competitive environment here motivates students to excel,
                while collaborative learning through group study and peer
                discussions powers mutual growth. This way students learn from
                each other and succeed together.
              </p>
            </div>
          </div>
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
              Why Choose Resonance for MPC with IIT-JEE Coaching in Hyderabad
            </h2>
            <ul
              className="why-choose-list"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >25 years of legacy in training over 1 million students.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Integrated curriculum: Covers board exams along with multiple
                  target exams (JEE, BITSAT, EAPCET, etc.) in a single
                  course.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Unique learning methodology: Blends concept-based teaching,
                  interactive sessions, target-driven self-study, and
                  specialized revision.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Research-based study material: Prepared by a 100+ member
                  Research &amp; Development team, and integrates NCERT and
                  State Board syllabus.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Best-in-className faculty: With 1000+ experts primarily from
                  IITs, NITs, and top universities.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Stress-free environment: Effectively planned, no merit-based
                  segregation, regular mentoring, and small className sizes.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Most awarded educational institute in recent times with a
                  remarkable track record:
                  <ul
                    style={{
                      listStyle: 'none',
                      paddingLeft: 10,
                      marginTop: 8,
                    }}
                  >
                    <li style={{ color: '#fff' }}>
                      - 181 IIT seat selections in 2024
                    </li>
                    <li style={{ color: '#fff' }}>
                      - 275 selections in NITs, IIITs, BITs, and other top
                      institutions in 2024
                    </li>
                    <li style={{ color: '#fff' }}>
                      - 320 selections in top 10 EAPCET colleges of Telangana in
                      2024
                    </li>
                    <li style={{ color: '#fff' }}>
                      - Best Engineering Entrance Institute, The Times of India,
                      2022
                    </li>
                    <li style={{ color: '#fff' }}>
                      - Telangana Education Excellence Award, TITA, 2023
                    </li>
                  </ul>
                </span>
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Holistic learning environment with top-tier academics,
                  year-round cultural, sports, and extracurricular activities,
                  including the annual ResoFest.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >ResoclassName: A dynamic digital learning app from Resonance
                  Hyderabad that allows students 24/7 access to live and
                  recorded sessions, Computer-based Tests (CBT), and in-depth
                  performance analysis which can be accessed from
                  anywhere.</span
                >
              </li>
              <li className="d-flex align-items-start mb-20">
                <span
                  style={{
                    color: '#20b2aa',
                    marginRight: 12,
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                  ><i className="fas fa-check-circle"></i
                ></span>
                <span style={{ color: '#fff' }}
                  >Reso Bridge: A comprehensive app from Resonance Hyderabad, it
                  helps parents monitor their child's academic reports, pay
                  fees, initiate leave requests, report grievances, etc.</span
                >
              </li>
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
                  <div className="accordion-card wow fadeInUp" data-wow-delay=".1s">
                    <div className="accordion-header" id="collapse-item-1">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-1"
                        aria-expanded="true"
                        aria-controls="collapse-1"
                      >
                        01. What makes Rankridge stand out among other junior
                        colleges?
                      </button>
                    </div>
                    <div
                      id="collapse-1"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">
                          Rankridge stands out with its comprehensive approach,
                          focusing on both academics and personal growth. With a
                          99% of success rate in IIT-JEE & NEET, it provides
                          students with the support they need. The college
                          offers a personalized learning experience with great
                          facilities and strong mentorship.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-card wow fadeInUp" data-wow-delay=".2s">
                    <div className="accordion-header" id="collapse-item-2">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-2"
                        aria-expanded="false"
                        aria-controls="collapse-2"
                      >
                        02. Why should I choose Rankridge for intermediate
                        college?
                      </button>
                    </div>
                    <div
                      id="collapse-2"
                      className="accordion-collapse collapse"
                      aria-labelledby="collapse-item-2"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">
                          Rankridge is an excellent choice for intermediate
                          education with IIT JEE & NEET coaching because of its
                          commitment to academic excellence, experienced
                          faculty, and individual attention to students.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-card wow fadeInUp" data-wow-delay=".3s">
                    <div className="accordion-header" id="collapse-item-3">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-3"
                        aria-expanded="false"
                        aria-controls="collapse-3"
                      >
                        03. How are the teaching standards in Rankridge?
                      </button>
                    </div>
                    <div
                      id="collapse-3"
                      className="accordion-collapse collapse"
                      aria-labelledby="collapse-item-3"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">
                          The secret is quality teaching, a focused curriculum,
                          and dedicated preparation for IIT-JEE and NEET through
                          consistent practice and expert guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-card wow fadeInUp" data-wow-delay=".4s">
                    <div className="accordion-header" id="collapse-item-4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse-4"
                        aria-expanded="false"
                        aria-controls="collapse-4"
                      >
                        04. How are doubt clarification sessions conducted at
                        Rankridge?
                      </button>
                    </div>
                    <div
                      id="collapse-4"
                      className="accordion-collapse collapse"
                      aria-labelledby="collapse-item-4"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">
                          Rankridge conducts one-on-one and group doubt sessions
                          regularly, promoting open interaction and concept
                          clarity.
                        </p>
                      </div>
                    </div>
                  </div>
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
                <a href="contactus.html" className="th-btn th-icon"
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
                <img src="assets/img/scholar-1-1.png" alt="image" />
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
        <img src="assets/img/shape/shape-3.png" alt="shape" />
      </div>
      <div
        className="about-shep-2 shape-mockup d-none d-xxl-block"
        data-bottom="4%"
        data-left="0%"
      >
        <img src="assets/img/shape/shape-4.png" alt="shape" />
      </div>
    </section>
    </>
  );
}