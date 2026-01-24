import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/api/productsApi';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, ArrowLeft, Check, Truck, ShieldCheck, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setLoading(true);
    const { data } = await getProductById(productId);
    setProduct(data);
    setSelectedImageIndex(0);
    setLoading(false);
  };

  // Get all images from the product
  const getProductImages = (product: Product): string[] => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    // Fallback to single image for backward compatibility
    if (product.image) {
      return [product.image];
    }
    return ['https://via.placeholder.com/800'];
  };

  const handlePreviousImage = () => {
    if (!product) return;
    const images = getProductImages(product);
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!product) return;
    const images = getProductImages(product);
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild>
          <Link to="/sales">Back to Sales</Link>
        </Button>
      </div>
    );
  }

  const images = getProductImages(product);
  const hasMultipleImages = images.length > 1;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/sales" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl border border-border overflow-hidden shadow-sm group">
              <img 
                src={images[selectedImageIndex]} 
                alt={`${product.name} - Image ${selectedImageIndex + 1}`} 
                className="w-full h-full object-contain p-8 transition-transform duration-500" 
              />
              
              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                    onClick={handlePreviousImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="px-3 py-1 font-semibold text-sm shadow-sm backdrop-blur-md bg-white/90">
                    {product.badge}
                  </Badge>
                </div>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImageIndex === index 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2 text-primary font-medium text-sm uppercase tracking-wide">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className={cn(
                "flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full border",
                product.inStock ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
              )}>
                {product.inStock ? (<><Check className="h-3.5 w-3.5" /> In Stock</>) : "Out of Stock"}
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8 pb-8 border-b border-border">
              <div className="text-4xl font-bold text-foreground">₹{product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <>
                  <div className="text-xl text-muted-foreground line-through mb-1.5">₹{product.originalPrice.toLocaleString()}</div>
                  <Badge variant="destructive" className="mb-2 ml-1">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="prose prose-slate max-w-none text-muted-foreground mb-8">
              <h3 className="text-foreground font-semibold text-lg mb-2">Description</h3>
              <p className="leading-relaxed">{product.description}</p>
            </div>

            {product.specs && (
              <div className="mb-8">
                <h3 className="text-foreground font-semibold text-lg mb-4">Key Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg border border-border/50">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild size="lg" className="flex-1 text-base h-12">
                <a href="https://wa.me/919853839432" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Buy via WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1 text-base h-12 border-primary/20 hover:bg-primary/5 hover:text-primary">
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Best Deal
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground bg-secondary/20 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast Delivery Available</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Official Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
