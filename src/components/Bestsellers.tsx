import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Heart, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import ContactModal from './ContactModal';
import ProductDetailModal from './ProductDetailModal';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  rank: number;
  tag: string;
  isNew?: boolean;
}

export default function Bestsellers({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const bestsellers: Product[] = [
    {
      id: 1,
      name: "Платье-миди Элеганс",
      rating: 4.9,
      reviews: 127,
      image: "/src/assets/images/image-1.jpg",
      category: "Платья",
      rank: 1,
      tag: "ХИТ №1"
    },
    {
      id: 2,
      name: "Блузка шелковая Софи",
      rating: 4.8,
      reviews: 89,
      image: "/src/assets/images/image-2.jpg",
      category: "Блузки",
      rank: 2,
      tag: "ХИТ №2"
    },
    {
      id: 3,
      name: "Комплект Диана",
      rating: 4.9,
      reviews: 156,
      image: "/src/assets/images/image-3.jpg",
      category: "Аксессуары",
      rank: 3,
      tag: "ХИТ №3"
    },
    {
      id: 4,
      name: "Пальто классика Верона",
      rating: 4.7,
      reviews: 73,
      image: "/src/assets/images/image-4.jpg",
      category: "Одежда",
      rank: 4,
      tag: "ХИТ №4"
    }
  ];

  if (variant === 1) {
    // Подиумная раскладка с рейтингом
    return (
      <section className="py-16 px-4 bg-[#4B2B26] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-[#D4AF37]" />
              <h2 className="text-3xl md:text-4xl font-bold">Хиты продаж</h2>
              <TrendingUp className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <p className="text-lg text-white/80">
              Самые популярные модели этого месяца
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((item) => (
              <div 
                key={item.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Номер хита */}
                <div className="absolute -top-3 -left-3 z-10 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-lg">
                  #{item.rank}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#D4AF37] text-black px-2 py-1 rounded text-xs font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'bg-opacity-40' : 'bg-opacity-0'
                    }`}>
                      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setSelectedProduct(item);
                              setIsProductDetailOpen(true);
                            }}
                            className="bg-white text-[#4B2B26] hover:bg-gray-100"
                          >
                            Подробнее
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => setIsContactModalOpen(true)}
                            className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                          >
                            Связаться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-400'}`} 
                        />
                      ))}
                      <span className="text-sm text-white/80 ml-2">
                        {item.rating} ({item.reviews})
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsContactModalOpen(true)}
                      className="w-full bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                    >
                      Узнать цену
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 2) {
    // Горизонтальные карточки с детальной информацией
    return (
      <section className="py-16 px-4 bg-gradient-to-r from-[#E9D7C1] to-[#F5F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
              Топ продаж месяца
            </h2>
            <p className="text-lg text-[#4B2B26]/70">
              Модели, которые выбирают чаще всего
            </p>
          </div>

          <div className="space-y-6">
            {bestsellers.map((item, index) => (
              <div 
                key={item.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } flex flex-col lg:flex-row`}
              >
                <div className="lg:w-1/3 relative">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full font-bold text-lg">
                    #{item.rank}
                  </div>
                </div>
                
                <div className={`lg:w-2/3 p-8 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:text-right' : ''
                }`}>
                  <div className="mb-4">
                    <span className="bg-[#4B2B26] text-white px-3 py-1 rounded text-sm font-medium">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#4B2B26] mb-4">
                    {item.name}
                  </h3>
                  
                  <div className={`flex items-center space-x-2 mb-4 ${
                    index % 2 === 1 ? 'lg:justify-end' : ''
                  }`}>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(item.rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[#4B2B26] font-medium">
                      {item.rating} ({item.reviews} отзывов)
                    </span>
                  </div>
                  
                  <div className={`flex space-x-4 ${
                    index % 2 === 1 ? 'lg:justify-end' : ''
                  }`}>
                    <Button 
                      variant="outline" 
                      className="border-[#4B2B26] text-[#4B2B26]"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsProductDetailOpen(true);
                      }}
                    >
                      Подробнее
                    </Button>
                    <Button 
                      className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      Связаться
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <ProductDetailModal
          isOpen={isProductDetailOpen}
          onClose={() => setIsProductDetailOpen(false)}
          product={selectedProduct}
          onContactClick={() => {
            setIsProductDetailOpen(false);
            setIsContactModalOpen(true);
          }}
        />
      </section>
    );
  }

  // Вариант 3: Подиум с главным хитом в центре
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
            Подиум хитов
          </h2>
          <p className="text-lg text-gray-600">
            Самые желанные модели нашего бутика
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          {/* Второе место */}
          <div className="order-2 lg:order-1">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold text-[#4B2B26]">Второе место</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 h-80 flex flex-col">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden flex-1">
                <ImageWithFallback
                  src={bestsellers[1].image}
                  alt={bestsellers[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-[#4B2B26] mb-1">{bestsellers[1].name}</h4>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(bestsellers[1].rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <Button 
                  size="sm"
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 w-full mt-2"
                >
                  Связаться
                </Button>
              </div>
            </div>
          </div>

          {/* Первое место (центр) */}
          <div className="order-1 lg:order-2">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="font-semibold text-[#4B2B26]">Лидер продаж</h3>
            </div>
            
            <div className="bg-[#4B2B26] text-white rounded-lg p-6 h-96 flex flex-col">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden flex-1">
                <ImageWithFallback
                  src={bestsellers[0].image}
                  alt={bestsellers[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#D4AF37] text-black px-2 py-1 rounded text-xs font-bold">
                  ХИТ №1
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">{bestsellers[0].name}</h4>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(bestsellers[0].rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-400'}`} 
                    />
                  ))}
                  <span className="text-sm ml-1">({bestsellers[0].reviews})</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 w-full"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Связаться
                </Button>
              </div>
            </div>
          </div>

          {/* Третье место */}
          <div className="order-3">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-[#CD7F32] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold text-[#4B2B26]">Третье место</h3>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 h-80 flex flex-col">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden flex-1">
                <ImageWithFallback
                  src={bestsellers[2].image}
                  alt={bestsellers[2].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-[#4B2B26] mb-1">{bestsellers[2].name}</h4>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(bestsellers[2].rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <Button 
                  size="sm"
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 w-full mt-2"
                >
                  Связаться
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-12"
            onClick={() => setIsContactModalOpen(true)}
          >
            Узнать о всех хитах
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ProductDetailModal
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        product={selectedProduct}
        onContactClick={() => {
          setIsProductDetailOpen(false);
          setIsContactModalOpen(true);
        }}
      />
    </section>
  );
}