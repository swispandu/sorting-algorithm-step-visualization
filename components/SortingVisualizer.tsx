"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useArrayStore } from "@/lib/store";
import { algorithmCode } from "@/lib/algorithmCode";

interface SortingVisualizerProps {
  algorithm: "bubble" | "selection" | "insertion" | "merge" | "quick";
  title: string;
  description: string;
}

const algorithmNames = {
  bubble: "Bubble Sort",
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort"
};

const complexityInfo = {
  bubble: {
    time: "O(n²)",
    space: "O(1)",
    description: "Simple but inefficient for large datasets. Best case O(n) when array is already sorted."
  },
  selection: {
    time: "O(n²)",
    space: "O(1)",
    description: "Performs well on small arrays, maintains relative order of equal elements."
  },
  insertion: {
    time: "O(n²)",
    space: "O(1)",
    description: "Efficient for small and nearly sorted arrays. Adaptive algorithm."
  },
  merge: {
    time: "O(n log n)",
    space: "O(n)",
    description: "Stable sort with guaranteed O(n log n) performance. Requires extra space."
  },
  quick: {
    time: "O(n log n)",
    space: "O(log n)",
    description: "Average case O(n log n), worst case O(n²). In-place but not stable."
  }
};

export default function SortingVisualizer({
  algorithm,
  title,
  description,
}: SortingVisualizerProps) {
  const { array: initialArray } = useArrayStore();
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<{
    array: number[];
    explanation: string;
    comparing: number[];
    swapped: number[];
    i?: number;
    j?: number;
  }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const [speed, setSpeed] = useState(1000); // Start with middle speed (1 second)
  
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const currentStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setArray([...initialArray]);
    setMaxValue(Math.max(...initialArray));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [initialArray]);

  useEffect(() => {
    if (currentStepRef.current && stepsContainerRef.current) {
      const container = stepsContainerRef.current;
      const element = currentStepRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const scrollTop = element.offsetTop - container.offsetTop - (containerRect.height - elementRect.height) / 2;
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const startSorting = async () => {
    const { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } = await import("@/lib/sortingAlgorithms");
    let sortSteps;
    
    switch (algorithm) {
      case "bubble":
        sortSteps = bubbleSort([...array]);
        break;
      case "selection":
        sortSteps = selectionSort([...array]);
        break;
      case "insertion":
        sortSteps = insertionSort([...array]);
        break;
      case "merge":
        sortSteps = mergeSort([...array]);
        break;
      case "quick":
        sortSteps = quickSort([...array]);
        break;
    }
    
    setSteps(sortSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const reset = () => {
    setArray([...initialArray]);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!steps.length) {
      startSorting();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const jumpToStep = (stepIndex: number) => {
    setIsPlaying(false);
    setCurrentStep(stepIndex);
    setArray([...steps[stepIndex].array]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      const xSpeed = 2000 - speed;
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setArray([...steps[currentStep + 1].array]);
      }, xSpeed);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, steps, currentStep, speed]);

  const getBarColor = (index: number) => {
    if (!steps[currentStep]) return "hsl(200, 80%, 50%)";
    
    if (steps[currentStep].swapped.includes(index)) {
      return "hsl(142, 76%, 36%)";
    }
    if (steps[currentStep].comparing.includes(index)) {
      return "hsl(0, 84%, 60%)";
    }
    
    const value = array[index];
    const lightness = Math.max(20, 80 - (value / maxValue) * 60);
    return `hsl(200, 80%, ${lightness}%)`;
  };

  // Convert speed value to a human-readable format
  const formatSpeed = (speedMs: number) => {
    return `${(speedMs / 1000).toFixed(1)}x`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="h-64 flex items-end justify-around gap-1 bg-muted/20 rounded-lg p-4">
              {array.map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-8 rounded-t-sm transition-all duration-300"
                      style={{
                        backgroundColor: getBarColor(index),
                        height: `${(value / maxValue) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium">{value}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-2">
              <Button onClick={togglePlay} className="btn-gradient">
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" onClick={reset} className="btn-gradient-outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {steps.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Current iteration: {currentStep + 1} of {steps.length}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Speed: </span><span className="w-8">{formatSpeed(speed)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{
                        width: `${(currentStep / (steps.length - 1)) * 100 || 0}%`,
                      }}
                    />
                  </div>
                  <div className="w-32">
                    <Slider
                      value={[speed]}
                      onValueChange={([newSpeed]) => setSpeed(newSpeed)}
                      min={100}
                      max={2000}
                      step={100}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {steps.length > 0 && (
              <ScrollArea className="h-[360px] w-full rounded-md border">
                <div className="flex flex-wrap gap-1 p-2">
                  {steps.map((step, index) => (
                    <Button
                      key={index}
                      variant={currentStep === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => jumpToStep(index)}
                      className={cn(
                        "h-6 min-w-[2.5rem]",
                        currentStep === index ? "step-btn-gradient-active" : "step-btn-gradient"
                      )}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Step Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={stepsContainerRef} className="h-[110px] overflow-y-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={index === currentStep ? currentStepRef : null}
                  className={cn(
                    "p-3 rounded-lg mb-2 text-sm leading-relaxed",
                    index === currentStep
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-muted"
                  )}
                >
                  <div className="font-semibold mb-1">Step {index + 1}:</div>
                  {step.explanation.split('\n').map((line, i) => (
                    <div key={i} className="text-xs mb-1">{line}</div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <h3 className="text-blue-900 dark:text-blue-300 font-semibold">
              Algorithm - {algorithmNames[algorithm]}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div className="space-y-1">
                  <p>
                    <span className="font-medium text-blue-900 dark:text-blue-300">Time Complexity: </span>
                    <span className="font-mono">{complexityInfo[algorithm].time}</span>
                  </p>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium text-blue-900 dark:text-blue-300">Space Complexity: </span>
                    <span className="font-mono">{complexityInfo[algorithm].space}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                {complexityInfo[algorithm].description}
              </p>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-300 mb-2">JavaScript Code:</p>
                <div className="code-gradient p-4 rounded-lg overflow-x-auto shadow-inner border">
                  <pre className="text-sm">
                    <code>{algorithmCode[algorithm]}</code>
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}