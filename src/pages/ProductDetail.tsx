import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/api/productsApi';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, ArrowLeft, Check, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(Number(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    setLoading(true);
    const { data } = await getProductById(productId);
    setProduct(data);
    setLoading(false);
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
          <div className="space-y-6">
            <div className="relative aspect-square bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500" />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="px-3 py-1 font-semibold text-sm shadow-sm backdrop-blur-md bg-white/90">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>
          </div>

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
