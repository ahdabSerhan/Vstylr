import React from 'react';
import { User, Ruler, Eye, Palette, Sparkles, ShirtIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface BodyMeasurements {
  height: string;
  bust: string;
  waist: string;
  hips: string;
  shoulders: string;
  inseam: string;
}

interface PersonalAnalysis {
  bodyShape: string;
  bodyShapeConfidence: number;
  skinTone: string;
  skinToneCategory: 'warm' | 'cool' | 'neutral';
  eyeColor: string;
  hairColor: string;
  measurements: BodyMeasurements;
  personalityType: string;
  stylePersonality: string[];
}

interface StyleRecommendations {
  bestSilhouettes: string[];
  colorsToWear: string[];
  colorsToAvoid: string[];
  fabricsToChoose: string[];
  stylingTips: string[];
  accessoryGuidance: string[];
}

interface EnhancedFashionAnalysisProps {
  personalAnalysis: PersonalAnalysis;
  styleRecommendations: StyleRecommendations;
  onAnalysisComplete?: () => void;
}

export function EnhancedFashionAnalysis({ 
  personalAnalysis, 
  styleRecommendations,
  onAnalysisComplete 
}: EnhancedFashionAnalysisProps) {
  
  const getSkinToneColors = (category: 'warm' | 'cool' | 'neutral') => {
    switch (category) {
      case 'warm':
        return ['bg-orange-400', 'bg-yellow-400', 'bg-red-500', 'bg-amber-500'];
      case 'cool':
        return ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'];
      case 'neutral':
        return ['bg-gray-500', 'bg-slate-600', 'bg-stone-500', 'bg-neutral-500'];
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onAnalysisComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onAnalysisComplete]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl">Complete Fashion Analysis</h2>
              <p className="text-sm text-muted-foreground font-normal">
                AI-powered comprehensive style assessment
              </p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Body Shape Analysis */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <ShirtIcon className="w-4 h-4" />
                  Body Shape
                </h4>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {personalAnalysis.bodyShape}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analysis Confidence</span>
                  <span>{personalAnalysis.bodyShapeConfidence}%</span>
                </div>
                <Progress value={personalAnalysis.bodyShapeConfidence} className="h-2" />
              </div>
            </div>

            {/* Skin Tone Analysis */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Skin Tone Analysis
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {getSkinToneColors(personalAnalysis.skinToneCategory).map((color, index) => (
                    <div key={index} className={`w-4 h-4 rounded-full ${color}`} />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{personalAnalysis.skinTone}</span>
                  <span className="text-muted-foreground ml-2">
                    ({personalAnalysis.skinToneCategory} undertones)
                  </span>
                </div>
              </div>
            </div>

            {/* Eye & Hair Color */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4" />
                  Eye Color
                </h4>
                <Badge variant="outline">{personalAnalysis.eyeColor}</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Hair Color</h4>
                <Badge variant="outline">{personalAnalysis.hairColor}</Badge>
              </div>
            </div>

            {/* Style Personality */}
            <div className="space-y-3">
              <h4 className="font-medium">Style Personality</h4>
              <div className="flex flex-wrap gap-2">
                {personalAnalysis.stylePersonality.map((style, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Measurements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-primary" />
              Body Measurements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Height</label>
                  <div className="text-lg font-semibold text-primary">
                    {personalAnalysis.measurements.height}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Shoulders</label>
                  <div className="text-lg font-semibold text-primary">
                    {personalAnalysis.measurements.shoulders}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Bust</label>
                  <div className="text-lg font-semibold text-primary">
                    {personalAnalysis.measurements.bust}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Waist</label>
                  <div className="text-lg font-semibold text-primary">
                    {personalAnalysis.measurements.waist}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Hips</label>
                  <div className="text-lg font-semibold text-primary">
                    {personalAnalysis.measurements.hips}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Inseam</label>
                <div className="text-lg font-semibold text-primary">
                  {personalAnalysis.measurements.inseam}
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Measurements are estimated using AI analysis. 
                  For perfect fit, we recommend professional measuring.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Style Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Personalized Style Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Best Silhouettes */}
            <div className="space-y-3">
              <h4 className="font-medium text-primary">✨ Best Silhouettes for You</h4>
              <ul className="space-y-2">
                {styleRecommendations.bestSilhouettes.map((silhouette, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{silhouette}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors to Wear */}
            <div className="space-y-3">
              <h4 className="font-medium text-emerald-600">🎨 Your Perfect Colors</h4>
              <div className="flex flex-wrap gap-2">
                {styleRecommendations.colorsToWear.map((color, index) => (
                  <Badge key={index} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Colors to Avoid */}
            <div className="space-y-3">
              <h4 className="font-medium text-orange-600">⚠️ Colors to Limit</h4>
              <div className="flex flex-wrap gap-2">
                {styleRecommendations.colorsToAvoid.map((color, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Fabric Recommendations */}
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">🧵 Ideal Fabrics</h4>
              <ul className="space-y-2">
                {styleRecommendations.fabricsToChoose.map((fabric, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{fabric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Styling Tips */}
            <div className="space-y-3">
              <h4 className="font-medium text-purple-600">💡 Pro Styling Tips</h4>
              <ul className="space-y-2">
                {styleRecommendations.stylingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accessory Guidance */}
            <div className="space-y-3">
              <h4 className="font-medium text-pink-600">💎 Accessory Guide</h4>
              <ul className="space-y-2">
                {styleRecommendations.accessoryGuidance.map((guidance, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{guidance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Prompt */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6 text-center">
          <h3 className="font-medium mb-2">Ready to Shop Your Perfect Style?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tell me what you'd like to wear and I'll curate pieces that perfectly complement your analysis!
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Casual outfits</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Work attire</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Date night looks</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Special events</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}