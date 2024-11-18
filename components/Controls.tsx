"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";
import { generateRandomArray } from "@/lib/utils";
import { useArrayStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

/**
 * Controls Component
 * Provides user interface for manipulating the array used in sorting visualizations
 */
export default function Controls() {
  // Custom input state for manual array entry
  const [customInput, setCustomInput] = useState("");
  
  // Access array manipulation methods from global store
  const { array, setArray } = useArrayStore();
  
  // Toast notifications for user feedback
  const { toast } = useToast();

  // Maximum allowed array length
  const MAX_ARRAY_LENGTH = 15;

  /**
   * Validates input to allow only numbers and commas
   * @param value - The input string to validate
   * @returns boolean indicating if input is valid
   */
  const isValidInput = (value: string): boolean => {
    return /^[\d,]*$/.test(value);
  };

  /**
   * Validates the array of numbers
   * @param numbers - Array of numbers to validate
   * @returns Validation result with status and message
   */
  const validateInput = (numbers: number[]) => {
    if (numbers.length > MAX_ARRAY_LENGTH) {
      return {
        isValid: false,
        message: `Maximum array length is ${MAX_ARRAY_LENGTH} due to graph space limitations.`
      };
    }
    if (numbers.length === 0) {
      return {
        isValid: false,
        message: "Please enter valid numbers separated by commas"
      };
    }
    return { isValid: true, message: "" };
  };

  // Check if input contains valid numbers
  const hasValidInput = customInput.trim().length > 0 && 
    customInput.split(",").some(num => !isNaN(parseInt(num.trim())));

  /**
   * Handles input change event
   * Validates and updates input state
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidInput(value)) {
      setCustomInput(value);
    } else {
      toast({
        title: "Invalid Input",
        description: "Only numbers and commas are allowed",
        variant: "destructive"
      });
    }
  };

  /**
   * Processes custom array input from user
   * Validates and converts string input to number array
   */
  const handleCustomArray = () => {
    // Parse and filter valid numbers from input string
    const numbers = customInput
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));

    const validation = validateInput(numbers);
    
    if (validation.isValid) {
      // Update global array state and show success toast
      setArray(numbers);
      toast({
        title: "Array Updated",
        description: `New array: [${numbers.join(", ")}]`
      });
    } else {
      // Show error toast for invalid input
      toast({
        title: "Invalid Input",
        description: validation.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl">
      <div className="flex gap-4 w-full">
        {/* Input field for custom array values */}
        <Input
          placeholder={`Enter numbers (e.g., 5,2,8,1,9) - max ${MAX_ARRAY_LENGTH} numbers`}
          value={customInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hasValidInput) {
              handleCustomArray();
            }
          }}
          className="bg-white/80 dark:bg-sky-950/80 backdrop-blur-sm"
        />
        
        {/* Button to set custom array */}
        <Button 
          onClick={handleCustomArray}
          disabled={!hasValidInput}
          className={`bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 
                   hover:from-blue-800 hover:via-blue-900 hover:to-blue-950
                   text-white shadow-lg hover:shadow-xl transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg`}
        >
          Set Array
        </Button>
        
        {/* Button to generate random array */}
        <Button
          variant="outline"
          onClick={() => {
            const newArray = generateRandomArray(MAX_ARRAY_LENGTH);
            setArray(newArray);
            toast({
              title: "Random Array Generated",
              description: `New array: [${newArray.join(", ")}]`
            });
          }}
          className="bg-gradient-to-r from-gray-100 to-gray-200 
                   dark:from-gray-800 dark:to-gray-900
                   hover:from-gray-200 hover:to-gray-300
                   dark:hover:from-gray-700 dark:hover:to-gray-800
                   border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-200
                   shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Random
        </Button>
      </div>

      {/* Display current array */}
      <div className="text-sm text-muted-foreground bg-white/50 dark:bg-gray-900/50 px-4 py-2 rounded-md backdrop-blur-sm w-full text-center">
        Current Array: [{array.join(", ")}]
      </div>
    </div>
  );
}