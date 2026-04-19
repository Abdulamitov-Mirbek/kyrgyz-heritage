import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateSite } from '../../hooks/useSites.js';
import LocationPicker from './LocationPicker.jsx';
import ImageUploader from './ImageUploader.jsx';
import toast from 'react-hot-toast';

// ... rest of the component remains the same

const SubmitSiteForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const navigate = useNavigate();
  const createSite = useCreateSite();
  const [location, setLocation] = React.useState(null);
  const [images, setImages] = React.useState([]);

  const onSubmit = async (data) => {
    if (!location) {
      toast.error('Please select a location on the map');
      return;
    }

    const siteData = {
      ...data,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat],
        address: data.address,
      },
      tags: data.tags?.split(',').map(tag => tag.trim()) || [],
    };

    try {
      await createSite.mutateAsync(siteData);
      toast.success('Site submitted successfully!');
      navigate('/sites');
    } catch (error) {
      toast.error('Failed to submit site');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Site Name *</label>
            <input
              {...register('name', { required: 'Site name is required' })}
              className="input-field"
              placeholder="e.g., Burana Tower"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="input-field"
              rows="4"
              placeholder="Describe the site, its history, and significance..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Cultural Period</label>
              <select {...register('culturalPeriod')} className="input-field">
                <option value="Ancient">Ancient</option>
                <option value="Medieval">Medieval</option>
                <option value="Colonial">Colonial</option>
                <option value="Modern">Modern</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Heritage Status</label>
              <select {...register('heritageStatus')} className="input-field">
                <option value="UNESCO">UNESCO</option>
                <option value="National">National</option>
                <option value="Regional">Regional</option>
                <option value="Local">Local</option>
                <option value="Unprotected">Unprotected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Tags</label>
            <input
              {...register('tags')}
              className="input-field"
              placeholder="heritage, ancient, tower (comma-separated)"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Location</h2>
        
        <div>
          <label className="block font-medium mb-2">Address</label>
          <input
            {...register('address')}
            className="input-field mb-4"
            placeholder="Street, City, Region, Country"
          />
          
          <LocationPicker onLocationSelect={setLocation} />
          {location && (
            <p className="text-sm text-stone-600 mt-2">
              Selected: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Images</h2>
        <ImageUploader onImagesChange={setImages} maxImages={10} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Additional Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Visiting Hours</label>
            <input
              {...register('visitingHours')}
              className="input-field"
              placeholder="e.g., 9:00 AM - 6:00 PM"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Contact Phone</label>
              <input
                {...register('contactInfo.phone')}
                className="input-field"
                placeholder="+996 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Contact Email</label>
              <input
                {...register('contactInfo.email')}
                className="input-field"
                placeholder="info@example.com"
                type="email"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Website</label>
            <input
              {...register('contactInfo.website')}
              className="input-field"
              placeholder="https://example.com"
              type="url"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={createSite.isLoading}
          className="btn-primary"
        >
          {createSite.isLoading ? 'Submitting...' : 'Submit Site'}
        </button>
      </div>
    </form>
  );
};

export default SubmitSiteForm;