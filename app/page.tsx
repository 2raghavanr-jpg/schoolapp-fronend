import HomeClient from "./HomeClient";
async function getPage(slug: string) {
  const res = await fetch(
   `http://162.244.95.11:3000/api/p/${slug}`,
    {
      cache: "no-store",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJtb2JpbGUiLCJpYXQiOjE3NzMxNjcyNzAsImV4cCI6MjA4ODc0MzI3MH0.27yZUaRbksB2O-nFQuz_AxoRpqxaFZA1HqpwOn8Zpr8",
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();

  return {
    page: json?.data?.pages?.[0],
  };
}

export async function generateMetadata() {

  const data = await getPage("home");

  if (!data) return {};

  const { page } = data;

  return {
    title: page?.meta_title || page?.title,
    description: page?.meta_description,
    keywords: page?.meta_keyword,
  };
}

export default function Page() {
  return <HomeClient />;
}