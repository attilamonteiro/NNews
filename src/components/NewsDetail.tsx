import React from 'react';
import styles from '../styles/newsDetails.module.css';

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

const NewsDetails: React.FC<{ article: Article | null }> = ({ article }) => {
  // Log to verify if the article prop is received correctly
  console.log('Article prop in NewsDetails:', article);

  if (!article) {
    return <div>Nenhuma notícia encontrada.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className={styles['news-details']}>
      <h1>{article.title}</h1>
      {article.author && <p className={styles.author}>Autor: {article.author}</p>}
      {article.publishedAt && <p className={styles['published-at']}>Data de Publicação: {formatDate(article.publishedAt)}</p>}
      <div className={styles.content}>{article.content}</div>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Leia mais
      </a>
    </div>
  );
};

export default NewsDetails;
