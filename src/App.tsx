import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { BubbleNav } from "@/components/navigation/BubbleNav";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import SystemsCatalog from "./pages/SystemsCatalog";
import SystemPage from "./pages/SystemPage";
import Dashboard from "./pages/Dashboard";
import ChatbotPage from "./pages/ChatbotPage";
import OutputPreview from "./pages/OutputPreview";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import { CursorGlow } from "@/components/ui/cursor-glow";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// App routes wrapper (needs to be inside BrowserRouter for useLocation)
function AppRoutes() {
  return (
    <>
      <BubbleNav />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/info" element={<ProtectedRoute><InfoPage /></ProtectedRoute>} />
        <Route path="/systems" element={<ProtectedRoute><SystemsCatalog /></ProtectedRoute>} />
        <Route path="/system/:slug" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/output-preview" element={<ProtectedRoute><OutputPreview /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />

        {/* Legacy routes redirect */}
        <Route path="/wind-turbines" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/power-transformers" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/industrial-motors" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/bridges" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/servers" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/icu-monitoring" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/cnc-machines" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />
        <Route path="/hvac-systems" element={<ProtectedRoute><SystemPage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CursorGlow />
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
