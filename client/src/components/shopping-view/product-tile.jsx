import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-sm mx-auto group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0">
      <div onClick={() => navigate(`/shop/product/${product?._id}`)} className="cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={product?.image[0]}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-full">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-3 py-1.5 rounded-full">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product?.title}
          </h2>
          {/* Product short description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product?.description}
          </p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400" : "text-gray-900"
              } text-md md:text-lg font-semibold`}
            >
              {/* format the price to 00,000.00 */}
              ${product?.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-md md:text-2xl font-bold text-blue-600">
                ${product?.salePrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed bg-gray-400">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product?._id, product?.totalStock);
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 rounded-lg transform group-hover:scale-105 transition-all duration-300"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
