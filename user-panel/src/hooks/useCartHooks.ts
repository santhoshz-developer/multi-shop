// src/hooks/useCartHooks.ts
// This is adapted from the example provided, but since there's no backend service in the code, I'll keep it simple with local state.
// If there's backend, it can be extended like the example.

import { useCallback, useReducer } from "react";

interface Product {
  product_id: string;
  name: string;
  price: number;
  main_image: string;
}

interface CartItem extends Product {
  quantity: number;
}

type InitialStateProps = {
  cartItems: CartItem[];
};

type StateAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "CLEAR_CART" };

const initialState: InitialStateProps = {
  cartItems: [],
};

const reducer = (
  state: InitialStateProps,
  action: StateAction
): InitialStateProps => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product_id === action.payload.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const useCartHooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    console.log("Added to cart:", product.name);
  }, []);

  // Add more actions if needed, like remove, update, etc.

  return {
    cartItems: state.cartItems,
    addToCart,
  };
};
