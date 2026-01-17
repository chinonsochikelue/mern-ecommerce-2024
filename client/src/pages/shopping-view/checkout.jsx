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
import { Mail, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  
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
    setIsPaymemntStart(true);
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      setIsPaymemntStart(false);
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      setIsPaymemntStart(false);
      return;
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
      orderStatus: "Email Consultation",
      paymentMethod: "email",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        const orderId = data.payload.orderId || "Pending";
        
        // Construct detailed email template
        const emailSubject = encodeURIComponent(`Bespoke Consultation Request - Order #${orderId}`);
        const itemsList = cartItems.items.map((item, index) => 
          `${index + 1}. ${item.title} (Qty: ${item.quantity}) - $${item.salePrice > 0 ? item.salePrice : item.price}`
        ).join('%0D%0A');

        const emailBody = encodeURIComponent(
          `Hello Bespoke Tailors,%0D%0A%0D%0AI would like to request a consultation for the following items:%0D%0A%0D%0A--- Order Details ---%0D%0AOrder ID: ${orderId}%0D%0ACustomer: ${user?.userName}%0D%0APhone: ${currentSelectedAddress?.phone}%0D%0A%0D%0A--- Items ---%0D%0A${itemsList}%0D%0A%0D%0A--- Final Amount ---%0D%0ATotal: $${totalCartAmount}%0D%0A%0D%0A--- Shipping Address ---%0D%0A${currentSelectedAddress?.address}%0D%0A${currentSelectedAddress?.city}, ${currentSelectedAddress?.pincode}%0D%0A%0D%0AAdditional Notes: ${currentSelectedAddress?.notes || 'None'}%0D%0A%0D%0AThank you.%0D%0A`
        );

        const mailtoUrl = `mailto:bespoketailors@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        toast({
          title: "Order Saved!",
          description: "Redirecting to email for consultation details...",
        });

        window.location.href = mailtoUrl;
        setIsPaymemntStart(false);
      } else {
        setIsPaymemntStart(false);
        toast({
          title: "Error creating order",
          variant: "destructive"
        });
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
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "Georgia, serif" }}>
              <Mail className="w-5 h-5 text-yellow-600" />
              Bespoke Consultation
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              To maintain our commitment to mastery and precision, all final selections go through a personalized consultation. 
              Clicking below will save your order and open your email to coordinate with our master tailors.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Verified Bespoke Protocol
              </div>
              <Button 
                onClick={handleCheckout} 
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-7 rounded-lg shadow-xl hover:shadow-yellow-600/20 transition-all text-lg" 
                disabled={isPaymentStart}
              >
                {isPaymentStart ? "Saving Order..." : "Proceed to Consultation"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
