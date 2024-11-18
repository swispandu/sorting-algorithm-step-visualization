// Import required utility functions from external libraries
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for proper class handling
 * @param inputs - Array of class values to be merged
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an array of random numbers
 * @param length - The desired length of the array
 * @returns Array of random numbers between 1 and 100
 */
export function generateRandomArray(length: number): number[] {
  // Generate array with random numbers between 1-100
  const array = Array.from(
    { length: Math.min(length, 15) },  // Limit array length to 15
    () => Math.floor(Math.random() * 100) + 1
  );
  
  // Ensure array has some variation by adding a few larger numbers
  const randomIndex = Math.floor(Math.random() * array.length);
  array[randomIndex] = Math.floor(Math.random() * 50) + 50;  // Add a number between 50-100
  
  return array;
}