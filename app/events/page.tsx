async function getEvents() {

  const res = await fetch(
    "http://162.244.95.11:3000/api/events",
    {
      cache: "no-store",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
        "Content-Type": "application/json"
      }
    }
  );

  if (!res.ok) return null;

  const json = await res.json();

  return {
    events: json?.data?.event_lists || [],
    api_url: json?.data?.api_url || ""
  };
}

export default async function Events() {

  const data = await getEvents();

  const events = data?.events || [];
  const apiUrl = data?.api_url || "";

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="breadcumb-wrapper position-relative"
        data-bg-src="/assets/img/shape/breadcrumb-shep.png"
      >
        <div className="breadcumb-banner">
          <img src="/assets/img/breadcrumb/breadcumb-banner.png" alt="bg-banner" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xxl-5">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Events</h1>

                <ul className="breadcumb-menu">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Events</li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <section className="space">
        <div className="container">

          <div className="row gx-30 gy-30">

            {events.map((event: any) => (

              <div key={event.id} className="col-lg-4 col-md-6">

                <article className="event-card program-card">

                  <div className="event-img">

                    <img
                      src={`${apiUrl}uploads/events/${event.image_path}`}
                      alt={event.title}
                    />

                  </div>

                  <div className="event-overlay">

                    <h3 className="box-title">
                      {event.title}
                    </h3>

                    <div className="event-meta">
                      {new Date(event.created_at).toLocaleDateString()}
                    </div>

                  </div>

                </article>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* Admission Banner */}
      <section className="scholar-area scholar-style position-relative space-top overflow-hidden">

        <div className="container">

          <div className="row gy-60 justify-content-center">

            <div className="col-xl-6">

              <div className="scholar-content z-index-common ms-xxl-4 ps-xxl-2 ms-xl-2">

                <div className="title-area text-center text-lg-start">

                  <span className="sub-title text-anim">
                    Admissions Open
                  </span>

                  <h2 className="sec-title text-anim2">
                    Start Your Admission Journey
                  </h2>

                  <p className="sec-text mt-25">
                    Take the first step toward a successful future. Our admissions process
                    is designed to guide you smoothly from application to enrollment.
                  </p>

                </div>

                <div className="btn-wrap">

                  <a href="/contactus" className="th-btn th-icon">
                    Admission Enquiry
                  </a>

                </div>

              </div>

            </div>

            <div className="col-xl-6">

              <div className="scholar-imgbox">

                <img src="/assets/img/scholar-1-1.png" alt="image" />

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}