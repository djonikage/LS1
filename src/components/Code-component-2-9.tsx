import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  isNew?: boolean;
  tag?: string;
}

interface ProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onContactClick: () => void;
  onProductDetail: (product: Product) => void;
}

export default function ProductGalleryModal({ 
  isOpen, 
  onClose, 
  category, 
  onContactClick, 
  onProductDetail 
}: ProductGalleryModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Данные товаров по категориям
  const categoryProducts: Record<string, Product[]> = {
    "Платья": [
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
        name: "Коктейльное платье Мечта",
        image: "/src/assets/images/products/image-4.jpg",
        category: "Платья",
        tag: "EXCLUSIVE"
      },
      {
        id: 3,
        name: "Платье-миди Элеганс",
        image: "/src/assets/images/lookbook/image-7.jpg",
        category: "Платья"
      },
      {
        id: 4,
        name: "Летнее платье София",
        image: "/src/assets/images/lookbook/image-8.jpg",
        category: "Платья"
      }
    ],
    "Блузки": [
      {
        id: 5,
        name: "Шелковая блузка Грация",
        image: "/src/assets/images/products/image-2.jpg",
        category: "Блузки",
        isNew: true,
        tag: "NEW"  
      },
      {
        id: 6,
        name: "Блузка классическая Софи",
        image: "/src/assets/images/products/image-5.jpg",
        category: "Блузки"
      }
    ],
    "Аксессуары": [
      {
        id: 7,
        name: "Комплект украшений Тайна",
        image: "/src/assets/images/products/image-3.jpg",
        category: "Аксессуары",
        tag: "SALE"
      },
      {
        id: 8,
        name: "Комплект Диана",
        image: "/src/assets/images/products/image-9.jpg",
        category: "Аксессуары"
      }
    ],
    "Обувь": [
      {
        id: 9,
        name: "Туфли классические",
        image: "/src/assets/images/products/image-10.jpg",
        category: "Обувь"
      }
    ]
  };

  const products = categoryProducts[category] || [];
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return products.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-[#4B2B26]">{category}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Товары в данной категории появятся скоро</p>
            </div>
          ) : (
            <>
              {/* Carousel */}
              <div className="relative">
                <div className="grid md:grid-cols-3 gap-6">
                  {getCurrentProducts().map((product) => (
                    <div 
                      key={product.id}
                      className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Tag */}
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

                        {/* Wishlist */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer" />
                        </div>

                        {/* Hover Actions */}
                        <div className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center ${
                          hoveredProduct === product.id ? 'bg-opacity-40 opacity-100' : 'bg-opacity-0 opacity-0'
                        }`}>
                          <div className="flex space-x-3">
                            <Button
                              size="sm"
                              onClick={() => onProductDetail(product)}
                              className="bg-white text-[#4B2B26] hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Подробнее
                            </Button>
                            <Button
                              size="sm"
                              onClick={onContactClick}
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
                          onClick={onContactClick}
                          className="w-full bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                        >
                          Связаться
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6 text-[#4B2B26]" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6 text-[#4B2B26]" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots Navigation */}
              {totalSlides > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-[#4B2B26]' : 'bg-[#4B2B26]/30'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">
                  Показано {getCurrentProducts().length} из {products.length} товаров
                </p>
                <Button
                  onClick={onContactClick}
                  size="lg"
                  className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-8"
                >
                  Узнать о наличии всех товаров
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}