# Contributing to SVG Optimizer

Thank you for your interest in contributing to SVG Optimizer! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A modern code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/svg-optimizer.git
   cd svg-optimizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code structure and naming conventions
- Use functional components with React hooks
- Implement proper error handling
- Add comments for complex logic
- Ensure responsive design works on all screen sizes

### Component Guidelines

- Keep components focused and single-purpose
- Use proper TypeScript interfaces for props
- Implement proper accessibility (a11y) practices
- Follow the existing Tailwind CSS patterns
- Use Lucide React for icons

### File Organization

- Components go in `src/components/`
- Custom hooks go in `src/hooks/`
- Types should be defined inline or in component files
- Follow the existing import/export patterns

## 🧪 Testing

Before submitting your contribution:

1. **Run linting**
   ```bash
   npm run lint
   ```

2. **Test in multiple browsers**
   - Chrome/Chromium
   - Firefox
   - Safari (if on macOS)
   - Edge

3. **Test responsive design**
   - Desktop (1920px+)
   - Tablet (768px-1024px)
   - Mobile (320px-767px)

4. **Test with various SVG files**
   - Simple icons
   - Complex illustrations
   - SVGs with different optimization needs

## 🐛 Bug Reports

When reporting bugs, please include:

### Required Information
- **Browser and version**
- **Operating system**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Sample SVG file** (if applicable)

### Bug Report Template
```markdown
**Browser:** Chrome 120.0.0.0
**OS:** Windows 11
**Steps to reproduce:**
1. Upload an SVG file
2. Select "Aggressive" preset
3. Click download

**Expected:** File downloads successfully
**Actual:** Download fails with error message

**Sample SVG:** [attach file or provide code]
```

## ✨ Feature Requests

For new features, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the problem** you're trying to solve
3. **Propose a solution** with implementation details
4. **Consider backwards compatibility**
5. **Think about performance impact**

### Feature Request Template
```markdown
**Problem:** Users need to batch process multiple SVG files

**Proposed Solution:** Add drag-and-drop support for multiple files with a queue system

**Implementation Ideas:**
- Modify DropZone to accept multiple files
- Add queue management in useSVGOptimizer hook
- Create progress indicator component

**Additional Context:** This would help users optimize entire icon sets at once
```

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow coding guidelines
   - Add appropriate comments
   - Test thoroughly

3. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

### Commit Message Guidelines

Use conventional commit format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile
- [ ] Linting passes

## Screenshots
[Add screenshots for UI changes]

## Additional Notes
Any additional context or considerations
```

## 🎯 Priority Areas

We're especially interested in contributions for:

### High Priority
- **Performance improvements** - Optimize large SVG processing
- **Accessibility enhancements** - Improve keyboard navigation and screen reader support
- **Browser compatibility** - Ensure consistent behavior across browsers

### Medium Priority
- **New optimization presets** - Industry-specific optimization profiles
- **Batch processing** - Multiple file support
- **Export options** - Different file formats or compression levels

### Nice to Have
- **Themes** - Dark mode support
- **Internationalization** - Multi-language support
- **Advanced features** - SVG editing capabilities

## 🤝 Community Guidelines

- **Be respectful** - Treat all contributors with respect
- **Be constructive** - Provide helpful feedback and suggestions
- **Be patient** - Remember that everyone is volunteering their time
- **Ask questions** - Don't hesitate to ask for clarification
- **Help others** - Share your knowledge and experience

## 📚 Resources

### Useful Links
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SVGO Documentation](https://github.com/svg/svgo)
- [Vite Documentation](https://vitejs.dev/)

### Learning Resources
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [SVG Optimization Guide](https://web.dev/fast/#optimize-your-images)

## 📞 Getting Help

If you need help:

1. **Check the documentation** - README and existing issues
2. **Search existing issues** - Your question might already be answered
3. **Create a discussion** - For general questions and ideas
4. **Join our community** - [Link to Discord/Slack if available]

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation for major features

---

Thank you for contributing to SVG Optimizer! Every contribution, no matter how small, helps make this tool better for everyone. 🙏