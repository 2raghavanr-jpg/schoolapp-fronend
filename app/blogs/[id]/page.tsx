import Image from "next/image";
import Link from "next/link";

async function getBlog(id: number) {
  const res = await fetch(
    `http://162.244.95.11:3000/api/blog/${id}`,
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

  if (!json?.data?.blog) return null;

  return {
    blog: json.data.blog,
    api_url: json.data.api_url,
    categories: json.data.category_count_list || [],
  };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const data = await getBlog(Number(id));

  if (!data) return {};

  const { blog } = data;
  console.log("faq",blog);
  return {
    title: blog?.meta_title || blog?.title,
    description: blog?.description,
    keywords:  blog?.title,

    alternates: {
      canonical: "/faq",
    },

    openGraph: {
      title: blog?.meta_title || blog?.title,
      description: blog?.description,
      type: "article",
    },
  };
}
export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getBlog(Number(id));

  if (!data) {
    return <div className="container py-5">Blog not found</div>;
  }

  const { blog, api_url, categories } = data;

  const date = new Date(blog.created_at);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const imageUrl =
    api_url && blog.image_path
      ? `${api_url.replace(/\/$/, "")}/uploads/blogs/${blog.image_path}`
      : "/assets/img/blog-default.jpg";

  return (
    <>
      {/* Breadcrumb */}
      <div
        className="breadcumb-wrapper position-relative"
        data-bg-src="/assets/img/shape/breadcrumb-shep.png"
      >
        <div className="breadcumb-banner">
          <img
            src="/assets/img/breadcrumb/breadcumb-banner.png"
            alt="bg-banner"
          />
        </div>

        <div className="container">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">{blog.title}</h1>

            <ul className="breadcumb-menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Blog Details</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blog Details */}
      <section className="th-blog-wrapper blog-details space-top space-extra2-bottom overflow-hidden">
        <div className="container">
          <div className="row gx-60">
            
            {/* Blog Content */}
            <div className="col-xl-8 col-lg-7">
              <div className="th-blog blog-single">

                {/* Blog Image */}
                <div className="blog-img">
                
                   <img
                    src={imageUrl}
                    alt={blog.title}
                  />
                </div>

                <div className="blog-content">

                  {/* Meta */}
                  <div className="blog-meta">
                    <span>
                      <i className="far fa-user"></i> by Rankridge Faculty
                    </span>

                    <span>
                      <i className="far fa-clock"></i> {day} {month}, {year}
                    </span>
                  </div>

                  {/* Blog Description */}
                  <div
                    className="fs-15"
                    dangerouslySetInnerHTML={{
                      __html: blog.description || "",
                    }}
                  />

                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-5">
              <aside className="sidebar-area">

                {/* Categories */}
                <div className="widget widget_categories">
                  <h3 className="widget_title">Category</h3>

                  <ul>
                    {categories.length > 0 ? (
                      categories.map((cat: any) => (
                        <li key={cat.id}>
                          <Link href={`/blogs/category/${cat.id}`}>
                            {cat.title}
                          </Link>
                          <span>({cat.blog_count})</span>
                        </li>
                      ))
                    ) : (
                      <li>No categories available</li>
                    )}
                  </ul>
                </div>

                {/* Recent Posts (Static for now) */}
                <div className="widget">
                  <h3 className="widget_title">Recent Posts</h3>

                  <div className="recent-post-wrap">

                    <div className="recent-post">
                      <div className="media-img">
                        <img
                          src="/assets/img/blog/recent-post-1-1.jpg"
                          alt="Blog"
                        />
                      </div>

                      <div className="media-body">
                        <h4 className="post-title">
                          <a className="text-inherit">
                            Trailblazers in Faculty Perspectives
                          </a>
                        </h4>

                        <div className="recent-post-meta">
                          <span>
                            <i className="far fa-calendar"></i> 26/6/2025
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Tags */}
                <div className="widget widget_tag_cloud">
                  <h3 className="widget_title">Popular Tags</h3>

                  <div className="tagcloud">
                    <Link href="#">Education</Link>
                    <Link href="#">University</Link>
                    <Link href="#">Book</Link>
                    <Link href="#">Campus</Link>
                    <Link href="#">Lecture</Link>
                    <Link href="#">Schedule</Link>
                    <Link href="#">Research</Link>
                    <Link href="#">Event</Link>
                    <Link href="#">Student</Link>
                    <Link href="#">Class</Link>
                  </div>
                </div>

              </aside>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}