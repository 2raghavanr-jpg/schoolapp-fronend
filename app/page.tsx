"use client"; // Required at the top of your file
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles (these are scoped to the component)
import 'swiper/css';

export default function Home() {
    type Banner = {
        id: number;
        title:string;
        image_path: string;
    };

    type Coaching = {
        id:number;
        image_path: string;
        title: string;
        description: string;

    }

    type History = {
        youtube_id:string;
    }

    type Milestone = {
        id: number;
        image_path: string;
        description: string;
    };

    type HomeData = {
        api_url: string;
        banners: Banner[];
        milestones: Milestone[];
        coachings:Coaching[];
        history:History[];
    };
    const [homeData, setHomeData] = useState<HomeData | null>(null);

    useEffect(() => {
        fetch("http://localhost:3000/uploads/api/home.json")
        .then((res) => res.json())
        .then((data) => setHomeData(data.data))
        .catch((err) => console.error(err));
    }, []);

  if (!homeData) return <div>Loading...</div>;
    const storySlides = ["01.webp", "02.webp", "03.webp", "04.webp", "05.webp", "06.webp", "07.webp"];
  return (
    <div>
     <div className="th-hero-wrapper hero-1" id="hero">
            
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
            <div className="carousel-indicators d-none">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
             {homeData && (
            <div className="carousel-inner">
           
            {homeData.banners.map((banner, index) => (
                <div
                key={banner.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                <div className="hero-inner">
                    <img
                    src={`${homeData.api_url}uploads/banners/${banner.image_path}`}
                    className="d-block w-100 hero-img"
                    alt={banner.title}
                    />
                </div>
                </div>
            ))}
          
            </div>
              )}

        </div>
    </div>
    <div className="feature-sec-1 position-relative overflow-hidden space">

        <div className="container text-center">
            <h2 className="hero-title ">
                Top Intermediate Colleges in Hyderabad for <br />IIT-JEE & NEET Coaching
            </h2>
            <p className="hero-text">
                Your child's bright future begins with Rankridge's Outstanding integrated program.
            </p>
                {homeData && (
           <div className="row mt-4 gx-10 gy-10">
        
  {homeData.coachings.map((item) => (
    <div key={item.id} className="col-xl-4 col-md-6 feature-card_wrapp">
      <div className="feature-card">
        <div className="box-icon">
          <img src={`${homeData.api_url}uploads/coachings/${item.image_path}`} alt={item.title} />
        </div>
        <h3 className="box-title">{item.title}</h3>
        <p className="box-text style2">{item.description}</p>
      </div>
    </div>
  ))}

</div>
)}
        </div>
    </div>
    <div className="about1-area position-relative overflow-hidden space-bottom" id="about-sec">
        <div className="about-shep-2 shape-mockup d-none d-xxl-block home-inner-img-bottom-right" data-bottom="0%" data-right="0%" >
            <img src="assets/img/shape/feature-shep-2-home-1.png" alt="shape" />
        </div>
        <span className="about-shape-right shape-mockup jump-reverse home-inner-img-top-right" data-right="3%" data-top="2%">
            <img src="assets/img/shape/ab-shape1-2.png" alt="" />
        </span>
        <div className="container">
            <div className="about-wrap1 position-relative z-index-2">
                <div className="row gy-60 align-items-center justify-content-center">
                    <div className="col-xl-6">
                        <div className="img-box1">
                            <div className="img1 text-center text-sm-start wow fadeInLeft" data-wow-delay=".2s">
                                <img src="assets/img/college.jpg" alt="About" />
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-content ms-xxl-4 ps-xxl-2 ms-xl-2">
                            <div className="title-area">
                                <span className="sub-title text-anim">Our Track Record That Speaks for Itself</span>
                                <h2 className="sec-title text-anim2">
                                    Rankridge Hyderabad — Transforming Aspirants Into Top Rankers
                                </h2>
                                <p className="sec-text mt-25 mb-0 wow fadeInUp" data-wow-delay=".2s">
                                    Year after year, Rankridge produces outstanding IIT-JEE & NEET results through disciplined learning and personal attention.
                                </p>
                                <p className="sec-text mt-25 mb-0 wow fadeInUp" data-wow-delay=".2s">Our students consistently secure admissions into IITs, NITs, top medical and engineering colleges year after year — proving the strength of our integrated coaching system.</p>
                            </div>
                            <div className="about-feature-box">
                                <div className="about-feature wow fadeInUp" data-wow-delay=".3s">
                                    <span className="box-icon">
                                        <img src="assets/img/icon/ab-users.svg" className="filter-lightseagreen" alt="icon" />
                                    </span>
                                    <div className="box-content">
                                        <h3 className="box-title"> IITs & NITs — 2025</h3>
                                        <p className="box-text">
                                            Our team is ready for any challenge! We put our joint efforts to
                                            generate brave business ideas.
                                        </p>
                                    </div>
                                </div>
                                <div className="about-feature wow fadeInUp" data-wow-delay=".4s">
                                    <span className="box-icon">
                                        <img src="assets/img/icon/ab-message.svg" className="filter-lightseagreen" alt="icon" />
                                    </span>
                                    <div className="box-content">
                                        <h3 className="box-title">Medical & Dental Colleges</h3>
                                        <p className="box-text">
                                            Our team is ready for any challenge! We put our joint efforts to
                                            generate brave business ideas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span className="about-shape-left shape-mockup movingX d-none d-xxl-block home-inner-img-bottom-left" data-bottom="0%" data-left="2%">
            <img src="assets/img/shape/ab-shape1-1.png" alt="" />
        </span>
    </div>
    <div className="counter-area1 overflow-hidden">
        <div className="container th-container2">
            {homeData && (
            <div className="counter-wrap1">
                
               {homeData.milestones.map((item, index) => {
                    const delay = `${(index + 1) * 0.2}s`;

                    let numberPart = "";
                    let textPart = "";

                    // Case 1: contains "out of"
                    if (item.description.includes("out of")) {
                        const parts = item.description.split("out of");
                        numberPart = parts[0].trim();
                        textPart = "out of " + parts[1].trim();
                    }
                    // Case 2: contains %
                    else if (item.description.includes("%")) {
                        const match = item.description.match(/^(\d+%)(.*)/);
                        numberPart = match ? match[1] : "";
                        textPart = match ? match[2] : item.description;
                    }
                    // Fallback
                    else {
                        numberPart = item.description;
                        textPart = "";
                    }

                    return (
                        <div key={item.id}>
                        <div className="counter-card wow fadeInUp" data-wow-delay={delay}>
                            <div className="box-icon">
                            <img
                                src={`${homeData.api_url}uploads/milestones/${item.image_path}`}
                                className="filter-white"
                                alt="icon"
                            />
                            </div>

                            <div className="media-body">
                            <h3 className="box-number">
                                <span className="counter-number">{numberPart}</span>
                            </h3>

                            <p className="box-text">{textPart}</p>
                            </div>
                        </div>

                        <div className="divider"></div>
                        </div>
                    );
                    })}
            </div>
            )}
        </div>
    </div>
    <section className="academic1-area space overflow-hidden" id="program-sec">
        <div className="container">
            <div className="row justify-content-lg-between justify-content-center align-items-center">
                <div className="col-lg-9 col-12">
                    <div className="title-area text-center text-lg-start mb-75">
                        <span className="sub-title text-anim">Rankridge History</span>
                        <h2 className="sec-title text-anim2">A Legacy of Record-Breaking Results</h2>
                    </div>
                </div>

            </div>
            <div className="academic-wrapp">
                <div className="slider-area">
                    <div className="swiper th-slider has-shadow"
                         id="academicSlider2"
                         data-slider-options='{"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"768":{"slidesPerView":"1"},"992":{"slidesPerView":"2"},"1200":{"slidesPerView":"3"},"1400":{"slidesPerView":"3", "spaceBetween": "24"}},"autoHeight": "true", "autoplay" : "false"}'>
                        {homeData && (
                        <div className="swiper-wrapper">
                            {homeData.history.map((item, index) => (
                                <div key={index} className="swiper-slide">
                                    <div className="academic-card">
                                    <div className="academic-img">
                                        <iframe
                                        className="yt-frame"
                                        src={`https://www.youtube.com/embed/${item.youtube_id}`}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        ></iframe>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            

                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="why-area why-bg position-relative space overflow-hidden">
        <div className="why-shape jump shape-mockup " data-left="0%" data-bottom="10%">
            <img src="assets/img/shape/why-1-1.png" alt="" />
        </div>
        <div className="container">
            <div className="row gy-4">
                <div className="col-xl-8">
                    <div className="title-area text-center text-lg-start">
                        <span className="sub-title text-anim">WHY CHOOSEUS</span>
                        <h2 className="sec-title text-anim2">
                            What Sets Rankridge Apart for
                            IIT-JEE & NEET?
                        </h2>
                    </div>
                    <div className="row gy-60">
                        <div className="col-lg-6 col-md-6">
                            <div className="why-card wow fadeInUp" data-wow-delay=".2s">
                                <div className="why-content">
                                    <div className="why-titlebox">
                                        <span className="why-number position-relative">1</span>
                                        <h3 className="box-title">
                                            <a href="">
                                                Stress-Free Competitive Coaching
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            Opportunities for faith and fellowship are all around, from chapel
                                            worship and dorm devotions to communal meals, clubs and activities.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="why-card wow fadeInUp" data-wow-delay=".4s">
                                <div className="why-content">
                                    <div className="why-titlebox">
                                        <span className="why-number position-relative">2</span>
                                        <h3 className="box-title">
                                            <a href="">
                                                Equal Focus on<br /> Every Student
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            Opportunities for faith and fellowship are all around, from chapel
                                            worship and dorm devotions to communal meals, clubs and activities.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="why-card wow fadeInUp" data-wow-delay=".6s">
                                <div className="why-content">
                                    <div className="why-titlebox">
                                        <span className="why-number position-relative">3</span>
                                        <h3 className="box-title">
                                            <a href="">
                                                Personal Mentoring & Doubt Clarifications
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            Opportunities for faith and fellowship are all around, from chapel
                                            worship and dorm devotions to communal meals, clubs and activities.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="why-card wow fadeInUp" data-wow-delay=".8s">
                                <div className="why-content">
                                    <div className="why-titlebox">
                                        <span className="why-number position-relative">4</span>
                                        <h3 className="box-title">
                                            <a href="">
                                                Rank-Oriented & Research-Based Curriculum

                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            Opportunities for faith and fellowship are all around, from chapel
                                            worship and dorm devotions to communal meals, clubs and activities.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="why-video">
                        <div className="why-video-bg overflow-hidden gsap-parallax">
                            <img src="assets/img/why-video1-1.jpg" alt="image" />
                            <div className="why-video-btn">
                                <a href="https://www.youtube.com/watch?v=y_cRqdMHevU&t=1s" className="play-btn popup-video">
                                    <i className="fa-sharp fa-solid fa-play"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="campus overflow-hidden space">
        <div className="campus-shape jump shape-mockup d-none d-xxl-block" data-bottom="22%" data-right="5%">
            <img src="assets/img/shape/campus-1-1.png" alt="shape" />
        </div>
        <div className="container">
            <div className="row justify-content-lg-between justify-content-center align-items-center">
                <div className="col-lg-8 col-12">
                    <div className="title-area text-center text-lg-start">
                        <span className="sub-title text-anim">Right Course</span>
                        <h2 className="sec-title text-anim2">Choose the Right Course for Your Child’s Success</h2>
                    </div>
                </div>

            </div>
            <div className="row gy-5 justify-content-center">
                <div className="col-xl-4 col-lg-6">
                    <div className="campus-card wow fadeInLeft" data-wow-delay=".2s">
                        <div className="campus-img global-img">
                            <a href="" className="d-block position-relative">
                                <img src="assets/img/campus-1-1.jpg" alt="campus image" className="img-1" />
                            </a>
                        </div>
                        <div className="campus-content">
                            <h3 className="box-title"><a href="">MPC with IIT-JEE Coaching</a></h3>
                            <p className="box-text">
                                Advanced IIT-JEE training with concept strengthening and exam-focused practice to secure All India Top Ranks.
                            </p>
                        </div>
                        <a href="" className="th-btn style-border1 th-icon">Enroll Now</a>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="campus-card wow fadeInLeft" data-wow-delay=".4s">
                        <div className="campus-img global-img">
                            <a href="" className="d-block position-relative">
                                <img src="assets/img/campus-1-2.jpg" alt="campus image" className="img-1" />
                            </a>
                        </div>
                        <div className="campus-content">
                            <h3 className="box-title"><a href="">BiPC with NEET Coaching</a></h3>
                            <p className="box-text">
                                Concept-driven NEET preparation with NCERT clarity and intensive test series for medical entrance confidence and success.
                            </p>
                        </div>
                        <a href="" className="th-btn style-border1 th-icon">Enroll Now</a>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-6">
                    <div className="campus-card wow fadeInLeft" data-wow-delay=".6s">
                        <div className="campus-img global-img">
                            <a href="" className="d-block position-relative">
                                <img src="assets/img/campus-1-3.jpg" alt="campus image" className="img-1" />
                            </a>
                        </div>
                        <div className="campus-content">
                            <h3 className="box-title"><a href="">MPC with EAMCET Coaching</a></h3>
                            <p className="box-text">
                                Can’t make it to campus? Explore parts of Redeemer’s 70-acre campus through a series
                                of short videos and get a glimpse of what it has to offer—wherever and whenever
                                works best for you.
                            </p>
                        </div>
                        <a href="" className="th-btn style-border1 th-icon">Enroll Now</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
<div className="story-area-1 overflow-hidden space">
        <div className="container">
          <div className="title-area text-center text-lg-start">
            <span className="sub-title">Achievements</span>
            <h2 className="sec-title">Outstanding Achievements — Rankers Who Made Us Proud</h2>
          </div>
        </div>

        <div className="container-fluid px-lg-5">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            speed={800}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            className="story-slider-custom"
          >
            {storySlides.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="story-card shadow-sm border-0">
                  <div className="box-img">
                    <img src={`assets/img/${img}`} alt={`Achievement ${index}`} className="w-100 rounded-3" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    
    <section className="faq-area-1 position-relative space overflow-hidden">

        <div className="faq-shape3 movingX shape-mockup" data-bottom="0%" data-right="2%">
            <img src="assets/img/shape/faq-1-1.png" alt="shape" />
        </div>
        <div className="ripple-shape d-none d-xl-block">
            <span className="ripple-1"></span> <span className="ripple-2"></span> <span className="ripple-3"></span>
            <span className="ripple-4"></span> <span className="ripple-5"></span>
        </div>
        <div className="container">
            <div className="row gy-30 gx-30 align-items-center justify-content-center">
                <div className="col-xxl-5">
                    <div className="faq-imgbox wow fadeInLeft" data-wow-delay=".3s">
                        <div className="img1">
                            <img src="assets/img/college1.jpg" alt="About" />
                        </div>

                    </div>
                </div>
                <div className="col-xxl-7">
                    <div className="faq-content">
                        <div className="faq-wrap">
                            <div className="title-area" style={{marginBottom: "25px"}}>
                                <span className="sub-title text-anim">FAQ</span>
                                <h2 className="sec-title text-anim2">Frequently Ask Questions</h2>
                                <p className="box-text mt-20 wow fadeInUp" data-wow-delay=".3s">
                                    Rankridge ensures every child succeeds by providing adaptive learning support, personalized attention, and inclusive teaching methods that help students thrive in a general education environment.
                                </p>
                            </div>
                        </div>
                        <div className="faq-box">
                            <div className="faq-wrap1">
                                <div className="accordion" id="faqAccordion">
                                    <div className="accordion-card wow fadeInUp" data-wow-delay=".1s">
                                        <div className="accordion-header" id="collapse-item-1">
                                            <button className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapse-1"
                                                    aria-expanded="true"
                                                    aria-controls="collapse-1">
                                                01. What makes Rankridge stand out among other junior colleges?
                                            </button>
                                        </div>
                                        <div id="collapse-1"
                                             className="accordion-collapse collapse"
                                             aria-labelledby="collapse-item-1"
                                             data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p className="faq-text">
                                                    Rankridge stands out with its comprehensive approach, focusing on both academics and personal growth. With a 99% of success rate in IIT-JEE & NEET, it provides students with the support they need. The college offers a personalized learning experience with great facilities and strong mentorship.

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-card wow fadeInUp" data-wow-delay=".2s">
                                        <div className="accordion-header" id="collapse-item-2">
                                            <button className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapse-2"
                                                    aria-expanded="false"
                                                    aria-controls="collapse-2">
                                                02. Why should I choose Rankridge for intermediate college?
                                            </button>
                                        </div>
                                        <div id="collapse-2"
                                             className="accordion-collapse collapse"
                                             aria-labelledby="collapse-item-2"
                                             data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p className="faq-text">

                                                    Rankridge is an excellent choice for intermediate education with IIT JEE & NEET coaching because of its commitment to academic excellence, experienced faculty, and individual attention to students.

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-card wow fadeInUp" data-wow-delay=".3s">
                                        <div className="accordion-header" id="collapse-item-3">
                                            <button className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapse-3"
                                                    aria-expanded="false"
                                                    aria-controls="collapse-3">
                                                03. How are the teaching standards in Rankridge?
                                            </button>
                                        </div>
                                        <div id="collapse-3"
                                             className="accordion-collapse collapse"
                                             aria-labelledby="collapse-item-3"
                                             data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p className="faq-text">

                                                    The secret is quality teaching, a focused curriculum, and dedicated preparation for IIT-JEE and NEET through consistent practice and expert guidance.

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-card wow fadeInUp" data-wow-delay=".4s">
                                        <div className="accordion-header" id="collapse-item-4">
                                            <button className="accordion-button collapsed"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapse-4"
                                                    aria-expanded="false"
                                                    aria-controls="collapse-4">
                                                04. How are doubt clarification sessions conducted at Rankridge?

                                            </button>
                                        </div>
                                        <div id="collapse-4"
                                             className="accordion-collapse collapse"
                                             aria-labelledby="collapse-item-4"
                                             data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                <p className="faq-text">

                                                    Rankridge conducts one-on-one and group doubt sessions regularly, promoting open interaction and concept clarity.

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
        </div>
    </section>
    <section className="apply-stadum-area bg-title position-relative space overflow-hidden">
        <div className="container">
            <div className="row gy-4 align-items-center justify-content-between">
                <div className="col-xl-8 order-1 order-xl-0">
                    <div className="apply-stadum-titlebox title-area">
                        <div className="sec-title-wrap">
                            <span className="sub-title text-anim">Why Rankridge?</span>
                            <h4 className="sec-title text-white text-anim2">
                                With one-to-one mentoring, structured study plans, AI progress analytics & weekly exams — every student stays on track and reaches IIT-JEE, NEET goals with confidence.
                            </h4>
                        </div>

                    </div>
                    <div className="apply-stadum-wrapp">
                        <div className="apply-stadum-box">
                            <div className="checklist">
                                <ul className="list-unstyled">
                                    <li className="wow fadeInUp" data-wow-delay=".2s">Limited students per class for individual attention</li>
                                    <li className="wow fadeInUp" data-wow-delay=".3s">Focused IIT-JEE & NEET coaching with a 100% Rank-oriented curriculum</li>
                                    <li className="wow fadeInUp" data-wow-delay=".4s">India’s top and highly qualified faculty for    IIT-JEE and NEET</li>
                                    <li className="wow fadeInUp" data-wow-delay=".5s">Get a scientifically designed strategy for all India top ranks</li>
                                </ul>
                            </div>
                            <div className="checklist">
                                <ul className="list-unstyled">
                                    <li className="wow fadeInUp" data-wow-delay=".6s">Exclusive study material customized for    IIT-JEE & NEET success</li>
                                    <li className="wow fadeInUp" data-wow-delay=".7s">Shortcut methods & smart problem-solving techniques</li>
                                    <li className="wow fadeInUp" data-wow-delay=".8s">Residential, Semi-Residential & Day-Scholar options</li>
                                    <li className="wow fadeInUp" data-wow-delay=".9s">Fully AC campus with high-security surveillance</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <span className="apply-stadum-shape wow fadeInRight" data-wow-delay=".3s"></span>
    </section>

    <div className="community-area space">
        <div className="container">


            <div className="community-wrap">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="title-area">
                            <span className="sub-title text-anim">INTERESTED IN JOINING WITH US?</span>
                            <h2 className="sec-title text-anim2 mb-55">
                                About Rankridge Junior College – Kukatpally & Hyderabad
                            </h2>
                            <div className="box-text-wrap mt-30 wow fadeInUp" data-wow-delay=".3s">
                                <p className="box-text">
                                    Rankridge Junior College is recognized among the best intermediate colleges in Hyderabad, especially for MPC and BiPC students aspiring for IIT-JEE, NEET and EAMCET. Located in KPHB / Kukatpally, Rankridge stands out from other inter colleges in Hyderabad with its integrated coaching model, expert faculty, small batches, personal mentoring and AI-based progress tracking. This proven system has positioned Rankridge among the top inter colleges and junior colleges in Hyderabad, helping thousands of students gain admission into IITs, NITs, AIIMS, Government Medical Colleges and top Engineering institutions.
                                </p>
                            </div>
                        </div>
                        <div className="btn-wrap wow fadeInUp" data-wow-delay=".4s">
                            <a href="" className="th-btn th-icon">Enquire Now</a>
                        </div>
                    </div>
                    <div className="contact-form-v1 col-lg-6 col-md-12">
                        <form action="" method="POST" className="contact-form ajax-contact">
                            <div className="row">
                                <div className="form-group style-border col-md-6">
                                    <input type="text" className="form-control" name="fristname" id="fristname3" placeholder="First name*" />
                                </div>

                                <div className="form-group style-border col-md-6">
                                    <input type="email" className="form-control" name="email" id="email3" placeholder="e-mail address*" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="number" className="form-control" name="number" id="number3" placeholder="Phone*" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="date" className="form-control" name="date" id="date3" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="text" className="form-control" name="country" id="country3" placeholder="Country*" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="text" className="form-control" name="city" id="city3" placeholder="City*" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="text" className="form-control" name="zipcode" id="zipcode3" placeholder="Zip Code*" />
                                </div>
                                <div className="form-group style-border col-md-6">
                                    <input type="text" className="form-control" name="address" id="address3" placeholder="Address*" />
                                </div>

                                <div className="form-group style-border col-12">
                                    <textarea name="message"
                                              id="message3"
                                              cols={30}
                                              rows={2}
                                              className="form-control"
                                              placeholder="Write your message*"></textarea>
                                </div>
                                <div className="form-btn col-12 mt-15"><button className="th-btn th-btn white-hover">Send Message</button></div>
                            </div>
                            <p className="form-messages mb-0 mt-3"></p>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    </div>
    </div>
  );
}