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
      image: "/src/assets/images/products/image-1.jpg",
      count: "120+ моделей"
    },
    {
      name: "Блузки",
      image: "/src/assets/images/products/image-2.jpg",
      count: "85+ вариантов"
    },
    {
      name: "Аксессуары",
      image: "/src/assets/images/products/image-3.jpg",
      count: "200+ товаров"
    },
    {
      name: "Обувь",
      image: "/src/assets/images/products/image-5.jpg",
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