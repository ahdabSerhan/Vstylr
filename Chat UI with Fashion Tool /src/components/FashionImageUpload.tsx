import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useImageUpload } from './hooks/useImageUpload';
import { WebcamCapture } from './WebcamCapture';

interface FashionImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  onClose: () => void;
}

export function FashionImageUpload({ onImageUpload, onClose }: FashionImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading, error, clearError } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    if (file) {
      try {
        clearError();
        const imageUrl = await uploadImage(file);
        onImageUpload(imageUrl);
      } catch (err) {
        // Error is handled by the hook
        console.error('Failed to upload image:', err);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    // Check if webcam is supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setShowWebcam(true);
    } else {
      // Fallback to file input with camera capture
      cameraInputRef.current?.click();
    }
  };

  const handleWebcamCapture = async (imageUrl: string) => {
    try {
      clearError();
      // Convert blob URL to file for upload
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
      const uploadedUrl = await uploadImage(file);
      onImageUpload(uploadedUrl);
      setShowWebcam(false);
    } catch (err) {
      console.error('Failed to upload webcam image:', err);
      setShowWebcam(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  if (showWebcam) {
    return (
      <WebcamCapture
        onCapture={handleWebcamCapture}
        onClose={() => setShowWebcam(false)}
      />
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium">Upload Your Photo</h2>
          <p className="text-sm text-muted-foreground">Get personalized styling advice based on your look</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="font-medium mb-2">Share Your Style</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Upload a photo to get personalized fashion recommendations
          </p>

          <div className="space-y-3">
            <Button 
              onClick={handleCameraClick}
              className="w-full"
              variant="default"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Processing...' : 'Take Photo'}
            </Button>
            
            <Button 
              onClick={handleUploadClick}
              variant="outline"
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Processing...' : 'Upload from Device'}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: JPG, PNG, WEBP (max 10MB)
          </p>
        </CardContent>
      </Card>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Tips */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-sm mb-2">Tips for best styling advice:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Include your full outfit or the piece you want styled</li>
          <li>• Good lighting helps our AI see colors accurately</li>
          <li>• Show your natural pose and style</li>
          <li>• Multiple angles are welcome!</li>
        </ul>
      </div>
    </div>
  );
}