import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCardClick = () => {
    router.push(`/news/${article.id}`);
  };

  return (
    <div className={styles['news-card']} onClick={handleCardClick}>
      <h2>{article.title}</h2>
      {article.image && (
        <Image
          src={article.image}
          alt={article.title}
          width={150}
          height={150}
        />
      )}
      {article.description && <p>{article.description}</p>}
      {article.author && <p>Autor: {article.author}</p>}
      {article.publishedAt && <p>Publicado em: {formatDate(article.publishedAt)}</p>}
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Leia mais
      </a>
    </div>
  );
};

export default NewsCard;
