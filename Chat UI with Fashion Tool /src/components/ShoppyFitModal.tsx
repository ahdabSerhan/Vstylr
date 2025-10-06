import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { ImageUpload } from './ImageUpload';
import { TryOnResult } from './TryOnResult';
import { ThreeDModelViewer } from './ThreeDModelViewer';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  sizes: string[];
  color: string;
  category: string;
  recommendedSize?: string;
}

interface AnalysisData {
  measurements: {
    height: string;
    chest: string;
    waist: string;
    hips: string;
    shoulderWidth: string;
  };
  bodyShape: string;
  skinTone: string;
  eyeColor: string;
  recommendedStyles: string[];
  fitConfidence: number;
}

interface ShoppyFitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryOnSuccess?: (userImage: string) => void;
  onAnalysisComplete?: (analysisData: AnalysisData) => void;
  product: Product;
}

type ModalStep = 'upload' | 'result' | '3d-viewer';

export function ShoppyFitModal({ isOpen, onClose, onTryOnSuccess, onAnalysisComplete, product }: ShoppyFitModalProps) {
  const [step, setStep] = useState<ModalStep>('upload');
  const [userImage, setUserImage] = useState<string>('');

  // Reset state when modal opens/closes - MUST be called before early return
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setUserImage('');
    } else {
      // Reset state after modal is closed
      const timer = setTimeout(() => {
        setStep('upload');
        setUserImage('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageSelected = (imageUrl: string) => {
    setUserImage(imageUrl);
    setStep('result');
  };

  const handleTryAgain = () => {
    setUserImage('');
    setStep('upload');
  };

  const handleViewIn3D = () => {
    setStep('3d-viewer');
  };

  const handleContinueToChat = (analysisData: AnalysisData) => {
    onAnalysisComplete?.(analysisData);
    onClose();
  };

  const handleClose = () => {
    // Don't reset state immediately, let the parent handle it
    onClose();
  };


  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[99999999] backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Close button - positioned at top right corner */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="fixed top-4 right-4 z-[999999999] bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Modal Container */}
      <div className="fixed inset-0 z-[999999999] flex items-center justify-center p-4" onClick={handleOverlayClick}>
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {step === 'upload' && (
            <ImageUpload 
              onImageSelected={handleImageSelected}
              onClose={handleClose}
            />
          )}
          
          {step === 'result' && userImage && (
            <TryOnResult
              userImage={userImage}
              product={product}
              onClose={handleClose}
              onTryAgain={handleTryAgain}
              onTryOnSuccess={onTryOnSuccess}
              onViewIn3D={handleViewIn3D}
            />
          )}

          {step === '3d-viewer' && userImage && (
            <ThreeDModelViewer
              userImage={userImage}
              product={product}
              onClose={handleClose}
              onContinueToChat={handleContinueToChat}
              onKeepStyle={onTryOnSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
}