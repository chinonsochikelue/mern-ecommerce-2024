import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Briefcase,
  Sparkles,
  Crown,
  Shirt,
  Watch,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchAllFilteredProducts,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "business-suits", label: "Business Suits", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400" },
  { id: "wedding-suits", label: "Wedding Suits", image: "https://images.unsplash.com/photo-1522968439036-e6338d0ed84f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: "tuxedos", label: "Tuxedos", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" },
  { id: "dress-shirts", label: "Dress Shirts", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400" },
  { id: "accessories", label: "Accessories", image: "https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?w=400" },
];

const brandsWithIcon = [
  { id: "tom-ford", label: "Tom Ford", icon: Crown },
  { id: "brioni", label: "Brioni", icon: Sparkles },
  { id: "zegna", label: "Ermenegildo Zegna", icon: Briefcase },
  { id: "canali", label: "Canali", icon: Shirt },
  { id: "hugo-boss", label: "Hugo Boss", icon: Watch },
  { id: "armani", label: "Giorgio Armani", icon: Crown },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    navigate(`/shop/product/${getCurrentProductId}`);
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden group">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{fontFamily: 'Georgia, serif'}}>
            Bespoke Mastery in Every Stitch
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Discover our exclusive collection of premium men's suits, handcrafted with the finest materials
          </p>
          <Button 
            onClick={() => navigate("/shop/listing")}
            size="lg"
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-400 font-semibold px-8 py-6 text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 shadow-xl"
          >
            Explore Collection
          </Button>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* Shop by Category Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-yellow-800 to-gray-900 bg-clip-text text-transparent" style={{fontFamily: 'Georgia, serif'}}>
            Shop by Collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white group overflow-hidden"
              >
                <CardContent className="flex flex-col items-center justify-center p-0 relative h-48">
                  <img 
                    src={categoryItem.image} 
                    alt={categoryItem.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <span className="font-bold text-white text-lg absolute bottom-4 z-10 group-hover:text-yellow-400 transition-colors" style={{fontFamily: 'Georgia, serif'}}>
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-yellow-800 to-gray-900 bg-clip-text text-transparent" style={{fontFamily: 'Georgia, serif'}}>
            Luxury Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white group overflow-hidden"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 to-yellow-800/0 group-hover:from-yellow-600/10 group-hover:to-yellow-800/10 transition-all duration-300" />
                  <brandItem.icon className="w-12 h-12 mb-3 text-gray-700 group-hover:text-yellow-700 transition-colors relative z-10" />
                  <span className="font-semibold text-gray-800 group-hover:text-yellow-800 transition-colors relative z-10" style={{fontFamily: 'Georgia, serif'}}>
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-yellow-800 to-gray-900 bg-clip-text text-transparent" style={{fontFamily: 'Georgia, serif'}}>
            Signature Collection
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[300px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))
            ) : productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;
