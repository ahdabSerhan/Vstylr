import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Badge } from './ui/badge';

interface EcommerceHomepageProps {
  onChatOpen: () => void;
}

export function EcommerceHomepage({ onChatOpen }: EcommerceHomepageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">ZARA</h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">WOMAN</a>
              <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">MAN</a>
              <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">KIDS</a>
              <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">HOME</a>
              <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">BEAUTY</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1694232426671-56fcc32bf5b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBjbG90aGluZyUyMHN0b3JlfGVufDF8fHx8MTc1ODg4OTI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hero Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">NEW COLLECTION</h1>
            <p className="text-lg md:text-xl mb-8 font-light">Discover the latest trends</p>
            <Button variant="outline" className="bg-white text-black hover:bg-white/90">
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Women's Category */}
            <div className="relative group overflow-hidden rounded-lg">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1651335794520-fb1066d93a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhc2hpb24lMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1ODc3NzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Women's Collection"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-light mb-2">WOMAN</h3>
                <Button variant="outline" size="sm" className="bg-white text-black hover:bg-white/90">
                  EXPLORE
                </Button>
              </div>
            </div>

            {/* Men's Category */}
            <div className="relative group overflow-hidden rounded-lg">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1665832102899-2b3f12cf991e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBmYXNoaW9uJTIwY2FzdWFsJTIwd2VhcnxlbnwxfHx8fDE3NTg4MzQ0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Men's Collection"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-light mb-2">MAN</h3>
                <Button variant="outline" size="sm" className="bg-white text-black hover:bg-white/90">
                  EXPLORE
                </Button>
              </div>
            </div>

            {/* Special Collection */}
            <div className="relative group overflow-hidden rounded-lg md:col-span-1 lg:col-span-1">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1531347058246-6dfef49b7b7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc1ODg4Njk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Special Collection"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-white text-black">NEW</Badge>
              </div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-light mb-2">SPECIAL EDITION</h3>
                <Button variant="outline" size="sm" className="bg-white text-black hover:bg-white/90">
                  DISCOVER
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center mb-12">TRENDING NOW</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1: Midi Dress */}
            <div className="group cursor-pointer" onClick={() => onChatOpen()}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1709281961493-a9acb8558177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWlkaSUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTg4ODk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ribbed Midi Dress"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">RIBBED MIDI DRESS</h3>
                <p className="text-muted-foreground text-sm">Dresses</p>
                <p className="font-medium">€45.95</p>
              </div>
            </div>

            {/* Product 2: Summer Dress */}
            <div className="group cursor-pointer" onClick={() => onChatOpen()}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1698648438792-cb5ed8de6bdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzdW1tZXIlMjBkcmVzcyUyMHdvbWVufGVufDF8fHx8MTc1ODg4OTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Floral Mini Dress"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">FLORAL MINI DRESS</h3>
                <p className="text-muted-foreground text-sm">Dresses</p>
                <p className="font-medium">€39.95</p>
              </div>
            </div>

            {/* Product 3: Wide Leg Trousers */}
            <div className="group cursor-pointer" onClick={() => onChatOpen()}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1551374332-2c48196ae690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWRlJTIwbGVnJTIwdHJvdXNlcnMlMjB3b21lbiUyMGZhc2hpb258ZW58MXx8fHwxNzU4ODg5ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Wide Leg Trousers"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">WIDE LEG TROUSERS</h3>
                <p className="text-muted-foreground text-sm">Trousers</p>
                <p className="font-medium">€49.95</p>
              </div>
            </div>

            {/* Product 4: Tailored Pants */}
            <div className="group cursor-pointer" onClick={() => onChatOpen()}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1650633908016-fac3d992e47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3JlZCUyMHBhbnRzJTIwd29tZW4lMjBvZmZpY2V8ZW58MXx8fHwxNzU4ODg5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tailored Cigarette Pants"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">TAILORED CIGARETTE PANTS</h3>
                <p className="text-muted-foreground text-sm">Trousers</p>
                <p className="font-medium">€35.95</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-4">STAY IN THE LOOP</h2>
          <p className="text-lg mb-8 opacity-80">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background text-foreground rounded-l-lg focus:outline-none focus:ring-2 focus:ring-background"
            />
            <Button className="px-6 py-3 bg-background text-foreground hover:bg-background/90 rounded-r-lg">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">COMPANY</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">HELP</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Customer Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">SHOP</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Women</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Men</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Kids</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Home</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">CONNECT</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ZARA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}