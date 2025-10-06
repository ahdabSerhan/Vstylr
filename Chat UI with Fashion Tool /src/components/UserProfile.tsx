import React, { useState } from 'react';
import { User, X, Ruler, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockUserData = {
  name: "Emma Wilson",
  age: 28,
  image: "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU4NjQyNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  height: "5'6\"",
  measurements: {
    bust: "34\"",
    waist: "26\"",
    hips: "36\"",
    shoulders: "15\"",
    inseam: "30\""
  },
  preferredSizes: {
    tops: "S",
    bottoms: "M",
    dresses: "S-M",
    shoes: "8.5"
  },
  stylePreferences: ["Minimalist", "Classic", "Casual Chic"]
};

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[9999998] backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Profile Modal */}
      <div className="fixed inset-0 z-[99999999] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-white shadow-2xl">
          <CardHeader className="relative pb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-2 right-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={mockUserData.image} alt={mockUserData.name} />
                <AvatarFallback className="text-lg">
                  {mockUserData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold">{mockUserData.name}</h2>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{mockUserData.age} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler className="w-4 h-4" />
                    <span>{mockUserData.height}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Body Measurements */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Body Measurements
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bust:</span>
                  <span className="font-medium">{mockUserData.measurements.bust}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waist:</span>
                  <span className="font-medium">{mockUserData.measurements.waist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hips:</span>
                  <span className="font-medium">{mockUserData.measurements.hips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shoulders:</span>
                  <span className="font-medium">{mockUserData.measurements.shoulders}</span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-muted-foreground">Inseam:</span>
                  <span className="font-medium">{mockUserData.measurements.inseam}</span>
                </div>
              </div>
            </div>
            
            {/* Preferred Sizes */}
            <div>
              <h3 className="text-sm font-medium mb-3">Preferred Sizes</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tops:</span>
                  <Badge variant="secondary">{mockUserData.preferredSizes.tops}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bottoms:</span>
                  <Badge variant="secondary">{mockUserData.preferredSizes.bottoms}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dresses:</span>
                  <Badge variant="secondary">{mockUserData.preferredSizes.dresses}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shoes:</span>
                  <Badge variant="secondary">{mockUserData.preferredSizes.shoes}</Badge>
                </div>
              </div>
            </div>
            
            {/* Style Preferences */}
            <div>
              <h3 className="text-sm font-medium mb-3">Style Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {mockUserData.stylePreferences.map((style, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Button variant="outline" className="w-full" size="sm">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Update Measurements
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Add New Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}