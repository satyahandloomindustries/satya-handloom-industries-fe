import useProductAdmin from '@/store/useProductAdmin';
import { useEffect } from 'react';

const useInitApp = () => {
  const { setAllCategories } = useProductAdmin();

  useEffect(() => {
    const worker = new Worker(
      new URL('@/workers/category.worker.js', import.meta.url)
    );
    worker.onmessage = (event) => {
      const { success, data } = event.data;
      if (success) {
        setAllCategories(data?.categories, data?.mainCategories);
      }
      worker.terminate();
    };

    worker.postMessage({ url: 'api/categories' });

    return () => worker.terminate();
  }, []);
};

export default useInitApp;
