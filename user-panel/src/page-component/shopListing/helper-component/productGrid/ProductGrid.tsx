// src/components/ProductGrid.tsx
import Grid from "@mui/material/Grid";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { ProductCard } from "../productCard/ProductCard";
import { useProductGridHooks } from "@/hooks/useProductGridHooks";
import { TabsContainer, GridContainer, NoProductsBox } from "./ProductGrid.styled";

export const ProductGrid = ({
  categories,
  products,
}: {
  categories: any[];
  products: any[];
}) => {
  const { activeTab, handleTabChange, allCategories, filteredProducts } =
    useProductGridHooks({ categories, products });

  return (
    <Box>
      {/* Tabs */}
      <TabsContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Product categories"
        >
          {allCategories.map((cat) => (
            <Tab key={cat.category_id} label={cat.name} />
          ))}
        </Tabs>
      </TabsContainer>

      {/* Products Grid */}
      <GridContainer>
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <Box
                key={product.product_id}
                sx={{
                  flexBasis: { xs: "50%", sm: "33.33%", md: "25%", lg: "20%" },
                  display: "flex",
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))
          ) : (
            <NoProductsBox>
              <Typography variant="h6" color="text.secondary">
                No Products Found
              </Typography>
            </NoProductsBox>
          )}
        </Grid>
      </GridContainer>
    </Box>
  );
};