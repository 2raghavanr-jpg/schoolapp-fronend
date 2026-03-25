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

  if (!data) {
    return <div className="container py-5">Course not found</div>;
  }

  const { course, subCourses, api_url } = data;

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcumb-wrapper position-relative">
        <div className="container">

          <h1 className="breadcumb-title">{course.title}</h1>

          <ul className="breadcumb-menu">
            <li><a href="/">Home</a></li>
            <li><a href="/course">Academic Programs</a></li>
            <li>{course.title}</li>
          </ul>

        </div>
      </div>

      {/* Course Intro */}
      <section className="space">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <img
                src={`${api_url}uploads/courses/${course.image_path}`}
                alt={course.title}
                style={{ width: "100%" }}
              />

            </div>

            <div className="col-lg-6">

              <span className="sub-title">{course.title}</span>

              <div
                dangerouslySetInnerHTML={{
                  __html: course.description
                }}
              />

            </div>

          </div>

        </div>
      </section>

      {/* Coaching Techniques */}
      <section className="space">
        <div className="container">

          <h2 className="text-center">{course.sub_title}</h2>

          <div className="row">

            {subCourses.map((item: any) => (
              <div key={item.id} className="col-lg-3 col-md-6">

                <div className="program-card">

                  <img
                    src={`${api_url}uploads/coaching-techniques/${item.image_path}`}
                    alt={item.title}
                  />

                  <h4>{item.title}</h4>

                  <p>{item.description}</p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Second Description */}
      <section className=" overflow-hidden position-relative" id="community-sec">
        <div className="container">
            <div className="space">
                <div className="title-area text-center text-xl-start">
                    <span className="sub-title text-anim">{course.title} junior college in Hyderabad</span>
                    <h2 className="sec-title text-anim2">
                        {course.title} at Rankridge College
                    </h2>

                </div>
                <div className="row">
                    <div className="col-xl-6">

          <div
            dangerouslySetInnerHTML={{
              __html: course.second_description
            }}
          />

        </div>
       
                    <div className="col-xl-6">
                        <EnquiryForm/>
                    </div>
                </div>
            </div>
            </div>
    </section>
      <section className="scholar-area scholar-style position-relative space-top overflow-hidden">
        <div className="container">
            <div className="row gy-60 justify-content-center">
                <div className="col-xl-6">
                    <div className="scholar-content z-index-common ms-xxl-4 ps-xxl-2 ms-xl-2">
                        <div className="title-area text-center text-lg-start">
                            <span className="sub-title text-anim">Admissions Open</span>
                            <h2 className="sec-title text-anim2">Start Your Admission Journey</h2>
                            <p className="sec-text mt-25 wow fadeInUp" data-wow-delay=".3s">
                                Take the first step toward a successful future. Our admissions process
                                is designed to guide you smoothly from application to enrollment,
                                ensuring you have all the support you need to succeed.
                            </p>
                        </div>
                        <div className="btn-wrap wow fadeInUp justify-content-center justify-content-lg-start"
                             data-wow-delay=".4s">
                            <a href="contactus.html" className="th-btn th-icon">Admission Enquiry</a>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6">
                    <div className="scholar-right">
                        <div className="scholar-imgbox ms-xl-5 wow fadeInUp" data-wow-delay=".5s">
                            <img src="assets/img/scholar-1-1.png" alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="about-shep-2 shape-mockup d-none d-xxl-block" data-top="0%" data-left="0%">
            <img src="assets/img/shape/shape-3.png" alt="shape" />
        </div>
        <div className="about-shep-2 shape-mockup d-none d-xxl-block" data-bottom="4%" data-left="0%">
            <img src="assets/img/shape/shape-4.png" alt="shape" />
        </div>
    </section>
    </>
  );
}