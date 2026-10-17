'use client';

import PaginationFooter from '@/components/PaginationFooter';
import useShop from '@/store/useShop';

const PaginationShop = () => {
  const { page, totalPages, customShopSet, catalogLoading } = useShop();

  if (catalogLoading) return null;

  return (
    <PaginationFooter
      page={page}
      totalPages={totalPages}
      setPage={(page) => customShopSet({ page })}
    />
  );
};

export default PaginationShop;
