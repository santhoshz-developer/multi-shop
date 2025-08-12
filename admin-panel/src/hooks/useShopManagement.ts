// useShopManagement.ts
import { useReducer, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  fetchShopProducts,
  createShopProduct,
  updateShopProduct,
  deleteShopProduct,
  fetchAllShops,
  fetchShopCategory,
  fetchShopDetails,
} from "@/service/api/shopApi";

export interface ShopCategory {
  id: string;
  name: string;
  category_id: string;
}

export interface Shop {
  shop_id: string;
  name: string;
  description: string;
  location: string;
  logo_image?: string;
  banner_image?: string;
  qr_code_url?: string;
  categories: ShopCategory[];
}

export interface Product {
  product_id: string;
  name: string;
  price: string;
  stock_quantity: number;
  category_id: string;
  description: string;
  main_image: string;
}

export interface FormattedProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
  image: string;
}

interface ShopState {
  activeTab: number;
  isModalOpen: boolean;
  selectedProduct: FormattedProduct | null;
  shopId: string;
  error: string | null;
  qrModalOpen: boolean; // Added for QR code modal
}

type ShopAction =
  | { type: "SET_ACTIVE_TAB"; payload: number }
  | { type: "SET_MODAL_OPEN"; payload: boolean }
  | { type: "SET_SELECTED_PRODUCT"; payload: FormattedProduct | null }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_QR_MODAL_OPEN"; payload: boolean } // Added for QR code modal
  | { type: "CLEAR" };

const initialState: ShopState = {
  activeTab: 0,
  isModalOpen: false,
  selectedProduct: null,
  shopId: "",
  error: null,
  qrModalOpen: false,
};

const reducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_QR_MODAL_OPEN":
      return { ...state, qrModalOpen: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

const handleError =
  (dispatch: React.Dispatch<ShopAction>) =>
  (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    dispatch({ type: "SET_ERROR", payload: message });
    toast.error(message);
  };

export const useShopManagement = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const shopId = params?.id as string;
  const queryClient = useQueryClient();

  const handleErrorDispatch = handleError(dispatch);

  // Queries
  const {
    data: allShopsResponse,
    isLoading: isAllShopsLoading,
    error: allShopsError,
  } = useAllShopsData() as any;
  const allShops = allShopsResponse?.data ?? [];

  const {
    data: getShopDetailsResponse,
    isLoading: shopDetailsLoading,
    error: shopDetailsError,
  } = useFetchShopDetails(shopId) as any;

  const getShopDetails = getShopDetailsResponse?.data ?? [];

  const {
    data: shopProductsResponse,
    isLoading: isProductsLoading,
    error: shopProductsError,
  } = useFetchShopProducts(shopId, state.activeTab) as any;

  const shopProducts = shopProductsResponse?.data ?? [];

  const {
    data: categoryResponse,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useShopCategory(shopId) as any;

  const categories = categoryResponse?.data ?? [];

  // Handle query errors
  if (allShopsError) {
    handleErrorDispatch(allShopsError, "Failed to fetch shops");
  }
  if (shopProductsError) {
    handleErrorDispatch(shopProductsError, "Failed to fetch products");
  }
  if (categoryError) {
    handleErrorDispatch(categoryError, "Failed to fetch categories");
  }

  // Business Logic: Find the current shop
  const shop = useMemo(() => {
    if (!allShops.length || !shopId) return null;
    return allShops.find((s) => s.shop_id === shopId) || null;
  }, [allShops, shopId]);
const filteredProducts = useMemo(() => {
  if (!categories?.length || !shopProducts?.length) return [];

  // If activeTab = 0 → All Products
  if (state.activeTab === 0) {
    return shopProducts.map((product) => ({
      id: product.product_id,
      name: product.name,
      price: parseFloat(product.price),
      stock: product.stock_quantity,
      categoryId: product.category_id,
      description: product.description,
      image: product.main_image,
    }));
  }

  // Else → specific category (offset by -1 because of "All Products")
  const currentCategoryId = categories[state.activeTab - 1]?.category_id;

  return shopProducts
    .filter((p) => p.category_id === currentCategoryId)
    .map((product) => ({
      id: product.product_id,
      name: product.name,
      price: parseFloat(product.price),
      stock: product.stock_quantity,
      categoryId: product.category_id,
      description: product.description,
      image: product.main_image,
    }));
}, [shopProducts, categories, state.activeTab]);

  // Business Logic: Download QR Code
  const handleDownloadQR = useCallback(async () => {
    if (!shop?.qr_code_url) return;
    try {
      const response = await fetch(shop.qr_code_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${shop.name}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleErrorDispatch(error, "Failed to download QR code");
    }
  }, [shop]);

  // Mutation success handlers
  const handleCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["shopProducts", shopId] });
    toast.success("Product created successfully");
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  };

  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["shopProducts", shopId] });
    toast.success("Product updated successfully");
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  };

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["shopProducts", shopId] });
    toast.success("Product deleted successfully");
  };

  // Mutation error handlers
  const handleCreateError = (error: Error) =>
    handleErrorDispatch(error, "Failed to create product");
  const handleUpdateError = (error: Error) =>
    handleErrorDispatch(error, "Failed to update product");
  const handleDeleteError = (error: Error) =>
    handleErrorDispatch(error, "Failed to delete product");

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: (data: FormData) => createShopProduct(shopId, data),
    onSuccess: handleCreateSuccess,
    onError: handleCreateError,
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateShopProduct(shopId, id, formData),
    onSuccess: handleUpdateSuccess,
    onError: handleUpdateError,
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => deleteShopProduct(shopId, productId),
    onSuccess: handleDeleteSuccess,
    onError: handleDeleteError,
  });

  // Handlers
  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      dispatch({ type: "SET_ACTIVE_TAB", payload: newValue });
    },
    []
  );

  const openProductModal = useCallback(
    (product: FormattedProduct | null = null) => {
      dispatch({ type: "SET_SELECTED_PRODUCT", payload: product });
      dispatch({ type: "SET_MODAL_OPEN", payload: true });
    },
    []
  );

  const closeProductModal = useCallback(() => {
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: null });
  }, []);

  const handleProductSubmit = useCallback(
    (formData: FormData) => {
      if (state.selectedProduct) {
        updateProductMutation.mutate({
          id: state.selectedProduct.id,
          formData,
        });
      } else {
        createProductMutation.mutate(formData);
      }
    },
    [state.selectedProduct, createProductMutation, updateProductMutation]
  );

  const deleteProduct = useCallback(
    (productId: string) => {
      deleteProductMutation.mutate(productId);
    },
    [deleteProductMutation]
  );

  const openQrModal = useCallback(() => {
    dispatch({ type: "SET_QR_MODAL_OPEN", payload: true });
  }, []);

  const closeQrModal = useCallback(() => {
    dispatch({ type: "SET_QR_MODAL_OPEN", payload: false });
  }, []);

  // Format products for UI
  const formattedProducts = useMemo(() => {
    if (!shopProducts) return [];
    return shopProducts.map((product) => ({
      id: product.product_id,
      name: product.name,
      price: parseFloat(product.price),
      stock: product.stock_quantity,
      categoryId: product.category_id,
      description: product.description,
      image: product.main_image,
    }));
  }, [shopProducts]);

  return {
    state,
    shop,
    allShops,
    isAllShopsLoading,
    shopProducts: formattedProducts,
    filteredProducts,
    categories,
    isProductsLoading,
    isCategoryLoading,
    getShopDetails,
    shopDetailsLoading,
    shopDetailsError,
    handleTabChange,
    openProductModal,
    closeProductModal,
    handleProductSubmit,
    deleteProduct,
    openQrModal,
    closeQrModal,
    handleDownloadQR,
  };
};

