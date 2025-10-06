import React from 'react';
import { Lightbulb, Ruler, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Recommendation {
  title: string;
  advice: string;
  suggestedSizes: string[];
  styleNotes: string[];
}

interface StyleRecommendationProps {
  recommendation: Recommendation;
}

export function StyleRecommendation({ recommendation }: StyleRecommendationProps) {
  return (
    <Card className="bg-gradient-to-br from-accent/50 to-accent/30 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          {recommendation.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <p className="text-muted-foreground">{recommendation.advice}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Size Recommendations */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-medium">
              <Ruler className="w-4 h-4 text-primary" />
              Size Recommendations
            </h4>
            <div className="space-y-2">
              {recommendation.suggestedSizes.map((size, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background">
                    {size}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          {/* Style Notes */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 font-medium">
              <Palette className="w-4 h-4 text-primary" />
              Style Tips
            </h4>
            <ul className="space-y-2">
              {recommendation.styleNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}