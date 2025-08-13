import { useReducer, useCallback } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  fetchCategoriesByShop,
  createCategory,
  updateCategory,
  deleteCategory,
  Category,
} from "@/service/api/categories"; // Ensure correct path to your api file

interface CategoryState {
  isModalOpen: boolean;
  selectedCategory: Category | null;
}

type CategoryAction =
  | { type: "SET_MODAL_OPEN"; payload: boolean }
  | { type: "SET_SELECTED_CATEGORY"; payload: Category | null };

const initialState: CategoryState = {
  isModalOpen: false,
  selectedCategory: null,
};

const reducer = (
  state: CategoryState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

export const useCategories = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();
  const shopId = params?.id as string;

  const { data: categoriesData, isLoading } = useFetchCategoriesByShop(
    shopId
  ) as any;
  const categories = categoriesData?.data;
  const createCategoryMutation = useCreateCategory(shopId);
  const updateCategoryMutation = useUpdateCategory(shopId);
  const deleteCategoryMutation = useDeleteCategory(shopId);

  const openModal = useCallback((category: Category | null = null) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
    dispatch({ type: "SET_MODAL_OPEN", payload: true });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: null });
  }, []);

  const handleFormSubmit = useCallback(
    (formData: FormData) => {
      if (state.selectedCategory) {
        updateCategoryMutation.mutate({
          id: state.selectedCategory.id,
          formData,
        });
      } else {
        createCategoryMutation.mutate(formData);
      }
      closeModal();
    },
    [
      state.selectedCategory,
      createCategoryMutation,
      updateCategoryMutation,
      closeModal,
    ]
  );

  const handleDelete = useCallback(
    (categoryId: number) => {
      deleteCategoryMutation.mutate(categoryId);
    },
    [deleteCategoryMutation]
  );

  return {
    state,
    categories: categories || [],
    areCategoriesLoading: isLoading,
    openModal,
    closeModal,
    handleFormSubmit,
    handleDelete,
  };
};

export const useFetchCategoriesByShop = (shopId: string) =>
  useQuery<Category[]>({
    queryKey: ["categories", shopId],
    queryFn: () => fetchCategoriesByShop(shopId),
    enabled: !!shopId,
  });

export const useCreateCategory = (shopId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => createCategory(shopId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", shopId] });
      toast.success("Category created successfully");
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });
};

export const useUpdateCategory = (shopId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateCategory(shopId, id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", shopId] });
      toast.success("Category updated successfully");
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });
};

export const useDeleteCategory = (shopId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory(shopId, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", shopId] });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });
};
