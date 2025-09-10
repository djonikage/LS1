import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Hero({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  if (variant === 1) {
    // Fullscreen hero с фоновым изображением
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1619384259054-ee3ce9d1798c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc1NzMzODE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Fashion model"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Lady's Secrets
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Откройте для себя мир элегантности и стиля
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              className="bg-[#E9D7C1] text-[#4B2B26] hover:bg-[#E9D7C1]/90 px-8 py-3"
            >
              Новая коллекция
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#4B2B26] px-8 py-3"
            >
              Каталог
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 2) {
    // Split-screen layout
    return (
      <section className="min-h-screen flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-[#E9D7C1] flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-md text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-[#4B2B26] mb-6">
              Новая эра женственности
            </h1>
            <p className="text-lg text-[#4B2B26]/80 mb-8">
              Каждая деталь создана для того, чтобы подчеркнуть вашу уникальность и природную красоту.
            </p>
            <Button 
              size="lg" 
              className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-8 py-3"
            >
              Открыть коллекцию
            </Button>
          </div>
        </div>
        
        <div className="lg:w-1/2 h-64 lg:h-auto">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1568252748074-f9c8d964e834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBtb2RlbHxlbnwxfHx8fDE3NTc0NDA4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Fashion model"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    );
  }

  // Вариант 3: Центрированный контент с карточками
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F5F0E8] to-[#E9D7C1]">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#4B2B26] mb-6">
          Lady's Secrets
        </h1>
        <p className="text-xl text-[#4B2B26]/70 mb-12 max-w-2xl mx-auto">
          Где каждый образ рассказывает историю. Откройте секреты элегантности.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#4B2B26] mb-3">Новинки</h3>
            <p className="text-[#4B2B26]/70 mb-4">Актуальные тренды сезона</p>
            <Button variant="outline" className="border-[#4B2B26] text-[#4B2B26] hover:bg-[#4B2B26] hover:text-white">
              Смотреть
            </Button>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#4B2B26] mb-3">Эксклюзив</h3>
            <p className="text-[#4B2B26]/70 mb-4">Лимитированные коллекции</p>
            <Button variant="outline" className="border-[#4B2B26] text-[#4B2B26] hover:bg-[#4B2B26] hover:text-white">
              Открыть
            </Button>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold text-[#4B2B26] mb-3">Sale</h3>
            <p className="text-[#4B2B26]/70 mb-4">Скидки до 70%</p>
            <Button variant="outline" className="border-[#4B2B26] text-[#4B2B26] hover:bg-[#4B2B26] hover:text-white">
              Выбрать
            </Button>
          </div>
        </div>
        
        <Button 
          size="lg" 
          className="bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90 px-12 py-4"
        >
          Весь каталог
        </Button>
      </div>
    </section>
  );
}