import { X, Phone, Mail, MessageCircle, MapPin, Clock, Instagram } from 'lucide-react';
import { Button } from './ui/button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${value.replace(/\D/g, '')}`);
        break;
      case 'telegram':
        window.open(`https://t.me/${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'instagram':
        window.open(`https://instagram.com/${value}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-[#4B2B26]">Связаться с нами</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Phone */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#4B2B26] flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Телефон
            </h3>
            <div className="space-y-2">
              <Button
                onClick={() => handleContactClick('phone', '+7 (495) 123-45-67')}
                variant="outline"
                className="w-full justify-start border-[#4B2B26]/20 hover:border-[#4B2B26] hover:bg-[#4B2B26]/5"
              >
                +7 (495) 123-45-67
              </Button>
              <Button
                onClick={() => handleContactClick('phone', '+7 (903) 987-65-43')}
                variant="outline"
                className="w-full justify-start border-[#4B2B26]/20 hover:border-[#4B2B26] hover:bg-[#4B2B26]/5"
              >
                +7 (903) 987-65-43
              </Button>
            </div>
          </div>

          {/* Messengers */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#4B2B26] flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Мессенджеры
            </h3>
            <div className="space-y-2">
              <Button
                onClick={() => handleContactClick('whatsapp', '+79039876543')}
                className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => handleContactClick('telegram', 'ladysecrets_boutique')}
                className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#4B2B26] flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email
            </h3>
            <Button
              onClick={() => handleContactClick('email', 'info@ladysecrets.ru')}
              variant="outline"
              className="w-full justify-start border-[#4B2B26]/20 hover:border-[#4B2B26] hover:bg-[#4B2B26]/5"
            >
              info@ladysecrets.ru
            </Button>
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#4B2B26] flex items-center">
              <Instagram className="h-5 w-5 mr-2" />
              Социальные сети
            </h3>
            <Button
              onClick={() => handleContactClick('instagram', 'ladysecrets_boutique')}
              className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Instagram className="h-4 w-4 mr-2" />
              @ladysecrets_boutique
            </Button>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#4B2B26] flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Адрес бутика
            </h3>
            <div className="bg-[#E9D7C1]/30 rounded-lg p-4">
              <p className="text-[#4B2B26] mb-2">
                г. Москва, ул. Тверская, д. 15
              </p>
              <p className="text-[#4B2B26] mb-2">
                ТЦ "Элегант", 2 этаж
              </p>
              <div className="flex items-center text-sm text-[#4B2B26]/70">
                <Clock className="h-4 w-4 mr-1" />
                Ежедневно: 10:00 - 22:00
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Выберите удобный способ связи, и мы поможем вам с выбором
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-[#4B2B26] text-white hover:bg-[#4B2B26]/90"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}