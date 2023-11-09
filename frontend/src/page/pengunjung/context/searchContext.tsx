/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';


export const SearchContext = createContext<{
  searchValue: string;
  updateSearchValue: (value: string) => void;
}>({ searchValue: '', updateSearchValue: () => {} });