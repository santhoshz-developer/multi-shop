
import { useCallback, useReducer, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
import { quickAccessItems } from "@/config/landing/LandingConfig";

type InitialStateProps = {
  scannerOpen: boolean;
  shopId: string;
  error: string | null;
};

type StateAction =
  | { type: "SET_SCANNER_OPEN"; payload: boolean }
  | { type: "SET_SHOP_ID"; payload: string }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR" };

const initialState: InitialStateProps = {
  scannerOpen: false,
  shopId: "",
  error: null,
};

const reducer = (
  state: InitialStateProps,
  action: StateAction
): InitialStateProps => {
  switch (action.type) {
    case "SET_SCANNER_OPEN":
      return { ...state, scannerOpen: action.payload };
    case "SET_SHOP_ID":
      return { ...state, shopId: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

export const useLandingHooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleShopAccess = useCallback(
    (id: string) => {
      if (!id || id.trim() === "") {
        dispatch({ type: "SET_ERROR", payload: "Invalid Shop ID provided." });
        return;
      }
      router.push(`/shop/${id.trim()}`);
    },
    [router]
  );

  const handleOpenScanner = useCallback(() => {
    dispatch({ type: "SET_SCANNER_OPEN", payload: true });
  }, []);

  const handleCloseScanner = useCallback(() => {
    dispatch({ type: "SET_SCANNER_OPEN", payload: false });
  }, []);

  const handleScanSuccess = useCallback(
    (data: string | null) => {
      if (data) {
        handleShopAccess(data);
        dispatch({ type: "SET_SCANNER_OPEN", payload: false });
      }
    },
    [handleShopAccess]
  );

  const handleScanError = useCallback((err: Error) => {
    console.error("QR Scan Error:", err);
    dispatch({ type: "SET_SCANNER_OPEN", payload: false });
    dispatch({
      type: "SET_ERROR",
      payload: "Could not read QR code. Please try again.",
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_SHOP_ID", payload: e.target.value });
      if (state.error) dispatch({ type: "SET_ERROR", payload: null });
    },
    [state.error]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (state.shopId.trim()) {
        handleShopAccess(state.shopId);
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "Please enter a valid Shop ID",
        });
      }
    },
    [state.shopId, handleShopAccess]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) return;
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            handleShopAccess(code.data);
          } else {
            dispatch({
              type: "SET_ERROR",
              payload: "No QR code found in the uploaded image.",
            });
          }
        };
      };
      reader.readAsDataURL(file);
    },
    [handleShopAccess]
  );

  const handleQuickAccessClick = useCallback(
    (id: string) => {
      handleShopAccess(id);
    },
    [handleShopAccess]
  );

  return {
    state,
    fileInputRef,
    quickAccessItems,
    handleOpenScanner,
    handleCloseScanner,
    handleScanSuccess,
    handleScanError,
    handleInputChange,
    handleFormSubmit,
    handleUploadClick,
    handleUpload,
    handleQuickAccessClick,
  };
};
