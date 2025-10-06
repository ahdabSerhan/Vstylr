import React, { useState, useRef } from "react";
import { Upload, Camera, X, Car } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CarImageUploadProps {
  onImageUpload: (imageData: string, file: File) => void;
  onCancel?: () => void;
  className?: string;
}

export function CarImageUpload({ onImageUpload, onCancel, className }: CarImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmUpload = () => {
    console.log('Analyze button clicked!', { preview: !!preview, selectedFile: !!selectedFile });
    if (preview && selectedFile) {
      console.log('Calling onImageUpload with:', { preview: preview.substring(0, 50) + '...', fileName: selectedFile.name });
      onImageUpload(preview, selectedFile);
    } else {
      console.error('Missing data for upload:', { preview: !!preview, selectedFile: !!selectedFile });
    }
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (preview) {
    return (
      <Card className={className}>
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Car className="w-5 h-5" />
              Car Image Preview
            </h3>
            <Button variant="ghost" size="icon" onClick={handleClear}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="aspect-video rounded-lg overflow-hidden border border-border">
            <ImageWithFallback
              src={preview}
              alt="Car preview"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              🚗 Ready to analyze your car! I'll identify the make, model, year, color, and visible parts to provide personalized upgrade recommendations.
            </p>
            
            <div className="flex gap-3">
              <Button onClick={() => {
                  console.log('Button clicked!');
                  handleConfirmUpload();
                }} className="flex-1" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Analyze This Car
              </Button>
              <Button variant="outline" onClick={handleClear} size="lg">
                Choose Different Image
              </Button>
            </div>
            
            {onCancel && (
              <div className="flex justify-center">
                <Button variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Car className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Upload Your Car Image</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Take a clear photo of your car from the front, side, or at an angle for best analysis results. 
                I'll identify the make, model, year, and suggest compatible upgrades.
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xs mx-auto"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose Image
              </Button>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Supported formats: JPG, PNG, WebP (Max 10MB)
                </p>
                <p className="text-xs text-muted-foreground">
                  💡 Pro tip: Take the photo in good lighting with the entire car visible for the most accurate analysis
                </p>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {onCancel && (
          <div className="mt-6 flex justify-end">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}