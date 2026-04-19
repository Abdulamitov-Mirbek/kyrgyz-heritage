// src/pages/SitePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Tag, 
  Heart, 
  BookOpen, 
  Sparkles,
  Droplet,
  Mountain,
  TreePine,
  Landmark,
  ChevronLeft,
  Loader2,
  ExternalLink,
  Image as ImageIcon,
  Info,
  Star
} from 'lucide-react';

const SitePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchSiteDetails();
  }, [id]);

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/sites/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setSite(data.data);
      } else {
        setError('Failed to load site details');
      }
    } catch (err) {
      console.error('Error fetching site:', err);
      setError('Network error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getSiteTypeIcon = (type) => {
    const icons = {
      sacred: <Star className="w-5 h-5" />,
      mountain: <Mountain className="w-5 h-5" />,
      spring: <Droplet className="w-5 h-5" />,
      mazar: <Landmark className="w-5 h-5" />,
      petroglyph: <BookOpen className="w-5 h-5" />,
      tree: <TreePine className="w-5 h-5" />,
    };
    return icons[type] || <MapPin className="w-5 h-5" />;
  };

  const getHeritageStatusColor = (status) => {
    const colors = {
      UNESCO: 'bg-amber-100 text-amber-800 border-amber-300',
      National: 'bg-blue-100 text-blue-800 border-blue-300',
      Regional: 'bg-green-100 text-green-800 border-green-300',
      Local: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getAccessibilityColor = (access) => {
    const colors = {
      Public: 'bg-green-100 text-green-700',
      Restricted: 'bg-yellow-100 text-yellow-700',
      Private: 'bg-red-100 text-red-700',
      Unknown: 'bg-gray-100 text-gray-700',
    };
    return colors[access] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Загрузка информации о сакральном месте...</p>
        </div>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Место не найдено</h2>
          <p className="text-stone-600 mb-6">{error || 'Не удалось загрузить информацию'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Вернуться на карту
          </button>
        </div>
      </div>
    );
  }

  const mainImage = site.mainPhoto || site.photoUrls?.[0] || 'https://picsum.photos/1200/600?random=1';
  const allImages = [mainImage, ...(site.photoUrls || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
      {/* Hero Section with Image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-stone-900">
        <img
          src={mainImage}
          alt={site.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-stone-800" />
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getHeritageStatusColor(site.heritageStatus)}`}>
                {site.heritageStatus}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessibilityColor(site.accessibility)}`}>
                {site.accessibility}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{site.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span>{site.location?.region}, {site.location?.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-stone-200">
            <div className="flex overflow-x-auto">
              {['info', 'legends', 'rituals', 'gallery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {tab === 'info' && '📋 Информация'}
                  {tab === 'legends' && '📜 Легенды'}
                  {tab === 'rituals' && '🙏 Ритуалы'}
                  {tab === 'gallery' && '🖼️ Галерея'}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'info' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-amber-600" />
                    Описание
                  </h3>
                  <p className="text-stone-600 leading-relaxed">{site.description}</p>
                </div>

                {/* Spiritual Significance */}
                {site.spiritualSignificance && (
                  <div>
                    <h3 className="text-xl font-semibold text-stone-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      Духовное значение
                    </h3>
                    <p className="text-stone-600 leading-relaxed">{site.spiritualSignificance}</p>
                  </div>
                )}

                {/* Healing Properties */}
                {site.healingProperties && (
                  <div>
                    <h3 className="text-xl font-semibold text-stone-800 mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-amber-600" />
                      Целебные свойства
                    </h3>
                    <p className="text-stone-600 leading-relaxed">{site.healingProperties}</p>
                  </div>
                )}

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-stone-200">
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl mb-1">{getSiteTypeIcon(site.sacredType)}</div>
                    <div className="text-sm text-stone-500">Тип</div>
                    <div className="font-medium text-stone-800">
                      {site.sacredType === 'mountain' && 'Гора'}
                      {site.sacredType === 'spring' && 'Источник'}
                      {site.sacredType === 'mazar' && 'Мазар'}
                      {site.sacredType === 'petroglyph' && 'Петроглифы'}
                      {site.sacredType === 'tree' && 'Дерево'}
                      {site.sacredType === 'cave' && 'Пещера'}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                    <div className="text-sm text-stone-500">Период</div>
                    <div className="font-medium text-stone-800">{site.culturalPeriod}</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                    <div className="text-sm text-stone-500">Часы работы</div>
                    <div className="font-medium text-stone-800">{site.visitingHours || 'Круглосуточно'}</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <Tag className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                    <div className="text-sm text-stone-500">Статус</div>
                    <div className="font-medium text-stone-800">{site.verificationStatus === 'approved' ? '✓ Проверено' : 'Ожидает'}</div>
                  </div>
                </div>

                {/* Tags */}
                {site.tags && site.tags.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-stone-500 mb-2">Теги:</h4>
                    <div className="flex flex-wrap gap-2">
                      {site.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'legends' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Легенды и предания
                </h3>
                {site.legends && site.legends.length > 0 ? (
                  site.legends.map((legend, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                      <h4 className="text-lg font-semibold text-stone-800 mb-2">{legend.title}</h4>
                      <p className="text-stone-600 mb-3">{legend.story}</p>
                      {legend.source && (
                        <p className="text-sm text-stone-500 italic">Источник: {legend.source}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-stone-500 text-center py-8">Легенды пока не добавлены</p>
                )}
              </div>
            )}

            {activeTab === 'rituals' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Ритуалы и паломничество
                </h3>
                
                {site.pilgrimageInfo ? (
                  <div className="space-y-4">
                    {site.pilgrimageInfo.bestTime && (
                      <div className="bg-amber-50 rounded-lg p-6">
                        <h4 className="font-semibold text-stone-800 mb-2">Лучшее время для посещения</h4>
                        <p className="text-stone-600">{site.pilgrimageInfo.bestTime}</p>
                      </div>
                    )}
                    
                    {site.pilgrimageInfo.rituals && site.pilgrimageInfo.rituals.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-6">
                        <h4 className="font-semibold text-stone-800 mb-3">Ритуалы</h4>
                        <ul className="space-y-2">
                          {site.pilgrimageInfo.rituals.map((ritual, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-amber-600 mt-1">•</span>
                              <span className="text-stone-600">{ritual}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {site.pilgrimageInfo.offerings && site.pilgrimageInfo.offerings.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-6">
                        <h4 className="font-semibold text-stone-800 mb-3">Подношения</h4>
                        <ul className="space-y-2">
                          {site.pilgrimageInfo.offerings.map((offering, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-amber-600 mt-1">•</span>
                              <span className="text-stone-600">{offering}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {site.pilgrimageInfo.taboos && site.pilgrimageInfo.taboos.length > 0 && (
                      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-3">Запреты</h4>
                        <ul className="space-y-2">
                          {site.pilgrimageInfo.taboos.map((taboo, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600 mt-1">⚠️</span>
                              <span className="text-red-700">{taboo}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-stone-500 text-center py-8">Информация о ритуалах пока не добавлена</p>
                )}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h3 className="text-xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-600" />
                  Галерея
                </h3>
                {allImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      >
                        <img
                          src={image}
                          alt={`${site.name} - фото ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-stone-50 rounded-lg">
                    <ImageIcon className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                    <p className="text-stone-500">Фотографии пока не добавлены</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Просмотр изображения"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default SitePage;