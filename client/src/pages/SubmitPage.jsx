import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { 
  MapPin, Upload, Calendar, Clock, Phone, Mail, Globe, 
  Tag, Info, ChevronRight, Sparkles, Building2, Landmark,
  Mountain, Droplets, TreePine, Star, Heart, BookOpen,
  Camera, X, Check, AlertCircle, ArrowLeft
} from 'lucide-react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const SubmitPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [siteType, setSiteType] = useState('heritage');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      culturalPeriod: 'Ancient',
      heritageStatus: 'Local',
      accessibility: 'Public',
      country: 'Кыргызстан'
    }
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a site');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const siteTypes = [
    { 
      id: 'heritage', 
      label: 'Исторический объект', 
      icon: Building2, 
      color: 'from-amber-500 to-orange-600',
      description: 'Исторические здания, памятники, архитектурные сооружения'
    },
    { 
      id: 'sacred', 
      label: 'Сакральное место', 
      icon: Sparkles, 
      color: 'from-purple-500 to-pink-600',
      description: 'Святые места, мазары, источники, места силы'
    },
    { 
      id: 'natural', 
      label: 'Природный объект', 
      icon: Mountain, 
      color: 'from-green-500 to-emerald-600',
      description: 'Горы, озера, пещеры, уникальные природные formations'
    },
    { 
      id: 'petroglyph', 
      label: 'Петроглифы', 
      icon: Landmark, 
      color: 'from-stone-500 to-stone-700',
      description: 'Наскальные рисунки, древние письмена'
    },
  ];

  const culturalPeriods = [
    'Prehistoric', 'Ancient', 'Medieval', 'Colonial', 'Modern', 'Contemporary'
  ];

  const heritageStatuses = [
    'UNESCO', 'National', 'Regional', 'Local', 'Unprotected', 'Endangered'
  ];

  const kyrgyzRegions = [
    'Чуйская область', 'Иссык-Кульская область', 'Нарынская область',
    'Таласская область', 'Джалал-Абадская область', 'Ошская область',
    'Баткенская область', 'г. Бишкек', 'г. Ош'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    
    setImages([...images, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setSelectedLocation(location);
          setValue('location', {
            type: 'Point',
            coordinates: [location.lng, location.lat]
          });
          toast.success('Location detected!');
        },
        (error) => {
          toast.error('Could not get location: ' + error.message);
        }
      );
    } else {
      toast.error('Geolocation is not supported');
    }
  };

  const onSubmit = async (data) => {
    if (!selectedLocation) {
      toast.error('Please select a location');
      return;
    }

    setLoading(true);

    const siteData = {
      ...data,
      siteType: siteType,
      location: {
        type: 'Point',
        coordinates: [selectedLocation.lng, selectedLocation.lat],
        address: data.address,
        city: data.city,
        region: data.region,
        country: data.country
      },
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/sites', siteData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Upload images if site created successfully
      if (images.length > 0 && response.data.data?._id) {
        const formData = new FormData();
        images.forEach(file => formData.append('images', file));
        
        await api.post(`/sites/${response.data.data._id}/images`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
      }

      toast.success('Site submitted successfully!');
      navigate(`/sites/${response.data.data._id}`);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.error || 'Failed to submit site');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amber-200 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.back')}
          </button>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Upload className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{t('submit.title')}</h1>
            </div>
            <p className="text-xl text-amber-100">{t('submit.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition ${
                  step >= s 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 ${
                    step > s ? 'bg-amber-600' : 'bg-stone-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-sm text-stone-600">
            <span>Тип</span>
            <span>Информация</span>
            <span>Локация</span>
            <span>Медиа</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Site Type */}
            {step === 1 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="text-2xl font-bold mb-6">Выберите тип объекта</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {siteTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSiteType(type.id);
                        setStep(2);
                      }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        siteType === type.id
                          ? 'border-amber-600 bg-amber-50 shadow-lg'
                          : 'border-stone-200 hover:border-stone-300 hover:shadow'
                      }`}
                    >
                      <div className={`bg-gradient-to-r ${type.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{type.label}</h3>
                      <p className="text-sm text-stone-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{t('submit.basic_info')}</h2>
                  <span className="text-sm text-stone-500">
                    <span className="text-red-500">*</span> Обязательные поля
                  </span>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                  <div>
                    <label className="block font-medium mb-2">
                      {t('submit.site_name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Название обязательно' })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder={t('submit.site_name_placeholder')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-2">
                      {t('submit.description')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('description', { required: 'Описание обязательно' })}
                      rows={5}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder={t('submit.description_placeholder')}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2">{t('submit.cultural_period')}</label>
                      <select {...register('culturalPeriod')} className="w-full px-4 py-3 border rounded-xl">
                        {culturalPeriods.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-2">{t('submit.heritage_status')}</label>
                      <select {...register('heritageStatus')} className="w-full px-4 py-3 border rounded-xl">
                        {heritageStatuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">{t('submit.tags')}</label>
                    <input
                      {...register('tags')}
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder={t('submit.tags_placeholder')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="text-2xl font-bold mb-6">{t('submit.location')}</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="w-full bg-amber-100 text-amber-700 py-3 rounded-xl font-medium hover:bg-amber-200 transition flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    Использовать текущее местоположение
                  </button>

                  <div className="text-center text-stone-400">— или —</div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      {...register('address')}
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder="Адрес"
                    />
                    <input
                      {...register('city')}
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder="Город / Село"
                    />
                    <select {...register('region')} className="w-full px-4 py-3 border rounded-xl">
                      <option value="">Выберите область</option>
                      {kyrgyzRegions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <input
                      {...register('country')}
                      className="w-full px-4 py-3 border rounded-xl"
                      placeholder="Страна"
                      defaultValue="Кыргызстан"
                    />
                  </div>

                  {selectedLocation && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-700 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Выбраны координаты: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Media & Additional Info */}
            {step === 4 && (
              <div className="space-y-6 animate-slide-up">
                <h2 className="text-2xl font-bold mb-6">Медиа и дополнительная информация</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block font-medium mb-3">{t('submit.images')}</label>
                    <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-amber-400 transition cursor-pointer"
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <Camera className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                      <p className="text-stone-600">Нажмите или перетащите изображения</p>
                      <p className="text-sm text-stone-400 mt-1">Максимум 10 изображений</p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img src={preview} alt="" className="w-full h-24 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <label className="block font-medium mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        {t('submit.visiting_hours')}
                      </label>
                      <input
                        {...register('visitingHours')}
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder={t('submit.visiting_hours_placeholder')}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        {t('submit.contact_phone')}
                      </label>
                      <input
                        {...register('contactInfo.phone')}
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder="+996 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        <Mail className="inline w-4 h-4 mr-1" />
                        {t('submit.contact_email')}
                      </label>
                      <input
                        {...register('contactInfo.email')}
                        type="email"
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder="info@example.com"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        <Globe className="inline w-4 h-4 mr-1" />
                        {t('submit.website')}
                      </label>
                      <input
                        {...register('contactInfo.website')}
                        type="url"
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder={t('submit.website_placeholder')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border rounded-xl hover:bg-stone-50 transition"
                >
                  {t('common.back')}
                </button>
              )}
              <div className="flex-1" />
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition flex items-center gap-2"
                >
                  {t('common.next')}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  {loading ? t('submit.submitting') : t('submit.submit_button')}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;