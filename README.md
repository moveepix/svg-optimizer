# SVG Optimizer

A powerful, browser-based SVG optimization tool that reduces file sizes while maintaining visual quality. Built with React and powered by SVGO, this tool runs entirely in your browser - no server uploads required.

**[Preview Netfily APP](https://lucent-longma-de1f8c.netlify.app/)**

## ✨ Features

- **🚀 Instant Optimization** - Optimize SVG files in real-time
- **🔒 Privacy-First** - All processing happens in your browser, files never leave your device
- **⚙️ Multiple Presets** - Choose from Basic, Aggressive, or Custom optimization levels
- **🎨 Live Preview** - Compare original and optimized SVGs side-by-side
- **📊 Detailed Stats** - See file size reduction, character count, and compression ratios
- **🎯 Background Options** - Test your SVG against different backgrounds
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **💾 Easy Download** - One-click download of optimized files
- **📋 Paste Support** - Import SVGs directly from clipboard

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/moveepix/svg-optimizer.git
   cd svg-optimizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🛠️ Usage

### Basic Usage

1. **Upload your SVG** - Drag & drop, click to browse, or paste from clipboard
2. **Choose optimization level** - Select Basic, Aggressive, or Custom preset
3. **Review results** - Compare original vs optimized in the preview panel
4. **Download** - Save your optimized SVG file

### Optimization Presets

- **🟢 Basic** - Safe optimizations that preserve functionality
- **🟠 Aggressive** - Maximum compression with potential visual changes  
- **🔧 Custom** - Fine-tune individual optimization settings

### Advanced Options

- **Remove Dimensions** - Removes width/height attributes (may affect preview)
- **Custom Settings** - Over 20 individual optimization toggles when using Custom preset

## 🏗️ Tech Stack

- **Framework** - React 18 with TypeScript
- **Build Tool** - Vite
- **Styling** - Tailwind CSS
- **Icons** - Lucide React
- **SVG Processing** - SVGO
- **Accessibility** - React Aria

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Main header with branding
│   ├── DropZone.tsx    # File upload interface
│   ├── OptimizationPanel.tsx  # Settings panel
│   ├── ResultsPanel.tsx       # Preview and download
│   └── Footer.tsx      # Footer with links
├── hooks/
│   └── useSVGOptimizer.ts     # Main optimization logic
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Guidelines

- Follow the existing code style and TypeScript patterns
- Add appropriate comments for complex logic
- Ensure responsive design works on all screen sizes
- Test your changes thoroughly across different browsers
- Update documentation if needed

### Bug Reports

Please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Sample SVG file (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[SVGO](https://github.com/svg/svgo)** - The powerful SVG optimization engine
- **[Tailwind CSS](https://tailwindcss.com/)** - For the beautiful, responsive design
- **[Lucide](https://lucide.dev/)** - For the clean, consistent icons
- **[React](https://reactjs.org/)** - For the robust component framework

## 🌟 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing code improvements

---

**Made with ❤️ and ☕️ by [Imagine Odyssey](https://www.imagineodyssey.io/)**

For more tools and projects, visit [imagineodyssey.io](https://www.imagineodyssey.io/)
