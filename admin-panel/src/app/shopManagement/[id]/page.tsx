import ShopLayout from "@/layouts/layout";
import ShopManagementPage from "@/page-component/shopProdcuts/ShopManagementPage";
import React from "react";

const page = () => {
  return (
    <>
      <ShopLayout>
        <ShopManagementPage />
      </ShopLayout>
    </>
  );
};

export default page;
