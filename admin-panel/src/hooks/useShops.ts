// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { 
//   fetchShops, 
//   createShop, 
//   updateShop, 
//   deleteShop 
// } from "@/api/shopApi";
// import { useCallback, useReducer } from "react";
// import { toast } from "react-toastify";

// type InitialStateProps = {
//   searchText: string;
//   page: number;
//   pageSize: number;
//   isModalOpen: boolean;
//   selectedShop: Shop | null;
// };

// const initialState: InitialStateProps = {
//   searchText: "",
//   page: 1,
//   pageSize: 10,
//   isModalOpen: false,
//   selectedShop: null,
// };

// function reducer(state: InitialStateProps, action: any) {
//   switch (action.type) {
//     case "SET_SEARCH":
//       return { ...state, searchText: action.payload };
//     case "SET_PAGE":
//       return { ...state, page: action.payload };
//     case "SET_PAGE_SIZE":
//       return { ...state, pageSize: action.payload };
//     case "TOGGLE_MODAL":
//       return { ...state, isModalOpen: !state.isModalOpen };
//     case "SET_SELECTED_SHOP":
//       return { ...state, selectedShop: action.payload };
//     default:
//       return state;
//   }
// }

// export const useShops = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const queryClient = useQueryClient();

//   const { data: shops, isLoading, error } = useQuery({
//     queryKey: ['shops', state.page, state.pageSize, state.searchText],
//     queryFn: () => fetchShops({
//       page: state.page,
//       limit: state.pageSize,
//       search: state.searchText
//     }),
//   });

//   const createMutation = useMutation({
//     mutationFn: createShop,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['shops']);
//       toast.success("Shop created successfully");
//       dispatch({ type: 'TOGGLE_MODAL' });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to create shop");
//     }
//   });

//   const updateMutation = useMutation({
//     mutationFn: (data: Shop) => updateShop(state.selectedShop?.id || '', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['shops']);
//       toast.success("Shop updated successfully");
//       dispatch({ type: 'TOGGLE_MODAL' });
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to update shop");
//     }
//   });

//   const deleteMutation = useMutation({
//     mutationFn: (id: string) => deleteShop(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['shops']);
//       toast.success("Shop deleted successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to delete shop");
//     }
//   });

//   const handleSearch = useCallback((searchText: string) => {
//     dispatch({ type: 'SET_SEARCH', payload: searchText });
//     dispatch({ type: 'SET_PAGE', payload: 1 });
//   }, []);

//   const handlePageChange = useCallback((page: number) => {
//     dispatch({ type: 'SET_PAGE', payload: page });
//   }, []);

//   const handlePageSizeChange = useCallback((size: number) => {
//     dispatch({ type: 'SET_PAGE_SIZE', payload: size });
//     dispatch({ type: 'SET_PAGE', payload: 1 });
//   }, []);

//   const openModal = useCallback((shop: Shop | null = null) => {
//     dispatch({ type: 'SET_SELECTED_SHOP', payload: shop });
//     dispatch({ type: 'TOGGLE_MODAL' });
//   }, []);

//   const handleSubmit = useCallback((data: ShopFormData) => {
//     if (state.selectedShop) {
//       updateMutation.mutate(data);
//     } else {
//       createMutation.mutate(data);
//     }
//   }, [state.selectedShop, updateMutation, createMutation]);

//   return {
//     state,
//     shops,
//     isLoading,
//     error,
//     handleSearch,
//     handlePageChange,
//     handlePageSizeChange,
//     openModal,
//     handleSubmit,
//     deleteShop: deleteMutation.mutate
//   };
// };