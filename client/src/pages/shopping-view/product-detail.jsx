import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import StarRatingComponent from "@/components/common/star-rating";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import {
  fetchProductDetails,
  fetchAllFilteredProducts,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const { productDetails, productList } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  // Get images array
  const productImages = Array.isArray(productDetails?.image)
    ? productDetails?.image
    : productDetails?.image
    ? [productDetails?.image]
    : [];

  // Calculate average review
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  // Get recommended products (same category, exclude current product)
  const recommendedProducts =
    productList && productDetails
      ? productList
          .filter(
            (product) =>
              product.category === productDetails.category &&
              product._id !== productDetails._id
          )
          .slice(0, 4)
      : [];

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
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
          title: "Product added to cart",
        });
      }
    });
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
      dispatch(
        fetchAllFilteredProducts({
          filterParams: {},
          sortParams: "price-lowtohigh",
        })
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  if (!productDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/shop/home")}
          className="group"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Button>
      </div>

      {/* Product Details Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl group">
              <img
                src={productImages[selectedImageIndex]}
                alt={productDetails?.title}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {productDetails?.totalStock === 0 ? (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 px-4 py-2 text-sm">
                  Out Of Stock
                </Badge>
              ) : productDetails?.totalStock < 10 ? (
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm">
                  Only {productDetails?.totalStock} left
                </Badge>
              ) : productDetails?.salePrice > 0 ? (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm">
                  Sale
                </Badge>
              ) : null}
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${productDetails?.title} ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-500 scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {productDetails?.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {productDetails?.description}
              </p>
            </div>

            {/* Category & Brand */}
            <div className="flex gap-3">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2">
                {categoryOptionsMap[productDetails?.category]}
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2">
                {brandOptionsMap[productDetails?.brand]}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRatingComponent rating={averageReview} />
              <span className="text-gray-600 font-medium">
                {averageReview.toFixed(1)} ({reviews?.length || 0} reviews)
              </span>
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span
                className={`text-4xl font-bold ${
                  productDetails?.salePrice > 0
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                ${productDetails?.price}
              </span>
              {productDetails?.salePrice > 0 && (
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${productDetails?.salePrice}
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <div className="pt-4">
              {productDetails?.totalStock === 0 ? (
                <Button
                  disabled
                  className="w-full py-7 text-lg bg-gray-400 cursor-not-allowed"
                >
                  Out of Stock
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                  className="w-full py-7 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12 border-2 border-blue-200">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900">
                            {reviewItem?.userName}
                          </h3>
                          <StarRatingComponent rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-gray-600">{reviewItem.reviewMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 rounded-xl text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">No reviews yet</p>
                  <p className="text-gray-400 text-sm">Be the first to review this product!</p>
                </div>
              )}
            </div>

            {/* Write Review */}
            <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-4">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Your Rating</Label>
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={setRating}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Your Review</Label>
                  <Input
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === "" || rating === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
