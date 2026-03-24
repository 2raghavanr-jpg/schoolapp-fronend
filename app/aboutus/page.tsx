import EnquiryForm from "../components/EnquiryForm";

async function getAbout() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/aboutus`,
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
    chooseus: json?.data?.choosus?.[0],
    api_url: json?.data?.api_url,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getAbout();

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

export default async function AboutPage() {

  const data = await getAbout();

  if (!data) {
    return <div className="container py-5">No data found</div>;
  }

  const { page, chooseus, api_url } = data;

  return (
    <>
      {/* Breadcrumb */}
       <div class="breadcumb-wrapper position-relative" data-bg-src="assets/img/shape/breadcrumb-shep.png">
        <div class="breadcumb-banner"><img src="assets/img/breadcrumb/breadcumb-banner.png" alt="bg-banner" /></div>

        <div class="container">
            <div class="row">
                <div class="col-xxl-5">
                    <div class="breadcumb-content">
                        <h1 class="breadcumb-title">About Us</h1>
                        <ul class="breadcumb-menu">
                            <li><a href="/">Home</a></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

      {/* About Section */}
      <div className="about1-area space">
        <div className="container">

          <div className="row align-items-center">

            {/* Content */}
            <div className="col-xl-5">
              <div className="about-content">

                <div className="title-area">

                  <h2 className="sec-title">
                    {page?.title}
                  </h2>

                  <div
                    className="sec-text mt-25"
                    dangerouslySetInnerHTML={{
                      __html: page?.description,
                    }}
                  />

                </div>

              </div>
            </div>

            {/* Image */}
            <div className="col-xl-7">
              <div className="img-box4">

                <img
                  src={`${api_url}uploads/pages/${page?.image_path}`}
                  alt={page?.title}
                />
                <div className="counter-card3 wow fadeInUp" data-wow-delay=".3s">
                                    <h3 className="box-number text-white">
                                        <span className="counter-number">280</span> k+
                                    </h3>
                                    <p className="box-text text-white">World-wide Happy Students</p>
                                </div>
              </div>
                 
            </div>

          </div>

        </div>
      </div>

      {/* Why Choose Us */}
        <section class="community-area-2 overflow-hidden position-relative" id="community-sec">
        <div class="container">
            <div class="space">
                <div class="title-area text-center text-xl-start">
                    <span class="sub-title text-anim">Choose Us</span>
                    <h2 class="sec-title text-anim2">
                         {chooseus?.title}
                    </h2>
                    <p class="mt-25 wow fadeInUp" data-wow-delay=".3s">
                       {chooseus?.description}
                    </p>
                </div>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="community-wrap2">
                            <div class="community-card2 wow fadeInUp" data-wow-delay=".2s">

                                <div class="card-content">
                                        <h3 class="box-title">{chooseus?.option_1_title}</h3>
                                        <p class="box-text">{chooseus?.option_1_description}</p>
                                    </div>
                            </div>
                            <div class="community-card2 wow fadeInUp" data-wow-delay=".4s">

                                <div class="card-content">
                                     <h3 class="box-title">{chooseus?.option_2_title}</h3>
                                        <p class="box-text">{chooseus?.option_2_description}</p>
                                </div>
                            </div>
                            <div class="community-card2 wow fadeInUp" data-wow-delay=".6s">

                                <div class="card-content">
                                     <h3 class="box-title">{chooseus?.option_3_title}</h3>
                                        <p class="box-text">{chooseus?.option_3_description}</p>
                                </div>
                            </div>
                            <div class="community-card2 wow fadeInUp" data-wow-delay=".8s">

                                <div class="card-content">
                                     <h3 class="box-title">{chooseus?.option_4_title}</h3>
                                        <p class="box-text">{chooseus?.option_4_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                                               <EnquiryForm/>
                        
                    </div>
                </div>
            </div>

        </div>
        <div class="community-shape1 shape-mockup jump d-none d-xxl-block" data-left="0%" data-bottom="0%">
            <img src="assets/img/shape/communiti-3-1.png" alt="Stadum" />
        </div>
    </section>
    </>
  );
}