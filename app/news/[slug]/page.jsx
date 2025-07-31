import { getNewsById } from "@/app/api/dogs";

async function NewsArticlePage({ params }) {
  const article = await getNewsById(parseInt(params.slug));
  if (!article) {
    return <div>Article not found</div>;
  }
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </div>
  );
}

export default NewsArticlePage;