"use client"; // Required at the top of your file
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Import Swiper styles (these are scoped to the component)
import 'swiper/css';
import EnquiryForm from "./components/EnquiryForm";

async function getPage(slug: string) {
  const res = await fetch(
    `{}api/p/${slug}`,
    {
      cache: "no-store",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) return null;

  const json = await res.json();

  return {
    page: json?.data?.pages?.[0],
    api_url: json?.data?.api_url,
    
  };
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getPage('home');

  if (!data) return {};

  const { page } = data;

  return {
    title: page?.meta_title || page?.title,
    description: page?.meta_description,
    keywords: page?.meta_keyword,

    alternates: {
      canonical: `/p/${slug}`,
    },

    openGraph: {
      title: page?.meta_title || page?.title,
      description: page?.meta_description,
      type: "article",
    },
  };
}

function getFirstWords(html, wordLimit = 30) {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '');

  // Split into words and limit
  const words = text.split(/\s+/).slice(0, wordLimit).join(' ');

  return words + '...';
}
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

    type Achievement = {
        id:number;
        image_path:string;
    }

    type Trackrecord = {
        title:string;
    }

    type Choosus = {

    }

    type Course = {
        id:number;
        title:string;
        description:string;
        image_path:string;
        slug:string;
    }

    type HomeData = {
        api_url: string;
        banners: Banner[];
        milestones: Milestone[];
        coachings:Coaching[];
        history:History[];
        achievements:Achievement[];
        trackrecord : Trackrecord[];
        choosus:Choosus[];
        courses:Course[];
    };
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads/api/home.json`)
        .then((res) => res.json())
        .then((data) => setHomeData(data.data))
        .catch((err) => console.error(err));
    }, []);

  if (!homeData) return <div>Loading...</div>;
  return (
    <div>
     {/* <div className="th-hero-wrapper hero-1" id="hero">
            
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
     */}
<div className="th-hero-wrapper hero-1" id="hero" style={{ overflow: 'hidden' }}>
    <div className="container-fluid p-0"> {/* Use fluid and remove padding */}
        {homeData && (
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 6000 }}
                loop={true}
                className="heroCarousel"
                slidesPerView={1}
                centeredSlides={true}
            >
                {homeData.banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="hero-inner">
                            <img
                                src={`${homeData.api_url}uploads/banners/${banner.image_path}`}
                                className="hero-img"
                                alt={banner.title}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
    </div>
</div>

    <div className="feature-sec-1 position-relative overflow-hidden space">

        <div className="container text-center">
            <h2 className="hero-title ">
                {homeData.getPageTitle['section_one_heading'] ? homeData.getPageTitle['section_one_heading']: "Top Intermediate Colleges in Hyderabad for IIT-JEE & NEET Coaching"}
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
                       { homeData && (
                        <div className="about-content ms-xxl-4 ps-xxl-2 ms-xl-2">
                             {homeData.trackrecord.map((item) => (
                                <div key={item.title}>
                            <div className="title-area">
                                <span className="sub-title text-anim">Our Track Record That Speaks for Itself</span>
                                <h2 className="sec-title text-anim2">
                                     {item.title}
                                </h2>
                                <p className="sec-text mt-25 mb-0 wow fadeInUp" data-wow-delay=".2s">
                                    {item.description}
                                </p>
                                
                            </div>
                            <div className="about-feature-box">
                                <div className="about-feature wow fadeInUp" data-wow-delay=".3s">
                                    <span className="box-icon">
                                        <img src={`${homeData.api_url}uploads/track-records/${item.option_1_image_path}`} className="filter-lightseagreen" alt="icon" />
                                    </span>
                                    <div className="box-content">
                                        <h3 className="box-title"> {item.option_1_title}</h3>
                                        <p className="box-text">
                                           {item.option_1_description}
                                        </p>
                                    </div>
                                </div>
                                <div className="about-feature wow fadeInUp" data-wow-delay=".4s">
                                    <span className="box-icon">
                                        <img src={`${homeData.api_url}uploads/track-records/${item.option_2_image_path}`} className="filter-lightseagreen" alt="icon" />
                                    </span>
                                    <div className="box-content">
                                        <h3 className="box-title">{item.option_2_title}</h3>
                                        <p className="box-text">
                                            {item.option_2_description}
                                        </p>
                                    </div>
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
                        <h2 className="sec-title text-anim2">
                            {homeData.getPageTitle['rankridge_history'] ? homeData.getPageTitle['section_one_heading']: "Top Intermediate Colleges in Hyderabad for IIT-JEE & NEET Coaching"}
                        </h2>
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
        {homeData && (
        <div className="container">
             {homeData.choosus.map((item,index) => (
            <div key={item.id ?? index} >
            <div className="row gy-4">
                <div className="col-xl-8">
                    <div className="title-area text-center text-lg-start">
                        <span className="sub-title text-anim">WHY CHOOSEUS</span>
                        <h2 className="sec-title text-anim2">
                            {item.title}
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
                                                {item.option_1_title}
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            {item.option_1_description}
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
                                                {item.option_2_title}
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                           {item.option_2_description}
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
                                                {item.option_3_title}
                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                           {item.option_3_description}
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
                                                {item.option_4_title}

                                            </a>
                                        </h3>
                                    </div>
                                    <div className="box-text-wrap">
                                        <p className="box-text">
                                            {item.option_4_description}
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
                                <a href="https://www.youtube.com/watch?v={title.youtube_id}&t=1s" className="play-btn popup-video">
                                    <i className="fa-sharp fa-solid fa-play"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
             ))}
        </div>
        )}
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
        {homeData && (
  <div className="row gy-5 justify-content-center">
    {homeData.courses.map((item, index) => (
      <div key={item.id ?? index} className="col-xl-4 col-lg-6">
        <div className="campus-card wow fadeInLeft" data-wow-delay=".2s">
          <div className="campus-img global-img">
            <a href="" className="d-block position-relative">
              <img
                src={`${homeData.api_url}uploads/courses/${item.image_path}`}
                alt={item.title}
                className="img-1"
              />
            </a>
          </div>

          <div className="campus-content">
            <h3 className="box-title">
              <a href="">{item.title}</a>
            </h3>

            <p className="box-text">
              {getFirstWords(item.description, 30)}
            </p>

            <a href={`/course/${item.slug}`} className="th-btn style-border1 th-icon">
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
    </section>
<div className="story-area-1 overflow-hidden space">
        <div className="container">
          <div className="title-area text-center text-lg-start">
            <span className="sub-title">Achievements</span>
            <h2 className="sec-title">{homeData.getPageTitle['out_standing'] ? homeData.getPageTitle['out_standing']: "Outstanding Achievements — Rankers Who Made Us Proud"}</h2>
          </div>
        </div>

        <div className="container-fluid px-lg-5">
            { homeData && (
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
            
            {homeData.achievements.map((achievement, index) => (
                <SwiperSlide key={achievement.id}>
                <div className="story-card shadow-sm border-0">
                  <div className="box-img">
                    <img src={`${homeData.api_url}uploads/achievements/${achievement.image_path}`} alt={`Achievement ${achievement.title}`} className="w-100 rounded-3" />
                  </div>
                </div>
              </SwiperSlide>
                
            ))}
          </Swiper>
            )}
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
                <div className="col-md-5">
                    <div className="faq-imgbox wow fadeInLeft" data-wow-delay=".3s">
                        <div className="img1">
                            <img src="assets/img/college1.jpg" alt="About" />
                        </div>

                    </div>
                </div>
                <div className="col-md-7">
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
                                    {[...homeData.faqs].reverse().map((faq, index) => (
                                        <div className="accordion-card wow fadeInUp" data-wow-delay={`.${index + 1}s`} key={faq.id}>
                                            <div className="accordion-header" id={`collapse-item-${faq.id}`}>
                                                <button className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#collapse-${faq.id}`}
                                                        aria-expanded="false"
                                                        aria-controls={`collapse-${faq.id}`}>
                                                    {faq.id}. {faq.title}
                                                </button>
                                            </div>
                                            <div id={`collapse-${faq.id}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`collapse-item-${faq.id}`}
                                                data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p className="faq-text">
                                                        {faq.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
))}


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
                         
                            {homeData.page.map((item, index) => (
                            <div
                                key={index}
                                className="checklist"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            ></div>
                            ))}
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
                                {homeData.getPageTitle['joining_with_us'] ? homeData.getPageTitle['joining_with_us']: "Join the Rankridge Community and Transform Your Child’s Future Today!"}
                            </h2>
                            
                            <div className="box-text-wrap mt-30 wow fadeInUp" data-wow-delay=".3s">
                                 {homeData.page.map((item, index) => (
                                 <p
                                key={index}
                                className="box-text"
                                dangerouslySetInnerHTML={{ __html: item.short_description }}
                            ></p>
                                ))}
                            </div>
                        </div>
                        <div className="btn-wrap wow fadeInUp" data-wow-delay=".4s">
                            <a href="" className="th-btn th-icon">{homeData.getPageTitle['joining_with_us_button'] ? homeData.getPageTitle['joining_with_us_button']: "Enquire Now"}</a>
                        </div>
                    </div>
                    <div className="contact-form-v1 col-lg-6 col-md-12">
                       <EnquiryForm/>
                    </div>

                </div>

            </div>
        </div>
    </div>
    </div>
  );
}