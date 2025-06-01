# Cool Posts

Cool Posts is an Angular application designed for displaying and managing a collection of posts. It's built with a focus on modern Angular practices, developer experience, and maintainability.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Linting and Formatting](#linting-and-formatting)
- [Project Structure](#project-structure)
- [Architecture Choices & Reasoning](#architecture-choices--reasoning)
  - [Core Framework: Angular](#core-framework-angular)
  - [State Management: NgRx Signals](#state-management-ngrx-signals)
  - [Styling: Tailwind CSS](#styling-tailwind-css)
  - [Testing: Jest](#testing-jest)
  - [Code Quality: ESLint & Prettier](#code-quality-eslint--prettier)
  - [Pre-commit Hooks: Husky & lint-staged](#pre-commit-hooks-husky--lint-staged)
  - [Modular Design](#modular-design)
  - [HTTP Interceptors](#http-interceptors)
- [Common Pitfalls & Issues](#common-pitfalls--issues)
- [Additional Insights & Motivations](#additional-insights--motivations)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended, I used `v22.16.0`)
- [npm](https://www.npmjs.com/) (I used `11.4.1`)

## Getting Started

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/awabcodes/cool-posts.git
    cd cool-posts
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will also set up Husky pre-commit hooks.

### Development Server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

For continuous building during development without serving: `npm run watch`

### Building for Production

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

This command uses the production configuration by default.

## Running Tests

This project uses Jest for unit testing.

- **Run tests once:**

  ```bash
  npm test
  # OR
  jest
  ```

- **Run tests in watch mode:**

  ```bash
  npm run test:watch
  # OR
  jest --watch
  ```

- **Run tests and generate a coverage report:**
  ```bash
  npm run test:coverage
  # OR
  jest --coverage
  ```
  The coverage report can be found in the `coverage/` directory.

## Linting and Formatting

This project uses ESLint for linting TypeScript/JavaScript files and Prettier for code formatting.

- **Lint files and automatically fix issues:**

  ```bash
  npm run lint
  ```

- **Format files:**
  ```bash
  npm run format
  ```

These checks are also run automatically on pre-commit thanks to Husky and `lint-staged`.

## Project Structure

The project follows a standard Angular CLI structure with some conventions for organization:

```
src/
├── app/
│   ├── core/                     # Core module: singleton services, interceptors, guards
│   │   ├── interceptors/         # HTTP interceptors (e.g., error handling, loader)
│   │   └── services/             # Singleton services (e.g., error reporting, global loader state)
│   ├── features/                 # Feature modules (e.g., posts, users, settings)
│   │   └── posts/                # Example: 'Posts' feature
│   │       ├── components/         # Smart & Presentational components specific to this feature
│   │       │   └── post-card/
│   │       ├── models/             # Data models/interfaces for this feature
│   │       ├── services/           # Services specific to this feature (e.g., API calls)
│   │       ├── store/              # NgRx Signal Store for this feature's state
│   │       ├── posts.component.ts  # Container/smart component for the feature
│   │       └── posts.routes.ts     # Routes specific to this feature
│   ├── shared/                   # Shared module: reusable components, directives, pipes
│   │   └── components/           # Common UI components (e.g., header, spinner)
│   ├── app.component.*           # Root application component
│   ├── app.config.ts             # Application configuration (providers, etc.)
│   └── app.routes.ts             # Main application routes
├── environments/                 # Environment-specific configuration
├── index.html                    # Main HTML page
├── main.ts                       # Main entry point of the application
└── styles.css                    # Global styles
```

## Architecture Choices & Reasoning

### Core Framework: Angular

- **Reasoning:** Angular provides a comprehensive and opinionated framework for building robust, scalable single-page applications. Its strong typing with TypeScript, dependency injection system, component-based architecture, and powerful CLI make it suitable for complex projects. I'm using Angular v19+, leveraging its latest features including Signals.

### State Management: NgRx Signals

- **Reasoning:** For state management, I've adopted `@ngrx/signals`. This choice is driven by:
  - **Granular Reactivity:** Signals offer fine-grained reactivity, leading to more performant updates as only affected parts of the UI re-render.
  - **Simplicity & Modern Angular:** Aligns with Angular's new reactivity model, offering a potentially simpler API and mental model compared to traditional NgRx with reducers and effects for certain use cases, especially within feature stores.
  - **Local Feature State:** The `posts.store.ts` within the `features/posts` directory demonstrates managing feature-specific state efficiently.

### Styling: Tailwind CSS

- **Reasoning:** Tailwind CSS is a utility-first CSS framework.
  - **Rapid UI Development:** Allows for quick prototyping and building of custom designs directly in the markup.
  - **Consistency:** Enforces a consistent design language by using predefined utility classes.
  - **Reduced CSS Bloat:** By composing utilities, we avoid writing lots of custom CSS. `postcss` is used in the build process as required by Tailwind.

### Testing: Jest

- **Reasoning:** Jest is chosen as the testing framework over Karma/Jasmine.
  - **Developer Experience:** Jest is known for its speed, powerful mocking capabilities, and "batteries-included" approach.
  - **Snapshot Testing:** Useful for UI components.
  - **Ecosystem:** Widely adopted in the JavaScript community.
  - `jest-preset-angular` is used to configure Jest for Angular projects seamlessly.

### Code Quality: ESLint & Prettier

- **Reasoning:**
  - **ESLint (`@typescript-eslint/eslint-plugin`, `angular-eslint`):** Enforces code style, identifies potential bugs, and ensures adherence to best practices for both TypeScript and Angular.
  - **Prettier:** An opinionated code formatter that ensures consistent code style across the entire codebase, reducing debates and cognitive load.
  - `eslint-config-prettier` and `eslint-plugin-prettier` ensure ESLint and Prettier work well together.

### Pre-commit Hooks: `husky` & `lint-staged`

- **Reasoning:**
  - **Automated Quality Checks:** `husky` and `lint-staged` are configured to automatically run ESLint and Prettier on staged files before each commit.
  - **Maintain Code Quality:** This ensures that code committed to the repository adheres to defined quality standards, preventing common issues from entering the codebase.

### Modular Design

- **Reasoning:** The project is structured into `core`, `features`, and `shared` directories.
  - **Scalability & Maintainability:** This separation of concerns makes the codebase easier to understand, navigate, and scale. New features can be added as independent modules.
  - **Lazy Loading:** Feature modules (like `posts`) are often designed to be lazy-loaded, improving initial application load time.

### HTTP Interceptors

- **Reasoning:** The `core/interceptors` directory houses HTTP interceptors (e.g., `ErrorInterceptor`, `LoaderInterceptor`).
  - **Centralized Logic:** Interceptors provide a way to centrally manage outgoing requests and incoming responses. This is ideal for global error handling, adding authentication tokens, or managing loading indicators (`LoaderService`).

## Common Pitfalls & Issues

- **NgRx Signals Learning Curve:**
  - If new to Signals, understanding their reactivity model and how they differ from traditional RxJS Observables or NgRx Store might take some time. Refer to the official Angular and NgRx documentation.
- **State Management Complexity:**
  - While `@ngrx/signals` can be simpler for local/feature state, ensure complex interactions or shared global state are thoughtfully designed to avoid prop-drilling or overly coupled stores.
- **Jest Configuration for Angular:**
  - Ensure `jest-preset-angular` is correctly set up, especially for handling Angular-specific features like templates, CSS, and dependency injection. Sometimes, specific mocks or `moduleNameMapper` entries might be needed.
- **Environment Variables:**
  - Ensure environment-specific configurations (API URLs, keys) are managed correctly using Angular's `environments` files and are not hardcoded.

## Additional Insights & Motivations

- **Developer Experience (DX):** A key motivation for choosing tools like Jest, Prettier, ESLint, and Husky is to enhance the developer experience by automating common tasks, ensuring code quality, and providing fast feedback loops.
- **Modern Angular Focus:** The project aims to leverage the latest features and best practices from the Angular ecosystem, including standalone components and the new Signals-based reactivity.
- **Scalability:** The feature-sliced architecture and use of NgRx Signals for state management are chosen with scalability in mind, allowing the application to grow without becoming unmanageable.
- **Clear Separation of Concerns:** The project structure and architectural choices (e.g., services for business logic, components for presentation, interceptors for cross-cutting concerns) aim to maintain a clear separation of concerns, making the code easier to test and reason about.
