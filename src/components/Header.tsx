import { useState } from 'react';
import { Menu, X, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { Button } from './ui/button';

export default function Header({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (variant === 1) {
    // Классический горизонтальный хедер
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <h1 className="text-xl font-semibold text-[#4B2B26]">Lady's Secrets</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-[#4B2B26] transition-colors">Новинки</a>
                <a href="#" className="text-gray-700 hover:text-[#4B2B26] transition-colors">Платья</a>
                <a href="#" className="text-gray-700 hover:text-[#4B2B26] transition-colors">Блузки</a>
                <a href="#" className="text-gray-700 hover:text-[#4B2B26] transition-colors">Аксессуары</a>
                <a href="#" className="text-gray-700 hover:text-[#4B2B26] transition-colors">Sale</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-[#4B2B26]" />
              <Heart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-[#4B2B26]" />
              <ShoppingBag className="h-5 w-5 text-gray-600 cursor-pointer hover:text-[#4B2B26]" />
              <User className="h-5 w-5 text-gray-600 cursor-pointer hover:text-[#4B2B26]" />
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-3 space-y-2">
              <a href="#" className="block text-gray-700 hover:text-[#4B2B26]">Новинки</a>
              <a href="#" className="block text-gray-700 hover:text-[#4B2B26]">Платья</a>
              <a href="#" className="block text-gray-700 hover:text-[#4B2B26]">Блузки</a>
              <a href="#" className="block text-gray-700 hover:text-[#4B2B26]">Аксессуары</a>
              <a href="#" className="block text-gray-700 hover:text-[#4B2B26]">Sale</a>
            </nav>
          </div>
        )}
      </header>
    );
  }

  if (variant === 2) {
    // Минималистичный центрированный хедер
    return (
      <header className="bg-[#E9D7C1] py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-[#4B2B26] mb-4">Lady's Secrets</h1>
          <nav className="flex justify-center space-x-8 text-sm">
            <a href="#" className="text-[#4B2B26] hover:opacity-70 transition-opacity">НОВИНКИ</a>
            <a href="#" className="text-[#4B2B26] hover:opacity-70 transition-opacity">ПЛАТЬЯ</a>
            <a href="#" className="text-[#4B2B26] hover:opacity-70 transition-opacity">БЛУЗКИ</a>
            <a href="#" className="text-[#4B2B26] hover:opacity-70 transition-opacity">АКСЕССУАРЫ</a>
            <a href="#" className="text-[#4B2B26] hover:opacity-70 transition-opacity">SALE</a>
          </nav>
          <div className="flex justify-center space-x-6 mt-4">
            <Search className="h-4 w-4 text-[#4B2B26] cursor-pointer hover:opacity-70" />
            <Heart className="h-4 w-4 text-[#4B2B26] cursor-pointer hover:opacity-70" />
            <ShoppingBag className="h-4 w-4 text-[#4B2B26] cursor-pointer hover:opacity-70" />
            <User className="h-4 w-4 text-[#4B2B26] cursor-pointer hover:opacity-70" />
          </div>
        </div>
      </header>
    );
  }

  // Вариант 3: Боковое меню (sidebar)
  return (
    <>
      <header className="bg-[#4B2B26] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Lady's Secrets</h1>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 cursor-pointer hover:opacity-70" />
              <ShoppingBag className="h-5 w-5 cursor-pointer hover:opacity-70" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#E9D7C1] transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-[#4B2B26]">Меню</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(false)}
              className="text-[#4B2B26] hover:bg-[#4B2B26]/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-4">
            <a href="#" className="block text-[#4B2B26] hover:opacity-70 py-2">Новинки</a>
            <a href="#" className="block text-[#4B2B26] hover:opacity-70 py-2">Платья</a>
            <a href="#" className="block text-[#4B2B26] hover:opacity-70 py-2">Блузки</a>
            <a href="#" className="block text-[#4B2B26] hover:opacity-70 py-2">Аксессуары</a>
            <a href="#" className="block text-[#4B2B26] hover:opacity-70 py-2">Sale</a>
          </nav>
          <div className="flex space-x-4 mt-8 pt-8 border-t border-[#4B2B26]/20">
            <Heart className="h-5 w-5 text-[#4B2B26] cursor-pointer hover:opacity-70" />
            <User className="h-5 w-5 text-[#4B2B26] cursor-pointer hover:opacity-70" />
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}