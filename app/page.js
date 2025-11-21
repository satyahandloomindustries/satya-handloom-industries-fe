'use client';
import AnimatedTitle from '@/components/AnimatedTitle';
import CarouselHomepage from '@/components/CarouselHomepage';
import ContactUsFooter from '@/components/ContactUsFooter';
import MultiRenderer from '@/components/MultiRenderer';
import ProductCarousel from '@/components/ProductCarousel';
import TwoLiner from '@/components/TwoLiner';
import DeleteIcon from '@mui/icons-material/Delete';

const twoLiner = [
  {
    label: 'Free shipping',
    value: 'Free shipping all order',
    Icon: DeleteIcon,
  },
  {
    label: 'Support 24/7',
    value: 'Support 24 hours a day',
    Icon: DeleteIcon,
  },
  {
    label: 'Money Return',
    value: '30 days for free return',
    Icon: DeleteIcon,
  },
  {
    label: '100% Payment Secure',
    value: 'We ensure secure payment',
    Icon: DeleteIcon,
  },
];
export default function Home() {
  return (
    <div>
      <CarouselHomepage />
      <div className="px-16">
        <MultiRenderer
          rendererSet={twoLiner}
          Component={TwoLiner}
          mainClassName="grid grid-cols-[repeat(4,1fr)] py-20"
        />
        <hr className="border-t-1 border-gray-300" />
      </div>
      <AnimatedTitle
        title="Related Products"
        subTitle="Add or suggest products"
      />
      <ProductCarousel />
      <ContactUsFooter />
    </div>
  );
}
