import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import ProductGalleryModal from './ProductGalleryModal';
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

export default function Categories({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const categories = [
    {
      name: "Платья",
      image: "https://images.unsplash.com/photo-1678637803638-0bcc1e13ecae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBmYXNoaW9ufGVufDF8fHx8MTc1NzQxMTEyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: "120+ моделей"
    },
    {
      name: "Блузки",
      image: "https://images.unsplash.com/photo-1685338336656-e10a7bb3e12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGJsb3VzZSUyMGZhc2hpb258ZW58MXx8fHwxNzU3NDQwOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: "85+ вариантов"
    },
    {
      name: "Аксессуары",
      image: "https://images.unsplash.com/photo-1569388330338-53ecda03dfa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBqZXdlbHJ5fGVufDF8fHx8MTc1NzM1MTY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: "200+ товаров"
    },
    {
      name: "Обувь",
      image: "https://images.unsplash.com/photo-1568252748074-f9c8d964e834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBtb2RlbHxlbnwxfHx8fDE3NTc0NDA4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      count: "90+ пар"
    }
  ];

  if (variant === 1) {
    // Классическая сетка карточек
    return (
      <>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-4">
                Категории
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Исследуйте наши коллекции и найдите идеальный образ для любого случая
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#4B2B26] mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modals */}
        <ProductGalleryModal
          isOpen={selectedCategory !== null}
          onClose={() => setSelectedCategory(null)}
          category={selectedCategory || ''}
          onContactClick={() => {
            setSelectedCategory(null);
            setIsContactModalOpen(true);
          }}
          onProductDetail={(product) => {
            setSelectedProduct(product);
            setIsProductDetailOpen(true);
          }}
        />

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
      </>
    );
  }

  if (variant === 2) {
    // Горизонтальные полосы с текстом поверх изображений
    return (
      <>
        <section className="py-16 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] text-center mb-12">
              Выберите категорию
            </h2>

            <div className="space-y-6">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="relative h-32 md:h-40 rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/80">{category.count}</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-white group-hover:transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modals */}
        <ProductGalleryModal
          isOpen={selectedCategory !== null}
          onClose={() => setSelectedCategory(null)}
          category={selectedCategory || ''}
          onContactClick={() => {
            setSelectedCategory(null);
            setIsContactModalOpen(true);
          }}
          onProductDetail={(product) => {
            setSelectedProduct(product);
            setIsProductDetailOpen(true);
          }}
        />

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
      </>
    );
  }

  // Вариант 3: Круговая мозаика
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#E9D7C1] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4B2B26] mb-16">
          Найдите свой стиль
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group cursor-pointer text-center"
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#4B2B26]/20 group-hover:border-[#4B2B26] transition-colors duration-300">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-[#4B2B26] mb-2">
                {category.name}
              </h3>
              <p className="text-[#4B2B26]/70 text-sm">
                {category.count}
              </p>
              <div className="w-12 h-0.5 bg-[#4B2B26]/20 group-hover:bg-[#4B2B26] mx-auto mt-3 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ProductGalleryModal
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory || ''}
        onContactClick={() => {
          setSelectedCategory(null);
          setIsContactModalOpen(true);
        }}
        onProductDetail={(product) => {
          setSelectedProduct(product);
          setIsProductDetailOpen(true);
        }}
      />

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