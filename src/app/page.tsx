import FeaturedProducts from '@/components/featuredProducts';
import { Carousel } from '@/components/carouselProducts';

export default function Home() {
  return (
    <div className={'container flex flex-col min-h-screen'}>
      <FeaturedProducts />
      <Carousel className={'mt-4'} />
    </div>
  );
}
