import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import ContactModal from './ContactModal';
import ProductDetailModal from './ProductDetailModal';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  isNew?: boolean;
  tag?: string;
}

export default function NewArrivals({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Элегантное платье Аврора",
      image: "/src/assets/images/products/image-1.jpg",
      category: "Платья",
      isNew: true,
      tag: "NEW"
    },
    {
      id: 2,
      name: "Шелковая блузка Грация",
      image: "/src/assets/images/products/image-2.jpg",
      category: "Блузки",
      isNew: true,
      tag: "NEW"
    },
    {
      id: 3,
      name: "Комплект украшений Тайна",
      image: "/src/assets/images/products/image-3.jpg",
      category: "Аксессуары",
      isNew: true,
      tag: "SALE"
    },
    {
      id: 4,
      name: "Коктейльное платье Мечта",
      image: "/src/assets/images/products/image-4.jpg",
      category: "Платья",
      isNew: true,
      tag: "EXCLUSIVE"
    }
  ];

  if (variant === 1) {
    // Классическая сетка товаров
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
              Новинки
            </h2>
            <p className="text-lg text-gray-600">
              Только что поступившие модели этого сезона
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group cursor-pointer bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        product.tag === 'NEW' ? 'bg-[#4B2B26] text-white' :
                        product.tag === 'SALE' ? 'bg-red-500 text-white' :
                        'bg-[#D4AF37] text-white'
                      }`}>
                        {product.tag}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer" />
                  </div>
                  
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center ${
                    hoveredProduct === product.id ? 'bg-opacity-40 opacity-100' : 'bg-opacity-0 opacity-0'
                  }`}>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsProductDetailOpen(true);
                        }}
                        className="bg-white text-[#4B2B26] hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => setIsContactModalOpen(true)}
                        className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                      >
                        Связаться
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-[#4B2B26] mb-3 group-hover:text-[#4B2B26]/80 transition-colors">
                    {product.name}
                  </h3>
                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                  >
                    Связаться
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-8"
            >
              Узнать о всех новинках
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

  if (variant === 2) {
    // Карусель/слайдер
    return (
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
              Свежие поступления
            </h2>
            <p className="text-lg text-[#4B2B26]/70">
              Откройте для себя последние тренды
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(products.length / 2) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      {products.slice(slideIndex * 2, slideIndex * 2 + 2).map((product) => (
                        <div 
                          key={product.id}
                          className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <div className="flex space-x-6">
                            <div className="w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              {product.tag && (
                                <div className="mb-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                                    product.tag === 'NEW' ? 'bg-[#4B2B26] text-white' :
                                    product.tag === 'SALE' ? 'bg-red-500 text-white' :
                                    'bg-[#D4AF37] text-white'
                                  }`}>
                                    {product.tag}
                                  </span>
                                </div>
                              )}
                              <h3 className="text-xl font-semibold text-[#4B2B26] mb-4">
                                {product.name}
                              </h3>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1"
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setIsProductDetailOpen(true);
                                  }}
                                >
                                  Подробнее
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-[#4B2B26] text-white"
                                  onClick={() => setIsContactModalOpen(true)}
                                >
                                  Связаться
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Навигация */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(products.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeSlide === index ? 'bg-[#4B2B26]' : 'bg-[#4B2B26]/30'
                  }`}
                />
              ))}
            </div>
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

  // Вариант 3: Мозаичная раскладка с разными размерами
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#E9D7C1] to-[#F5F0E8]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
            Новая коллекция
          </h2>
          <p className="text-lg text-[#4B2B26]/70 max-w-2xl mx-auto">
            Уникальные модели, созданные специально для вас
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">
          {/* Большая карточка */}
          <div className="md:col-span-2 md:row-span-2 group">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src={products[0].image}
                alt={products[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                {products[0].tag && (
                  <span className="bg-[#4B2B26] px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {products[0].tag}
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{products[0].name}</h3>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(products[0]);
                        setIsProductDetailOpen(true);
                      }}
                      className="bg-white text-[#4B2B26] hover:bg-gray-100"
                    >
                      Подробнее
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setIsContactModalOpen(true)}
                      className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                    >
                      Связаться
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Остальные карточки */}
          {products.slice(1).map((product) => (
            <div key={product.id} className="group">
              <div className="relative h-48 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.tag && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      product.tag === 'NEW' ? 'bg-[#4B2B26] text-white' :
                      product.tag === 'SALE' ? 'bg-red-500 text-white' :
                      'bg-[#D4AF37] text-white'
                    }`}>
                      {product.tag}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="font-semibold text-[#4B2B26] text-sm mb-2">
                      {product.name}
                    </h3>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsProductDetailOpen(true);
                        }}
                        className="flex-1 text-xs bg-white text-[#4B2B26] hover:bg-gray-100 border border-[#4B2B26]/20"
                      >
                        Подробнее
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 text-xs bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                      >
                        Связаться
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-12 py-4"
          >
            Узнать о коллекции
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