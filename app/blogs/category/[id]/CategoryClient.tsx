import Image from "next/image";
import Link from "next/link";

async function getBlogs(id: number) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog-category/${id}`,
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

  if (!json?.data?.blogs) return null;

  return {
    blogs: json.data.blogs,
    api_url: json.data.api_url,
    categories: json.data.category_count_list || [],
  };
}

export default async function CategoryClient({
  id,
}: {
  id: string;
}) {

  const data = await getBlogs(Number(id));

  if (!data) {
    return <div className="container py-5">No blogs found</div>;
  }

  const { blogs, api_url, categories } = data;

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcumb-wrapper position-relative">

        <div className="breadcumb-banner">
          <img
            src="/assets/img/breadcrumb/breadcumb-banner.png"
            alt="bg-banner"
          />
        </div>

        <div className="container">
          <div className="breadcumb-content">

            <h1 className="breadcumb-title">
              Blog Category
            </h1>

            <ul className="breadcumb-menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Blogs</li>
            </ul>

          </div>
        </div>

      </div>

      {/* Blog Section */}
      <section className="th-blog-wrapper space-top space-extra2-bottom overflow-hidden">

        <div className="container">

          <div className="row gx-60">

            {/* Blog Cards */}
            <div className="col-xl-8 col-lg-7">

              <div className="row">

                {blogs.map((blog: any) => {

                  const date = new Date(blog.created_at);

                  const day = date.getDate();

                  const month = date.toLocaleString("default", {
                    month: "short",
                  });

                  const year = date.getFullYear();

                  const imageUrl =
                    api_url && blog.image_path
                      ? `${api_url.replace(/\/$/, "")}/uploads/blogs/${blog.image_path}`
                      : "/assets/img/blog-default.jpg";

                  return (

                    <div
                      className="col-lg-6"
                      key={blog.id}
                    >

                      <div className="blog-card">

                        {/* Blog Image */}
                        <div className="blog-img position-relative">

                          <Link href={`/blogs/${blog.id}`}>

                            <div className="blog-img-box position-relative overflow-hidden">

                            
                             <img
                                src={imageUrl}
                                alt={blog.title}
                              />
                            </div>

                          </Link>

                          {/* Date */}
                          <div className="blog-date">

                            <h5 className="blog-date-title">
                              {day}
                            </h5>

                            <p className="blog-date-text">
                              {month}, {year}
                            </p>

                          </div>

                        </div>

                        {/* Blog Content */}
                        <div className="blog-content">

                          <div className="blog-meta">

                            <span className="author-icon">
                              <img
                                src="/assets/img/blog/author.png"
                                alt="author"
                              />
                            </span>

                            By Rankridge Faculty

                          </div>

                          <h3 className="box-title">

                            <Link href={`/blogs/${blog.id}`}>
                              {blog.title}
                            </Link>

                          </h3>

                          <p className="box-text">
                            {(blog.description || "")
                              .replace(/<[^>]+>/g, "")
                              .slice(0, 120)}...
                          </p>

                          <div className="btn-wrap">

                            <Link
                              href={`/blogs/${blog.id}`}
                              className="th-btn style-border1 th-icon"
                            >
                              Read More
                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

            {/* Sidebar Categories */}
            <div className="col-xl-4 col-lg-5">

              <aside className="sidebar-area">

                <div className="widget widget_categories">

                  <h3 className="widget_title">
                    Category
                  </h3>

                  <ul>

                    {categories.map((cat: any) => (

                      <li key={cat.id}>

                        <Link href={`/blogs/category/${cat.id}`}>
                          {cat.title}
                        </Link>

                        <span>
                          ({cat.blog_count})
                        </span>

                      </li>

                    ))}

                  </ul>

                </div>

              </aside>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}