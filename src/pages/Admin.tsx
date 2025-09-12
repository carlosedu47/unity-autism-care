import { useState, useEffect } from "react";
import ContentManager from "@/components/ContentManager";
import AdminLogin from "@/components/AdminLogin";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAuthenticated(auth === "true");
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ContentManager />
    </div>
  );
};

export default Admin;