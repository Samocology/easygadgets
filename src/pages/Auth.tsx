import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { Lock, Mail, User, Eye, EyeOff, Shield, Zap } from "lucide-react";

const Auth = () => {
  const { totalItems, refreshCart } = useCart();
  const { login, register, forgotPassword, verifyOtp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpType, setOtpType] = useState<'signup' | 'forgot'>('signup');
  const [newPassword, setNewPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      await refreshCart();
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast({
        title: "Error",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(loginData.email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      });
      setCurrentEmail(loginData.email);
      setOtpType('forgot');
      setShowOtpForm(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      await register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      toast({
        title: "Registration successful!",
        description: "Please check your email for OTP verification",
      });
      setCurrentEmail(signupData.email);
      setOtpType('signup');
      setShowOtpForm(true);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Unable to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (otpType === 'signup') {
        await verifyOtp(currentEmail, otp);
        toast({
          title: "Account verified!",
          description: "You have successfully verified your account.",
        });
        navigate('/');
      } else if (otpType === 'forgot') {
        await authService.resetPassword(otp, newPassword);
        toast({
          title: "Password reset successful!",
          description: "You can now log in with your new password.",
        });
        setShowOtpForm(false);
        setOtp('');
        setNewPassword('');
      }
    } catch (error: any) {
      toast({
        title: "OTP verification failed",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalItems} />
      
      {/* Hero Background Section */}
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10"></div>
        
        <div className="relative w-full max-w-lg mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 shadow-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Easy Gadgets
            </h1>
            <p className="text-muted-foreground text-lg">
              Your gateway to premium electronics
            </p>
          </div>

          {/* Auth Card */}
          {showOtpForm ? (
            <Card className="shadow-elevated border-0 gradient-card backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-semibold text-center">{otpType === 'signup' ? 'Verify Your Account' : 'Reset Your Password'}</CardTitle>
                <p className="text-center text-muted-foreground">
                  {otpType === 'signup' ? 'Check your email for the One-Time Password' : 'Enter the OTP and your new password'}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium">OTP</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10 h-12 transition-smooth focus:shadow-glow"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                  {otpType === 'forgot' && (
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow hover:shadow-glow transition-smooth font-medium"
                  >
                    {loading ? (otpType === 'signup' ? "Verifying..." : "Resetting...") : (otpType === 'signup' ? "Verify OTP" : "Reset Password")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
          <Card className="shadow-elevated border-0 gradient-card backdrop-blur-sm">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Create Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl font-semibold text-center">Welcome back</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Sign in to your account to continue
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          className="pl-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          className="pl-10 pr-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow hover:shadow-glow transition-smooth font-medium"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="signup" className="mt-0">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl font-semibold text-center">Create your account</CardTitle>
                  <p className="text-center text-muted-foreground">
                    Join thousands of satisfied customers
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">Full name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          placeholder="Enter your full name"
                          value={signupData.name}
                          onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                          className="pl-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          className="pl-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          className="pl-10 pr-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          className="pl-10 pr-10 h-12 transition-smooth focus:shadow-glow"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-12 gradient-primary text-primary-foreground border-0 shadow-glow hover:shadow-glow transition-smooth font-medium"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
          )}

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-1" />
                Encrypted
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                Fast
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
