import { useEffect, useState } from "react";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://gnews.io/api/v4/search?q=disaster&lang=en&country=in&max=10&apikey=8bf18c242cc9bbe292bbceb6d0214235"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        return response.json();
      })
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        } else {
          setError("No news articles found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load news.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        📰 Latest Disaster News
      </h1>

      {loading && (
        <h2 className="text-xl">Loading latest disaster news...</h2>
      )}

      {error && (
        <h2 className="text-red-600 text-xl">{error}</h2>
      )}

      {!loading &&
        !error &&
        news.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 mb-6"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2">
              {item.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {item.description}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Source: {item.source?.name}
            </p>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Read Full Article →
            </a>
          </div>
        ))}
    </div>
  );
}

export default NewsPage;