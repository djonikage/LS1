import { useState } from 'react';
import { X, Heart, ZoomIn, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onContactClick: () => void;
}

export default function ProductDetailModal({ 
  isOpen, 
  onClose, 
  product, 
  onContactClick 
}: ProductDetailModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  // Дополнительные изображения для демонстрации (в реальном проекте должны приходить с продуктом)
  const additionalImages = [
    product.image,
    "/src/assets/images/hero/image-6.jpg",
    "/src/assets/images/lookbook/image-7.jpg"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % additionalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + additionalImages.length) % additionalImages.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Посмотрите на эту красивую модель: ${product.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback для браузеров без поддержки Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-[#4B2B26]">{product.name}</h2>
            {product.tag && (
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                product.tag === 'NEW' ? 'bg-[#4B2B26] text-white' :
                product.tag === 'SALE' ? 'bg-red-500 text-white' :
                'bg-[#D4AF37] text-white'
              }`}>
                {product.tag}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Поделиться"
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group">
              <ImageWithFallback
                src={additionalImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              />
              
              {/* Zoom Button */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-5 w-5 text-[#4B2B26]" />
              </button>

              {/* Navigation Arrows */}
              {additionalImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5 text-[#4B2B26]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5 text-[#4B2B26]" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {additionalImages.length > 1 && (
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {additionalImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {additionalImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {additionalImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      currentImageIndex === index ? 'border-[#4B2B26]' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#4B2B26] mb-2">{product.name}</h1>
              <p className="text-[#4B2B26]/70">Категория: {product.category}</p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#4B2B26]">Описание</h3>
              <p className="text-gray-600 leading-relaxed">
                Изысканная модель из новой коллекции Lady's Secrets. Создана из премиальных материалов 
                с особым вниманием к деталям. Идеально подходит для особых случаев и подчеркивает 
                естественную красоту и элегантность.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[#4B2B26]">Особенности</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4B2B26] rounded-full mr-3" />
                  Эксклюзивный дизайн
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4B2B26] rounded-full mr-3" />
                  Премиальные материалы
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4B2B26] rounded-full mr-3" />
                  Индивидуальный пошив
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4B2B26] rounded-full mr-3" />
                  Консультация стилиста
                </li>
              </ul>
            </div>

            {/* Size Guide */}
            <div className="bg-[#E9D7C1]/30 rounded-lg p-4">
              <h3 className="font-semibold text-[#4B2B26] mb-2">Размерная сетка</h3>
              <p className="text-sm text-[#4B2B26]/70">
                Доступны размеры: XS, S, M, L, XL
              </p>
              <p className="text-sm text-[#4B2B26]/70">
                Возможен индивидуальный пошив по вашим меркам
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button
                  onClick={onContactClick}
                  className="flex-1 bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
                >
                  Узнать цену и наличие
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#4B2B26]/20 hover:border-[#4B2B26] hover:bg-[#4B2B26]/5"
                >
                  <Heart className="h-5 w-5 text-[#4B2B26]" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Свяжитесь с нами для уточнения деталей, размеров и стоимости
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-60 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-full max-h-full">
            <ImageWithFallback
              src={additionalImages[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}