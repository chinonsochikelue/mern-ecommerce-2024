import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import CommonImageUpload from "@/components/common/image-upload";
import { CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardFile, setGiftCardFile] = useState(null);
  const [giftCardImageUrl, setGiftCardImageUrl] = useState("");
  const [giftCardImageLoading, setGiftCardImageLoading] = useState(false);
  const [giftCardCodeFile, setGiftCardCodeFile] = useState(null);
  const [giftCardCodeImageUrl, setGiftCardCodeImageUrl] = useState("");
  const [giftCardCodeImageLoading, setGiftCardCodeImageLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "giftcard") {
      if (!giftCardCode) {
        toast({ title: "Please enter your gift card code.", variant: "destructive" });
        return;
      }
      if (!giftCardImageUrl || !giftCardCodeImageUrl) {
        toast({ title: "Please upload both the gift card image and the code image.", variant: "destructive" });
        return;
      }
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: paymentMethod === "giftcard" ? "confirmed" : "pending",
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "giftcard" ? "paid" : "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
      giftCardCode: paymentMethod === "giftcard" ? giftCardCode : "",
      giftCardCardImage: paymentMethod === "giftcard" ? giftCardImageUrl : "",
      giftCardCodeImage: paymentMethod === "giftcard" ? giftCardCodeImageUrl : "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        if (paymentMethod === "giftcard") {
          toast({ title: "Order placed successfully with gift card!" });
          navigate("/shop/payment-success");
        } else {
          setIsPaymemntStart(true);
        }
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paypal" className="flex items-center gap-2">
                  <Wallet className="w-4 h-4" /> PayPal
                </TabsTrigger>
                <TabsTrigger value="giftcard" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Gift Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="paypal" className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
              </TabsContent>
              <TabsContent value="giftcard" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="giftCardCode">Gift Card Code</Label>
                  <Input 
                    id="giftCardCode" 
                    placeholder="Enter your gift card code" 
                    value={giftCardCode} 
                    onChange={(e) => setGiftCardCode(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <CommonImageUpload 
                    label="Upload Gift Card Image"
                    imageFile={giftCardFile}
                    setImageFile={setGiftCardFile}
                    uploadedImageUrl={giftCardImageUrl}
                    setUploadedImageUrl={setGiftCardImageUrl}
                    imageLoadingState={giftCardImageLoading}
                    setImageLoadingState={setGiftCardImageLoading}
                  />
                  <CommonImageUpload 
                    label="Upload Gift Card Code Image"
                    imageFile={giftCardCodeFile}
                    setImageFile={setGiftCardCodeFile}
                    uploadedImageUrl={giftCardCodeImageUrl}
                    setUploadedImageUrl={setGiftCardCodeImageUrl}
                    imageLoadingState={giftCardCodeImageLoading}
                    setImageLoadingState={setGiftCardCodeImageLoading}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleCheckout} className="w-full" disabled={isPaymentStart || giftCardImageLoading || giftCardCodeImageLoading}>
              {isPaymentStart
                ? "Processing..."
                : paymentMethod === "paypal" ? "Checkout with Paypal" : "Place Order with Gift Card"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
