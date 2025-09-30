import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/admin-logo.png";
import { processLogoBackground } from "@/utils/processLogo";

export const Footer = () => {
  const [processedLogo, setProcessedLogo] = useState(logo);

  useEffect(() => {
    const processLogo = async () => {
      try {
        const processedLogoUrl = await processLogoBackground(logo);
        setProcessedLogo(processedLogoUrl);
      } catch (error) {
        console.error('Failed to process logo:', error);
      }
    };
    
    processLogo();
  }, []);

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={processedLogo} alt="Easy Gadgets" className="h-36 w-auto object-contain drop-shadow-lg" />
            </div>
            <p className="text-muted-foreground">
              Your trusted destination for premium electronics, smartphones, laptops, and tech accessories.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                "About Us",
                "Contact", 
                "Shipping Info",
                "Returns",
                "Privacy Policy",
                "Terms of Service"
              ].map((link) => (
                <button
                  key={link}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categories</h4>
            <nav className="flex flex-col space-y-2">
              {[
                "Smartphones",
                "Laptops",
                "Headphones", 
                "Smart Watches",
                "Gaming",
                "Accessories"
              ].map((category) => (
                <button
                  key={category}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@easygadgets.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Tech Street, Digital City</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h5 className="font-medium text-foreground">Newsletter</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email"
                  className="flex-1"
                />
                <Button className="gradient-primary text-primary-foreground border-0 btn-glow">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Easy Gadgets. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </button>
            <button className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};