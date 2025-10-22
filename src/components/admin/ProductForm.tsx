import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { Product } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (formData: FormData) => void;
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
  const { toast } = useToast();
    const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    price: initialData?.price || 0,
    image: initialData?.image || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    stock: initialData?.stock || 0
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
            const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('brand', formData.brand);
      submitData.append('price', formData.price.toString());
      // Ensure category is always a string
      const categoryValue = typeof formData.category === 'string' ? formData.category : '';
      submitData.append('category', categoryValue);
      submitData.append('description', formData.description);
      submitData.append('stock', formData.stock.toString());

            if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          submitData.append('images', file);
        });
      }

      onSubmit(submitData);
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to create/update product",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    // Check if total files exceeds limit
    if (selectedFiles.length + fileArray.length > 7) {
      toast({
        title: "Too many images",
        description: "You can only upload up to 7 images",
        variant: "destructive",
      });
      return;
    }

    // Check file sizes
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      
      // Create preview URLs
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
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
                value={typeof formData.category === 'string' ? formData.category : ''} 
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
              <Label htmlFor="image">Product Images * (5-7 recommended)</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors w-full justify-center"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">
                      {selectedFiles.length > 0 
                        ? `${selectedFiles.length} image${selectedFiles.length > 1 ? 's' : ''} selected` 
                        : "Choose images (max 10MB each, up to 7 images)"}
                    </span>
                  </Label>
                </div>
                
                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-lg border" 
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-1 left-1 text-xs">Main</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Show existing images if editing */}
                {initialData?.images && initialData.images.length > 0 && selectedFiles.length === 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Current images:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {initialData.images.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img} 
                            alt={`Current ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg border" 
                          />
                          {index === 0 && (
                            <Badge className="absolute bottom-1 left-1 text-xs">Main</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  💡 Tip: The first image will be used as the main product image
                </p>
              </div>
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
              <Label htmlFor="stock">Stock Count *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                placeholder="Enter stock count"
                required
              />
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



      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        <Button
          type="submit"
          className="gradient-primary text-primary-foreground border-0 btn-glow"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : (initialData ? "Update Product" : "Create Product")}
        </Button>
      </div>
    </form>
  );
};