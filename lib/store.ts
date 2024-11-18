"use client";

import { create } from 'zustand';
import { generateRandomArray } from './utils';

// Define the structure of our array store
interface ArrayStore {
  array: number[];                      // The current array being sorted
  setArray: (array: number[]) => void;  // Function to update the array
}

// Create a Zustand store for managing the array state
export const useArrayStore = create<ArrayStore>((set) => ({
  // Initialize with a random array of 10 numbers
  array: generateRandomArray(10),
  
  // Method to update the array state
  setArray: (array) => set({ array }),
}));