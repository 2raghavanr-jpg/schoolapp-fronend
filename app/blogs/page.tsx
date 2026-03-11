async function getBlogs() {

  const res = await fetch(
    "http://162.244.95.11:3000/api/blogs",
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
    blogs: json?.data?.blog_lists || [],
    apiUrl: json?.data?.api_url || ""
  };
}

export default async function Blogs() {

  const data = await getBlogs();

  const blogs = data?.blogs || [];
  const apiUrl = data?.apiUrl || "";

  return (
    <>
      <section className="blog-area-1 overflow-hidden space" id="blog-sec">
        <div className="container">

          <div className="row gy-4">

            {blogs.map((blog: any) => {

              const date = new Date(blog.created_at);
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "short" });
              const year = date.getFullYear();

              return (

                <div key={blog.id} className="col-lg-4">

                  <div className="blog-card wow fadeInUp">

                    <div className="blog-img position-relative">

                      <a href={`/blogs/${blog.id}`}>

                        <div className="blog-img-box position-relative overflow-hidden">

                          <img
                            src={`${apiUrl}uploads/blogs/${blog.image_path}`}
                            alt={blog.title}
                          />

                          <img
                            src={`${apiUrl}uploads/blogs/${blog.image_path}`}
                            alt={blog.title}
                          />

                        </div>

                      </a>

                      <div className="blog-date">
                        <h5 className="blog-date-title">{day}</h5>
                        <p className="blog-date-text">{month}, {year}</p>
                      </div>

                    </div>

                    <div className="blog-content">

                      <div className="blog-meta">
                        <span className="author-icon">
                          <img src="/assets/img/blog/author.png" alt="img" />
                        </span>
                        By Rankridge Faculty
                      </div>

                      <h3 className="box-title">

                        <a href={`/blogs/${blog.id}`}>
                          {blog.title}
                        </a>

                      </h3>

                      <p className="box-text">
                        {blog.description.split(" ").slice(0, 30).join(" ")}...
                      </p>

                      <div className="btn-wrap">

                        <a
                          href={`/blogs/${blog.id}`}
                          className="th-btn style-border1 th-icon"
                        >
                          Read More
                        </a>

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>
      </section>
    </>
  );
}