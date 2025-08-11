// src/hooks/useShopListingHooks.ts
import { fetchStorefrontData } from "@/service/api/shopApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useShopListingHooks = () => {
  const params = useParams();
  const shopId = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: shopRecord,
    isLoading,
    isError,
    error,
  } = useStorefront(shopId as string) as any;

  const { categories, products, shop } = shopRecord?.data || {};

  return {
    categories,
    products,
    shop,
    isLoading,
    isError,
    error,
    shopId,
  };
};

export const useStorefront = (shopId: string) =>
  useQuery({
    queryKey: ["storefront", shopId],
    queryFn: () => fetchStorefrontData(shopId),
    enabled: !!shopId,
  });
