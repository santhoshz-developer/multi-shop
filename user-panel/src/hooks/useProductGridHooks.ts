// src/hooks/useProductGridHooks.ts
import { useState, useMemo, useCallback } from "react";

export const useProductGridHooks = ({
  categories,
  products,
}: {
  categories: any[];
  products: any[];
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue),
    []
  );

  const allCategories = useMemo(
    () => [{ category_id: "all", name: "All Products" }, ...categories],
    [categories]
  );

  const filteredProducts = useMemo(() => {
    if (activeTab === 0) return products;
    const currentCategory = allCategories[activeTab];
    return products.filter(
      (p) => p.category_id === currentCategory.category_id
    );
  }, [activeTab, allCategories, products]);

  return {
    activeTab,
    handleTabChange,
    allCategories,
    filteredProducts,
  };
};
