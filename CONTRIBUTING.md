# Contributing to LWC Sub-Page Navigation

First off, thank you for considering contributing to LWC Sub-Page Navigation! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**
* **Include your Salesforce API version**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/Apex coding style guidelines
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

1. Fork the repo and create your branch from `main`
2. Make your changes
3. If you've added code that should be tested, add tests
4. Ensure the test suite passes
5. Make sure your code lints
6. Format your code with Prettier
7. Issue that pull request!

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/lwcSubPageNavigation.git
cd lwcSubPageNavigation

# Install dependencies
npm install

# Create a scratch org
sf org create scratch -f config/project-scratch-def.json -a dev

# Deploy to scratch org
sf project deploy start -o dev

# Open the org
sf org open -o dev
```

### Running Tests

```bash
# Run Apex tests in your org
sf apex run test -o dev

# Run LWC Jest tests
npm run test:unit

# Run with coverage
npm run test:unit:coverage
```

### Code Style

* Run `npm run lint` before committing
* Run `npm run prettier` to format your code
* Follow existing code conventions
* Comment your code where necessary
* Write meaningful commit messages

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## Project Structure

```
lwcSubPageNavigation/
├── force-app/main/default/
│   ├── classes/           # Apex classes and tests
│   ├── lwc/              # Lightning Web Components
│   └── ...               # Other metadata
├── config/               # Scratch org configuration
├── scripts/              # Utility scripts
└── tests/                # Additional test files
```

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

Thank you for contributing! 🎉
