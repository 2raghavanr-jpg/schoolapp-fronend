async function getPage(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/p/${slug}`,
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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getPage(slug);

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
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const data = await getPage(slug);

  if (!data) {
    return <div className="container py-5">Page not found</div>;
  }

  const { page, api_url } = data;

  return (
    <>
      {/* Breadcrumb */}
      
      <div className="breadcumb-wrapper position-relative">
        <div className="container">
          <h1 className="breadcumb-title">{page?.title}</h1>

          <ul className="breadcumb-menu">
            <li><a href="/">Home</a></li>
            <li>{page?.title}</li>
          </ul>
        </div>
      </div>

      {/* Page Content */}
      <div className="container space">

        <h2 className="sec-title mb-4">
          {page?.title}
        </h2>

        {/* Description */}
        <div
          className="page-content"
          dangerouslySetInnerHTML={{
            __html: page?.description || "",
          }}
        />

      </div>
    </>
  );
}