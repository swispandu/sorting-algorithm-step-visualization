# Sorting Algorithm Visualizer

A beautiful, interactive web application that visualizes common sorting algorithms in real-time.
Built with Stackblitz Bolt, Next.js, Radix UI, TypeScript and Tailwind CSS.

![Sorting Algorithm Visualizer](public/images/bg-image.jpg)

## Demo

<a href="https://js-sorting.panlancer.dev/" target="_blank" rel="noopener noreferrer">https://js-sorting.panlancer.dev/</a>

## Features

- 🎯 **Interactive Visualization**: Watch sorting algorithms in action with step-by-step animation
- 🎨 **Beautiful UI**: Modern, gradient-rich design with smooth transitions
- 🌗 **Dark Mode Support**: Seamless experience in both light and dark themes
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🔄 **Multiple Algorithms**: Includes:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort

## Key Features

- Real-time visualization of sorting steps
- Custom array input support (max 15 numbers)
- Step-by-step explanation of each sorting operation
- Algorithm code base display with complexity analysis
- Progress tracking with visual indicators
- Random array generation

## Technical Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/swispandu/sorting-algorithm-step-visualization.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in your browser

## Usage

1. **Input Array**: Enter numbers (1-15) separated by commas or use the "Random" button
2. **Choose Algorithm**: Select a sorting algorithm from the tabs
3. **Visualization**: Click "Start" to begin the visualization
4. **Controls**:
   - Use Play/Pause to control animation
   - Click step buttons to jump to specific steps
   - Reset to start over

## Project Structure

```
sorting-algorithm-visualizer/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities and hooks
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the <a href="LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> file for details.

## Author

Created by PanLancer

## Acknowledgments

- Thanks to <a href="https://www.radix-ui.com/" target="_blank" rel="noopener noreferrer">Radix UI</a> for the primitive UI components
- Inspired by various sorting algorithm visualizers across the web

---

Made with ❤️ using Stackblitz Bolt, Next.js, Radix UI, TypeScript and Tailwind CSS
