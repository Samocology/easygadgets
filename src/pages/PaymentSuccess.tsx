import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { orderService } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart, totalItems } = useCart();
  const { toast } = useToast();

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('paymentReference');

      if (!reference) {
        setVerifying(false);
        return;
      }

      try {
        // Verify payment with backend
        const result = await orderService.verifyPayment(reference);

        if (result.success) {
          setSuccess(true);
          setOrderId(result.orderId);
          clearCart(); // Clear cart on successful payment
          toast({
            title: "Payment Successful",
            description: "Your order has been placed successfully!",
          });
        } else {
          setSuccess(false);
          toast({
            title: "Payment Failed",
            description: "Payment verification failed. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        setSuccess(false);
        toast({
          title: "Verification Error",
          description: error.message || "Unable to verify payment",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart, toast]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={totalItems} />
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold mb-2">Verifying Payment...</h1>
          <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItems} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                {success ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-500" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {success ? "Payment Successful!" : "Payment Failed"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {success ? (
                <>
                  <p className="text-muted-foreground">
                    Thank you for your purchase! Your order has been confirmed.
                  </p>
                  {orderId && (
                    <p className="text-sm text-muted-foreground">
                      Order ID: <span className="font-mono">{orderId}</span>
                    </p>
                  )}
                  <div className="space-y-2">
                    <Button
                      className="w-full gradient-primary text-primary-foreground border-0"
                      onClick={() => navigate('/profile')}
                    >
                      View Order History
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground">
                    We couldn't verify your payment. Please try again or contact support.
                  </p>
                  <div className="space-y-2">
                    <Button
                      className="w-full gradient-primary text-primary-foreground border-0"
                      onClick={() => navigate('/cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
