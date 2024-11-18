/**
 * Type definition for each step in the sorting visualization process
 */
type SortStep = {
    array: number[];      // Current state of the array
    explanation: string;  // Text explanation of the current step
    comparing: number[];  // Indices of elements being compared
    swapped: number[];    // Indices of elements being swapped
    i?: number;          // Current outer loop index (optional)
    j?: number;          // Current inner loop index (optional)
};

/**
 * Bubble Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function bubbleSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const workingArray = [...arr];
    const n = workingArray.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Comparing adjacent elements:",
                    `• Position ${j}: ${workingArray[j]}`,
                    `• Position ${j + 1}: ${workingArray[j + 1]}`
                ].join('\n'),
                comparing: [j, j + 1],
                swapped: [],
                i,
                j
            });

            if (workingArray[j] > workingArray[j + 1]) {
                // Swap elements
                [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
                
                steps.push({
                    array: [...workingArray],
                    explanation: [
                        "• Swapping elements:",
                        `• Moved ${workingArray[j]} to position ${j}`,
                        `• Moved ${workingArray[j + 1]} to position ${j + 1}`
                    ].join('\n'),
                    comparing: [],
                    swapped: [j, j + 1],
                    i,
                    j
                });
            }
        }
    }

    steps.push({
        array: [...workingArray],
        explanation: "• Array is now sorted!",
        comparing: [],
        swapped: []
    });

    return steps;
}

/**
 * Selection Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function selectionSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const workingArray = [...arr];
    const n = workingArray.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        steps.push({
            array: [...workingArray],
            explanation: [
                "• Starting new pass:",
                `• Current position: ${i}`,
                `• Looking for minimum element`
            ].join('\n'),
            comparing: [i],
            swapped: [],
            i
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Comparing elements:",
                    `• Current minimum (${workingArray[minIdx]}) at position ${minIdx}`,
                    `• Comparing with ${workingArray[j]} at position ${j}`
                ].join('\n'),
                comparing: [minIdx, j],
                swapped: [],
                i,
                j
            });

            if (workingArray[j] < workingArray[minIdx]) {
                minIdx = j;
                steps.push({
                    array: [...workingArray],
                    explanation: [
                        "• Found new minimum:",
                        `• New minimum: ${workingArray[minIdx]}`,
                        `• Position: ${minIdx}`
                    ].join('\n'),
                    comparing: [minIdx],
                    swapped: [],
                    i,
                    j
                });
            }
        }

        if (minIdx !== i) {
            [workingArray[i], workingArray[minIdx]] = [workingArray[minIdx], workingArray[i]];
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Swapping elements:",
                    `• Moved ${workingArray[i]} to position ${i}`,
                    `• Moved ${workingArray[minIdx]} to position ${minIdx}`
                ].join('\n'),
                comparing: [],
                swapped: [i, minIdx],
                i
            });
        }
    }

    steps.push({
        array: [...workingArray],
        explanation: "• Array is now sorted!",
        comparing: [],
        swapped: []
    });

    return steps;
}

/**
 * Insertion Sort Algorithm Implementation
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
export function insertionSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const workingArray = [...arr];
    const n = workingArray.length;

    for (let i = 1; i < n; i++) {
        const key = workingArray[i];
        let j = i - 1;

        steps.push({
            array: [...workingArray],
            explanation: [
                "• Starting new insertion:",
                `• Current element: ${key}`,
                `• Position: ${i}`
            ].join('\n'),
            comparing: [i],
            swapped: [],
            i,
            j
        });

        while (j >= 0 && workingArray[j] > key) {
            workingArray[j + 1] = workingArray[j];
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Moving element:",
                    `• Shifted ${workingArray[j]} right`,
                    `• From position ${j} to ${j + 1}`
                ].join('\n'),
                comparing: [j, j + 1],
                swapped: [j, j + 1],
                i,
                j
            });
            j--;
        }

        workingArray[j + 1] = key;
        steps.push({
            array: [...workingArray],
            explanation: [
                "• Inserting element:",
                `• Placed ${key} at position ${j + 1}`
            ].join('\n'),
            comparing: [],
            swapped: [j + 1],
            i,
            j: j + 1
        });
    }

    steps.push({
        array: [...workingArray],
        explanation: "• Array is now sorted!",
        comparing: [],
        swapped: []
    });

    return steps;
}

/**
 * Merge Sort Algorithm Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export function mergeSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const workingArray = [...arr];

    function merge(start: number, mid: number, end: number) {
        const leftArray = workingArray.slice(start, mid + 1);
        const rightArray = workingArray.slice(mid + 1, end + 1);
        let i = 0;
        let j = 0;
        let k = start;

        steps.push({
            array: [...workingArray],
            explanation: [
                "• Merging two sorted subarrays:",
                `• Left subarray: [${leftArray.join(', ')}]`,
                `• Right subarray: [${rightArray.join(', ')}]`
            ].join('\n'),
            comparing: [start, end],
            swapped: []
        });

        while (i < leftArray.length && j < rightArray.length) {
            let explanation = [
                "• Comparing elements:",
                `• Left: ${leftArray[i]} at position ${start + i}`,
                `• Right: ${rightArray[j]} at position ${mid + 1 + j}`
            ];

            if (leftArray[i] <= rightArray[j]) {
                workingArray[k] = leftArray[i];
                explanation.push(`• ${leftArray[i]} is smaller or equal, placing it at position ${k}`);
                i++;
            } else {
                workingArray[k] = rightArray[j];
                explanation.push(`• ${rightArray[j]} is smaller, placing it at position ${k}`);
                j++;
            }

            steps.push({
                array: [...workingArray],
                explanation: explanation.join('\n'),
                comparing: [start + i - 1, mid + 1 + j - 1],
                swapped: [k]
            });
            k++;
        }

        while (i < leftArray.length) {
            workingArray[k] = leftArray[i];
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Copying remaining elements from left subarray:",
                    `• Placing ${leftArray[i]} at position ${k}`
                ].join('\n'),
                comparing: [],
                swapped: [k]
            });
            i++;
            k++;
        }

        while (j < rightArray.length) {
            workingArray[k] = rightArray[j];
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Copying remaining elements from right subarray:",
                    `• Placing ${rightArray[j]} at position ${k}`
                ].join('\n'),
                comparing: [],
                swapped: [k]
            });
            j++;
            k++;
        }

        steps.push({
            array: [...workingArray],
            explanation: [
                "• Completed merging subarrays:",
                `• Range: indices ${start} to ${end}`,
                `• Result: [${workingArray.slice(start, end + 1).join(', ')}]`
            ].join('\n'),
            comparing: [],
            swapped: Array.from({ length: end - start + 1 }, (_, i) => start + i)
        });
    }

    function mergeSortHelper(start: number, end: number) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);

            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Splitting array into two subarrays:",
                    `• Left half: indices ${start} to ${mid}`,
                    `• Right half: indices ${mid + 1} to ${end}`
                ].join('\n'),
                comparing: [start, end],
                swapped: []
            });

            mergeSortHelper(start, mid);
            mergeSortHelper(mid + 1, end);
            merge(start, mid, end);
        }
    }

    mergeSortHelper(0, arr.length - 1);

    for (let i = 0; i < workingArray.length; i++) {
        arr[i] = workingArray[i];
    }

    steps.push({
        array: [...arr],
        explanation: "• Array is now fully sorted!",
        comparing: [],
        swapped: []
    });

    return steps;
}

/**
 * Quick Sort Algorithm Implementation
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 */
export function quickSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const workingArray = [...arr];

    function partition(low: number, high: number): number {
        const pivot = workingArray[high];
        steps.push({
            array: [...workingArray],
            explanation: [
                "• Starting partition:",
                `• Pivot: ${pivot}`,
                `• Range: ${low} to ${high}`
            ].join('\n'),
            comparing: [high],
            swapped: []
        });

        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({
                array: [...workingArray],
                explanation: [
                    "• Comparing with pivot:",
                    `• Current element: ${workingArray[j]}`,
                    `• Pivot: ${pivot}`
                ].join('\n'),
                comparing: [j, high],
                swapped: [],
                i,
                j
            });

            if (workingArray[j] <= pivot) {
                i++;
                [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
                if (i !== j) {
                    steps.push({
                        array: [...workingArray],
                        explanation: [
                            "• Swapping elements:",
                            `• Moved ${workingArray[i]} to position ${i}`,
                            `• Moved ${workingArray[j]} to position ${j}`
                        ].join('\n'),
                        comparing: [],
                        swapped: [i, j],
                        i,
                        j
                    });
                }
            }
        }

        [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];
        steps.push({
            array: [...workingArray],
            explanation: [
                "• Placing pivot:",
                `• Moved pivot ${pivot} to position ${i + 1}`
            ].join('\n'),
            comparing: [],
            swapped: [i + 1, high],
            i: i + 1
        });

        return i + 1;
    }

    function quickSortHelper(low: number, high: number) {
        if (low < high) {
            const pi = partition(low, high);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    }

    quickSortHelper(0, arr.length - 1);

    steps.push({
        array: [...workingArray],
        explanation: "• Array is now sorted!",
        comparing: [],
        swapped: []
    });

    return steps;
}