// Custom hooks for queries (no dispatch, no toast inside)
const useAllShopsData = () =>
  useQuery<any[]>({
    queryKey: ["shops"],
    queryFn: fetchAllShops,
  });
const useFetchShopDetails = (shopId: string) =>
  useQuery({
    queryKey: ["shops", shopId],
    queryFn: () => fetchShopDetails(shopId),
    enabled: !!shopId,
  });
const useFetchShopProducts = (shopId: string, activeTab: number) =>
  useQuery<any[]>({
    queryKey: ["shopProducts", shopId, activeTab],
    queryFn: () => fetchShopProducts(shopId),
    enabled: !!shopId,
  });

const useShopCategory = (shopId: string) =>
  useQuery<any[]>({
    queryKey: ["shopCategories", shopId],
    queryFn: () => fetchShopCategory(shopId),
    enabled: !!shopId,
  });

// Custom hooks for mutations (with onSuccess/onError passed as parameters)
const useCreateProductMutation = (
  shopId: string,
  onSuccess: () => void,
  onError: (error: Error) => void
) =>
  useMutation({
    mutationFn: (data: FormData) => createShopProduct(shopId, data),
    onSuccess,
    onError,
  });

const useUpdateProductMutation = (
  shopId: string,
  onSuccess: () => void,
  onError: (error: Error) => void
) =>
  useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateShopProduct(shopId, id, formData),
    onSuccess,
    onError,
  });

const useDeleteProductMutation = (
  shopId: string,
  onSuccess: () => void,
  onError: (error: Error) => void
) =>
  useMutation({
    mutationFn: (productId: string) => deleteShopProduct(shopId, productId),
    onSuccess,
    onError,
  });
