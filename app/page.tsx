// Import necessary components
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

// Dynamically import client components with SSR disabled
const DynamicSortingVisualizer = dynamic(
  () => import('@/components/SortingVisualizer'),
  { ssr: false }
);

const DynamicControls = dynamic(
  () => import('@/components/Controls'),
  { ssr: false }
);

// Main Home component
export default function Home() {
  return (
    // Main container with responsive padding
    <main className="container mx-auto p-8 min-h-screen">
      <div className="space-y-6">
        {/* Header section with title */}
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-bold flex items-center gap-2 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400 text-transparent bg-clip-text drop-shadow-sm">
            <BarChart3 className="h-8 w-8 text-sky-600 dark:text-sky-400" />
            Sorting Algorithm Visualizer
          </h1>
          <DynamicControls />
        </div>

        {/* Sorting algorithms tabs with increased spacing */}
        <Tabs defaultValue="bubble" className="w-full">
          {/* Tab navigation with gradient background */}
          <div className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 p-1 rounded-lg">
              <TabsTrigger 
                value="bubble"
                className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white dark:data-[state=active]:from-blue-400 dark:data-[state=active]:to-blue-600"
              >
                Bubble Sort
              </TabsTrigger>
              <TabsTrigger 
                value="selection"
                className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white dark:data-[state=active]:from-blue-400 dark:data-[state=active]:to-blue-600"
              >
                Selection Sort
              </TabsTrigger>
              <TabsTrigger 
                value="insertion"
                className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white dark:data-[state=active]:from-blue-400 dark:data-[state=active]:to-blue-600"
              >
                Insertion Sort
              </TabsTrigger>
              <TabsTrigger 
                value="merge"
                className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white dark:data-[state=active]:from-blue-400 dark:data-[state=active]:to-blue-600"
              >
                Merge Sort
              </TabsTrigger>
              <TabsTrigger 
                value="quick"
                className="font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white dark:data-[state=active]:from-blue-400 dark:data-[state=active]:to-blue-600"
              >
                Quick Sort
              </TabsTrigger>
            </TabsList>

            {/* Tab content for each sorting algorithm with increased spacing */}
            <TabsContent value="bubble" className="space-y-6">
              <DynamicSortingVisualizer
                algorithm="bubble"
                title="Bubble Sort"
                description="Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
              />
            </TabsContent>

            <TabsContent value="selection" className="space-y-6">
              <DynamicSortingVisualizer
                algorithm="selection"
                title="Selection Sort"
                description="Divides the input into a sorted and unsorted region, repeatedly selects the smallest element from the unsorted region."
              />
            </TabsContent>

            <TabsContent value="insertion" className="space-y-6">
              <DynamicSortingVisualizer
                algorithm="insertion"
                title="Insertion Sort"
                description="Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array."
              />
            </TabsContent>

            <TabsContent value="merge" className="space-y-6">
              <DynamicSortingVisualizer
                algorithm="merge"
                title="Merge Sort"
                description="Divides the array into smaller subarrays, sorts them, and then merges them back together in sorted order."
              />
            </TabsContent>

            <TabsContent value="quick" className="space-y-6">
              <DynamicSortingVisualizer
                algorithm="quick"
                title="Quick Sort"
                description="Selects a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays."
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}