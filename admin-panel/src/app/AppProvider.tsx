// app/AppProvider.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopLayout from "@/layouts/layout";

const queryClient = new QueryClient();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Paths where ShopLayout should NOT be shown
  const noLayoutPaths = ["/", "shop-dashboard"];

  // Or pattern match (for dynamic shop routes)
  const hideLayout =
    noLayoutPaths.includes(pathname) || pathname.startsWith("/shop-dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      {hideLayout ? children : <ShopLayout>{children}</ShopLayout>}
      <ToastContainer position="top-right" autoClose={3000} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
