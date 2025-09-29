import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Product } from "@/data/mockProducts";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
}

const categories = [
  "Smartphones",
  "Laptops", 
  "Headphones",
  "Smart Watches",
  "Gaming",
  "Accessories"
];

export const ProductForm = ({ initialData, onSubmit }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    price: initialData?.price || 0,
    originalPrice: initialData?.originalPrice || 0,
    rating: initialData?.rating || 0,
    reviewCount: initialData?.reviewCount || 0,
    image: initialData?.image || "",
    category: initialData?.category || "",
    isNew: initialData?.isNew || false,
    description: initialData?.description || "",
    features: initialData?.features || [],
    inStock: initialData?.inStock ?? true,
    stockCount: initialData?.stockCount || 0
  });

  const [newFeature, setNewFeature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                placeholder="Enter brand name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="Enter image URL"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Stock */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pricing & Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="price">Price (₦) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <Label htmlFor="originalPrice">Original Price (₦)</Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value) || undefined})}
                placeholder="Enter original price (optional)"
              />
            </div>

            <div>
              <Label htmlFor="stockCount">Stock Count *</Label>
              <Input
                id="stockCount"
                type="number"
                value={formData.stockCount}
                onChange={(e) => setFormData({...formData, stockCount: parseInt(e.target.value) || 0})}
                placeholder="Enter stock count"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData({...formData, inStock: checked})}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => setFormData({...formData, isNew: checked})}
              />
              <Label htmlFor="isNew">Mark as New</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Enter product description"
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="gradient-primary text-primary-foreground border-0 btn-glow">
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
};