import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface WebcamCaptureProps {
  onCapture: (imageUrl: string) => void;
  onClose: () => void;
}

export function WebcamCapture({ onCapture, onClose }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      setIsInitializing(true);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsInitializing(false);
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check your permissions.');
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and create URL
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
      }
    }, 'image/jpeg', 0.8);

    setIsCapturing(true);
  };

  const retakePhoto = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
      setCapturedImage(null);
    }
    setIsCapturing(false);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  const handleClose = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
    stopCamera();
    onClose();
  };

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Camera Access</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="space-y-3">
          <Button onClick={startCamera} className="w-full">
            Try Again
          </Button>
          <Button onClick={onClose} variant="outline" className="w-full">
            Cancel
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Camera Troubleshooting:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Make sure you've allowed camera access</li>
            <li>• Check if another app is using your camera</li>
            <li>• Try refreshing the page</li>
            <li>• Use a different browser if issues persist</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium">Take Your Photo</h2>
          <p className="text-sm text-muted-foreground">
            {capturedImage ? 'Review your photo' : 'Position yourself in the frame'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="rounded-full"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Camera/Preview Area */}
      <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden mb-6">
        {isInitializing && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Starting camera...</p>
            </div>
          </div>
        )}

        {/* Live video feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${capturedImage ? 'hidden' : ''}`}
        />

        {/* Captured photo preview */}
        {capturedImage && (
          <img
            src={capturedImage}
            alt="Captured photo"
            className="w-full h-full object-cover"
          />
        )}

        {/* Camera overlay guides */}
        {!capturedImage && !isInitializing && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Face guide outline */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 h-64 border-2 border-white/40 rounded-full"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-sm text-center">
              <p className="bg-black/60 px-3 py-1 rounded-full">
                Position your face here
              </p>
            </div>
          </div>
        )}

        {/* Capture button overlay */}
        {!capturedImage && !isInitializing && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-white hover:bg-white/90 text-black"
              onClick={capturePhoto}
            >
              <Camera className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Action buttons */}
      {capturedImage ? (
        <div className="flex gap-3">
          <Button onClick={retakePhoto} variant="outline" className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake
          </Button>
          <Button onClick={confirmPhoto} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Use This Photo
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Tips */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Tips for best results:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Stand in front of a plain background</li>
              <li>• Ensure good lighting on your face</li>
              <li>• Keep your arms at your sides</li>
              <li>• Look directly at the camera</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}