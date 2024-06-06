import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import NewsDetails from '../../components/NewsDetail';

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

interface NewsDetailsProps {
  article: Article | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const NewsDetailPage: React.FC<NewsDetailsProps> = ({ article }) => {
  // Log to verify if the article prop is received correctly
  console.log('Article prop in NewsDetailPage:', article);

  return (
    <div>
      {article ? (
        <NewsDetails article={article} />
      ) : (
        <div>Nenhuma notícia encontrada.</div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { id } = params as Params;
    const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;
    const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`);
    const article = response.data.results.find((item: any, index: number) => index.toString() === id);

    // Log the API response and the selected article
    console.log('API response:', response.data);
    console.log('Selected article:', article);

    // Ensure article is defined and not null
    if (!article) {
      return { props: { article: null } };
    }

    const articleWithId: Article = {
      id: id,
      title: article.title,
      description: article.abstract,
      content: article.abstract, // NYT API provides 'abstract' instead of full content
      author: article.byline,
      publishedAt: article.published_date,
      url: article.url,
      image: article.media?.[0]?.['media-metadata']?.[0]?.url, // Accessing the first multimedia element for image
    };

    return { props: { article: articleWithId } };
  } catch (error) {
    console.error('Erro ao buscar detalhes da notícia:', error);
    return { props: { article: null } };
  }
};

export default NewsDetailPage;
