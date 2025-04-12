import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { ChevronDown, UploadCloud, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';

// Form Schema Validation
const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(20),
  price: z.number().min(0.01),
  category: z.string(),
  size: z.string().optional(),
  quantity: z.number().min(0),
  reorderThreshold: z.number().min(0),
  images: z.array(z.instanceof(File)),
  isActive: z.boolean()
});

export default function AddProductForm() {

  const [categories, setCategories] = useState()

  const { authTokens, user } = useContext(AuthContext)
  const merchantId = user?.username

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:8000/products/category", {
        // headers: { Authorization: `Dusty ${authTokens?.access}` }
      })
      const data = await response.json()
      console.log(data)
      setCategories(data)

    }
    fetchCategories()
  })
  const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isActive: true,
      quantity: 0,
      reorderThreshold: 10
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setValue('images', [...watch('images'), ...acceptedFiles]);
    }
  });

  const images = watch('images') || [];

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach(file => formData.append('images', file));
      } else {
        formData.append(key, value);
      }
    });
    formData.append('merchant', merchantId);

    try {
      const response = await fetch('/api/products/', {
        method: 'POST',
        body: formData
      });
      // Handle response
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="relative">
            <select
              {...register('category')}
              className="w-full px-4 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.get_full_path}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Drag & drop images here, or click to select</p>
          </div>

          {/* Image Previews */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={file.name} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-32 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setValue('images', images.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Size and Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              {...register('size')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {/* <option value="">Select Size</option>
              {Product?.SIZE_CHOICES.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))} */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
            <input
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Threshold</label>
            <input
              type="number"
              {...register('reorderThreshold', { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            {...register('description')}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Status Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            {...register('isActive')}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Product Active
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
