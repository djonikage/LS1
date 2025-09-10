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
        image: "https://images.unsplash.com/photo-1678637803638-0bcc1e13ecae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBmYXNoaW9ufGVufDF8fHx8MTc1NzQxMTEyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Платья",
        isNew: true,
        tag: "NEW"
      },
      {
        id: 2,
        name: "Коктейльное платье Мечта",
        image: "https://images.unsplash.com/photo-1609681780826-e484497a971d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1NzMzMTMxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Платья",
        tag: "EXCLUSIVE"
      },
      {
        id: 3,
        name: "Платье-миди Элеганс",
        image: "https://images.unsplash.com/photo-1700575306937-0855d570110d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBzdHlsZXxlbnwxfHx8fDE3NTc0NDExMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Платья"
      },
      {
        id: 4,
        name: "Летнее платье София",
        image: "https://images.unsplash.com/photo-1639244151653-7807947de5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbWFnYXppbmUlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzU3NDA4ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Платья"
      }
    ],
    "Блузки": [
      {
        id: 5,
        name: "Шелковая блузка Грация",
        image: "https://images.unsplash.com/photo-1685338336656-e10a7bb3e12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsb3VzZSUyMGZhc2hpb258ZW58MXx8fHwxNzU3NDQwOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Блузки",
        isNew: true,
        tag: "NEW"  
      },
      {
        id: 6,
        name: "Блузка классическая Софи",
        image: "https://images.unsplash.com/photo-1568252748074-f9c8d964e834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBtb2RlbHxlbnwxfHx8fDE3NTc0NDA4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Блузки"
      }
    ],
    "Аксессуары": [
      {
        id: 7,
        name: "Комплект украшений Тайна",
        image: "https://images.unsplash.com/photo-1569388330338-53ecda03dfa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBqZXdlbHJ5fGVufDF8fHx8MTc1NzM1MTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Аксессуары",
        tag: "SALE"
      },
      {
        id: 8,
        name: "Комплект Диана",
        image: "https://images.unsplash.com/photo-1694452243736-2b9c00d001b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbG90aGluZyUyMHN0b3JlfGVufDF8fHx8MTc1NzQyOTM2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Аксессуары"
      }
    ],
    "Обувь": [
      {
        id: 9,
        name: "Туфли классические",
        image: "https://images.unsplash.com/photo-1746216845602-336ad3a744f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhc2hpb24lMjBib3V0aXF1ZXxlbnwxfHx8fDE3NTc0NDA4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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