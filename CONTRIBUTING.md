# Contributing to Angular Testing Factory

Thank you for considering contributing to Angular Testing Factory! 🎉

## 📋 Development Setup

### Prerequisites

- Node.js 18+
- npm 8+
- Git

### Setup

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/angular-testing-factory.git
cd angular-testing-factory
npm install
```

### Development Commands

```bash
npm run build          # Build the package
npm test              # Run tests  
npm run test:coverage # Run tests with coverage
npm run lint          # Lint code
npm run lint:fix      # Auto-fix linting issues
```

## 🔄 Workflow

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/your-feature`
4. **Make** your changes following our guidelines
5. **Test** your changes: `npm test`
6. **Commit** using conventional commits (see below)
7. **Push** to your fork: `git push origin feature/your-feature`
8. **Open** a Pull Request

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features → Minor version bump
- `fix:` Bug fixes → Patch version bump  
- `docs:` Documentation → No version bump
- `test:` Tests → No version bump
- `refactor:` Code refactoring → No version bump
- `BREAKING CHANGE:` Breaking changes → Major version bump

### Examples

```bash
feat: add new mock provider for HttpClient
fix: resolve mock drift in service factory
docs: update README with new examples  
test: add coverage for edge cases
```

## 🎯 What We're Looking For

### High Priority

- 🧪 **More test coverage** (especially edge cases)
- 📚 **Documentation improvements** (examples, guides)
- 🔧 **New preset providers** (more Angular services)
- 🐛 **Bug fixes** and performance improvements

### Medium Priority  

- ✨ **New features** (discuss in issues first)
- 🎨 **Code quality** improvements
- 📖 **Better error messages**

## ✅ Pull Request Guidelines

### Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] Changes are covered by tests
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow convention

### PR Title Format

Use conventional commit format in PR title:

```bash
feat: add new HttpClient mock provider
fix: resolve type safety in createMock
docs: improve README examples
```

### What to Include

- Clear description of changes
- Link to related issues (if any)
- Screenshots/examples (if applicable)
- Breaking change notes (if any)

## 🏗️ Architecture Guidelines

### Code Style

- **TypeScript strict mode**
- **Functional programming** preferred
- **Type safety first** - no `any` types
- **Clean, readable code** with comments

### Testing

- **Jest** for testing framework
- **100% coverage** goal for new features
- **Test edge cases** and error conditions
- **Mock external dependencies**

### File Organization

```bash
src/
├── core/           # Core mock factory logic
├── presets/        # Pre-built service mocks  
├── types/          # TypeScript type definitions
└── utils/          # Helper utilities
```

## 🤝 Code Review Process

1. **Automated checks** must pass (CI/CD)
2. **Owner review** required for all PRs
3. **Discussion** and feedback welcome
4. **Approval** from `@Chalverscheid79`
5. **Squash merge** to main branch

## 💡 Getting Help

- 🐛 **Bug reports**: Open an issue with reproduction steps
- 💬 **Questions**: Start a discussion or comment on issues
- 📧 **Direct contact**: Create an issue for complex topics

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Ready to contribute?** Start by looking at our [open issues](https://github.com/Chalverscheid79/angular-testing-factory/issues) labeled `good first issue`! 🚀
