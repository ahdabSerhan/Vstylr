import { useState, useCallback } from 'react';

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<string>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file (JPG, PNG, WebP)');
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('Image size must be less than 10MB');
      }

      // Create a promise that resolves with the data URL
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setIsUploading(false);
          resolve(result);
        };
        
        reader.onerror = () => {
          setIsUploading(false);
          reject(new Error('Failed to read the image file'));
        };
        
        reader.readAsDataURL(file);
      });
    } catch (err) {
      setIsUploading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    uploadImage,
    isUploading,
    error,
    clearError
  };
}