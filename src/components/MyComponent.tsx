// src/components/MyComponent.tsx

import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Este código só será executado no lado do cliente
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>Conteúdo renderizado no lado do cliente</div>
      ) : (
        <div>Conteúdo renderizado no lado do servidor</div>
      )}
    </div>
  );
};

export default MyComponent;
