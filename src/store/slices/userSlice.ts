import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';

// Load from localStorage if available
const loadCurrency = (): 'USD' | 'EUR' | 'GBP' => {
  const saved = localStorage.getItem('currency');
  return (saved as 'USD' | 'EUR' | 'GBP') || 'USD';
};

const loadTheme = (): 'light' | 'dark' => {
  const saved = localStorage.getItem('theme');
  return (saved as 'light' | 'dark') || 'light';
};

const initialState: UserState = {
  currency: loadCurrency(),
  theme: loadTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<'USD' | 'EUR' | 'GBP'>) => {
      state.currency = action.payload;
      localStorage.setItem('currency', action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      
      // Apply theme to document
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { setCurrency, setTheme, toggleTheme } = userSlice.actions;
export default userSlice.reducer;