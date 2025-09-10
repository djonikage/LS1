import { X, Truck, Gift, Star } from 'lucide-react';
import { useState } from 'react';

export default function PromoBar({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  if (variant === 1) {
    // Бегущая строка
    return (
      <div className="bg-[#4B2B26] text-white py-2 relative overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">🎉 Скидка 30% на новую коллекцию</span>
          <span className="mx-8">🚚 Бесплатная доставка от 5000₽</span>
          <span className="mx-8">✨ Эксклюзивные модели только у нас</span>
          <span className="mx-8">💝 Подарок к каждому заказу</span>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70"
        >
          <X className="h-4 w-4" />
        </button>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translate3d(100%, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  if (variant === 2) {
    // Статичная полоса с иконками
    return (
      <div className="bg-[#E9D7C1] py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-[#4B2B26]" />
              <span className="text-sm text-[#4B2B26]">Бесплатная доставка от 5000₽</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Gift className="h-4 w-4 text-[#4B2B26]" />
              <span className="text-sm text-[#4B2B26]">Подарок к заказу</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <Star className="h-4 w-4 text-[#4B2B26]" />
              <span className="text-sm text-[#4B2B26]">Скидка 30% на новинки</span>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-[#4B2B26] hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Вариант 3: Центрированное объявление
  return (
    <div className="bg-gradient-to-r from-[#4B2B26] to-[#26474B] text-white py-4">
      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <p className="text-lg font-medium">
          🌟 Новая коллекция "Осенние тайны" уже в продаже! 
          <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
            -30%
          </span>
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}