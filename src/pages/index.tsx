import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import styles from '../styles/index.module.css';

interface Article {
  id: string;
  title: string;
  description?: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  url: string;
  image?: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`);

        const articlesWithId = response.data.results.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          description: article.abstract,
          content: article.abstract, // NYT API provides 'abstract' instead of full content
          author: article.byline,
          publishedAt: article.published_date,
          url: article.url,
          image: article.media?.[0]?.['media-metadata']?.[0]?.url, // Accessing the first multimedia element for image
        }));

        setArticles(articlesWithId);
      } catch (error) {
        console.error('Erro ao buscar as principais manchetes:', error);
      }
    };

    fetchArticles();
  }, [apiKey]);

  return (
    <div className={styles.container}>
      <h1>Principais Notícias</h1>
      <div className={styles.newsGrid}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))
        ) : (
          <p>Nenhuma notícia encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
