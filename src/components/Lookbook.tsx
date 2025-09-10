import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ArrowRight, Play, Eye } from 'lucide-react';
import { Button } from './ui/button';

export default function Lookbook({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [activeImage, setActiveImage] = useState(0);

  const lookbookImages = [
    {
      id: 1,
      title: "Осенняя элегантность",
      description: "Изысканные образы для особых случаев",
      image: "/src/assets/images/image-7.jpg",
      items: ["Платье шелковое", "Пальто кашемир", "Туфли лодочки"],
      totalPrice: "45 990"
    },
    {
      id: 2,
      title: "Деловой шик",
      description: "Современные решения для офиса",
      image: "/src/assets/images/image-8.jpg",
      items: ["Блузка классическая", "Брюки прямые", "Жакет приталенный"],
      totalPrice: "32 990"
    },
    {
      id: 3,
      title: "Романтический вечер",
      description: "Нежность и женственность",
      image: "/src/assets/images/image-5.jpg",
      items: ["Платье коктейльное", "Клатч вечерний", "Серьги жемчуг"],
      totalPrice: "28 990"
    }
  ];

  if (variant === 1) {
    // Полноэкранная галерея
    return (
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
              Lookbook
            </h2>
            <p className="text-lg text-[#4B2B26]/70">
              Готовые образы от наших стилистов
            </p>
          </div>

          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={lookbookImages[activeImage].image}
                alt={lookbookImages[activeImage].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Навигация */}
              <button
                onClick={() => setActiveImage(activeImage > 0 ? activeImage - 1 : lookbookImages.length - 1)}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 text-white" />
              </button>
              
              <button
                onClick={() => setActiveImage(activeImage < lookbookImages.length - 1 ? activeImage + 1 : 0)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </button>

              {/* Информация об образе */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-2">{lookbookImages[activeImage].title}</h3>
                  <p className="text-lg mb-4">{lookbookImages[activeImage].description}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">В образе:</h4>
                      <ul className="space-y-1">
                        {lookbookImages[activeImage].items.map((item, index) => (
                          <li key={index} className="text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80 mb-1">Полный образ:</p>
                      <p className="text-3xl font-bold">{lookbookImages[activeImage].totalPrice}₽</p>
                      <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 mt-3">
                        Купить образ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Миниатюры */}
            <div className="flex justify-center space-x-4 mt-6">
              {lookbookImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === index ? 'border-[#4B2B26]' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 2) {
    // Сетка образов в стиле журнала
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
              Fashion Editorial
            </h2>
            <p className="text-lg text-gray-600">
              Журнальные образы для вдохновения
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookbookImages.map((look, index) => (
              <div 
                key={look.id}
                className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <ImageWithFallback
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  
                  {/* Плавающая кнопка просмотра */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-white text-[#4B2B26] rounded-full p-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4B2B26] mb-2">{look.title}</h3>
                  <p className="text-gray-600 mb-4">{look.description}</p>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">Полный образ</span>
                      <span className="text-lg font-bold text-[#4B2B26]">{look.totalPrice}₽</span>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      {look.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-xs text-gray-500">• {item}</p>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90">
                      Собрать образ
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

  // Вариант 3: Интерактивная презентация с видео-эффектом
  return (
    <section className="py-16 bg-gradient-to-br from-[#4B2B26] to-[#26474B] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cinematic Lookbook
          </h2>
          <p className="text-lg text-white/80">
            Погрузитесь в мир стиля
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={lookbookImages[activeImage].image}
                alt={lookbookImages[activeImage].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
              
              {/* Кнопка play в центре */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <Play className="h-8 w-8 text-white ml-1" />
                </button>
              </div>

              {/* Номер образа */}
              <div className="absolute top-6 left-6 bg-[#D4AF37] text-black px-4 py-2 rounded-full font-bold">
                {String(activeImage + 1).padStart(2, '0')} / {String(lookbookImages.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">{lookbookImages[activeImage].title}</h3>
              <p className="text-xl text-white/80 mb-6">{lookbookImages[activeImage].description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#D4AF37]">Детали образа:</h4>
              {lookbookImages[activeImage].items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/80">Стоимость образа:</span>
                <span className="text-3xl font-bold text-[#D4AF37]">{lookbookImages[activeImage].totalPrice}₽</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#4B2B26]"
                >
                  Детали
                </Button>
                <Button className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90">
                  Заказать
                </Button>
              </div>
            </div>

            {/* Навигация по образам */}
            <div className="flex space-x-2 pt-4">
              {lookbookImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-12 h-1 rounded transition-colors ${
                    activeImage === index ? 'bg-[#D4AF37]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}