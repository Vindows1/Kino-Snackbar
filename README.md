# Kino-Snackbar

A full-stack application combining React + TypeScript frontend with a Java backend for a cinema snackbar management system.

## Tech Stack

### Frontend
- **React 18** with TypeScript + Vite
- **React Compiler** enabled for optimized performance
- **ESLint** with TypeScript support for code quality
- Hot Module Replacement (HMR) for fast development

### Backend
- **Java** (Spring Boot via Maven)
- Maven for dependency management

### Styling
- **CSS** for component styling

## Project Structure

```
kino-snackbar/
├── frontend/                 # React + TypeScript frontend application
│   └── learning-fronted/    # Vite + React setup
├── learning/                # Java Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── mvnw
└── data/                    # Data/configuration files
```

## Frontend Setup

The frontend uses React + TypeScript + Vite with minimal configuration.

### Available Official Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

### React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

**Note:** This will impact Vite dev & build performances.

### Expanding ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-plugin-react-dom) and enable lint rules for React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Backend Setup

The backend is built with Java and Maven.

### Build and Run

```bash
cd learning

# Using Maven wrapper
./mvnw clean install
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

## Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Java 11+ (for backend)
- Maven 3.6+ (for backend)

### Installation

1. **Frontend Setup**
   ```bash
   cd frontend/learning-fronted
   npm install
   npm run dev
   ```

2. **Backend Setup**
   ```bash
   cd learning
   ./mvnw spring-boot:run
   ```

## Development

### Frontend Development
```bash
cd frontend/learning-fronted
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Development
```bash
cd learning
./mvnw clean install
./mvnw spring-boot:run
```

## License

This project is open source and available under the MIT License.
