import React from 'react';
import { Upload, X } from 'lucide-react';

const ImageUploader = ({ onImagesChange, maxImages = 10 }) => {
  const [images, setImages] = React.useState([]);
  const [previews, setPreviews] = React.useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files].slice(0, maxImages);
    
    setImages(newImages);
    onImagesChange(newImages);

    // Create previews
    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 text-stone-400 mb-3" />
          <p className="text-stone-600 mb-1">
            Drag & drop images here or click to browse
          </p>
          <p className="text-sm text-stone-400">
            Maximum {maxImages} images (JPG, PNG, GIF)
          </p>
        </label>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;