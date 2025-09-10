import Header from './components/Header';
import Hero from './components/Hero';
import PromoBar from './components/PromoBar';
import Categories from './components/Categories';
import NewArrivals from './components/NewArrivals';
import Bestsellers from './components/Bestsellers';

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Вариант 1 для каждого блока */}
      <PromoBar variant={1} />
      <Header variant={1} />
      <Hero variant={1} />
      <Categories variant={1} />
      <NewArrivals variant={1} />
      <Bestsellers variant={1} />
      
      {/* Вариант 2 для каждого блока */}
      <div className="mt-16">
        <PromoBar variant={2} />
        <Header variant={2} />
        <Hero variant={2} />
        <Categories variant={2} />
        <NewArrivals variant={2} />
        <Bestsellers variant={2} />
      </div>
      
      {/* Вариант 3 для каждого блока */}
      <div className="mt-16">
        <PromoBar variant={3} />
        <Header variant={3} />
        <Hero variant={3} />
        <Categories variant={3} />
        <NewArrivals variant={3} />
        <Bestsellers variant={3} />
      </div>
    </div>
  );
}