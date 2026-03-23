import CategoryClient from "./CategoryClient";

async function getCategory(id: string) {

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

  return {
    category: json?.data?.category || null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const data = await getCategory(Number(id));

  if (!data || !data.category.length) return {};

  const categoryName = data.category[0]?.category_title || "Blog Category";

  return {
    title: `${categoryName} Blogs | Rankridge Junior College`,
    description: `Read the latest ${categoryName} blogs, tips and insights from Rankridge experts.`,
    keywords: `${categoryName}, Rankridge blogs, study tips, education blogs`,

    alternates: {
      canonical: `/blogs/category/${id}`,
    },

    openGraph: {
      title: `${categoryName} Blogs | Rankridge`,
      description: `Explore ${categoryName} articles from Rankridge faculty.`,
      type: "website",
      url: `/blogs/category/${id}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return <CategoryClient id={id} />;
}