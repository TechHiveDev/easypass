import { createContext, useContext } from "react";

export const ListContext = createContext({
  refetch: () => {},
  data: [],
  error: undefined,
  isLoading: false,
});
export const useListContext = () => useContext(ListContext);
