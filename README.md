# Kino-Snackbar

A full-stack application combining React + TypeScript frontend with a Java Spring Boot backend for a cinema snackbar management system. Features token-based authentication using Spring Security.

## Tech Stack

### Frontend
- **React 18** with TypeScript + Vite
- **React Compiler** enabled for optimized performance
- **React Router** for client-side routing
- **ESLint** with TypeScript support for code quality
- Hot Module Replacement (HMR) for fast development

### Backend
- **Java** (Spring Boot via Maven)
- **Spring Security** for authentication and authorization
- Maven for dependency management

### Styling
- **CSS** for component styling

## Project Structure

```
kino-snackbar/
├── frontend/                 # React + TypeScript frontend application
│   └── learning-fronted/    # Vite + React setup with routing and authentication
├── learning/                # Java Spring Boot backend with Spring Security
│   ├── src/
│   │   ├── main/java/com/example/learning/
│   │   │   ├── config/      # Spring Security & CORS configuration
│   │   │   ├── controller/  # REST API controllers (including AuthController)
│   │   │   ├── model/       # Entity classes (AppUser, Bestellung, etc.)
│   │   │   ├── repository/  # Spring Data repositories
│   │   │   └── service/     # Business logic services
│   │   └── resources/
│   ├── pom.xml
│   └── mvnw
└── data/                    # Data/configuration files
```

## Frontend Setup

The frontend uses React + TypeScript + Vite with client-side routing and authentication.

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

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-plu[...]

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

The backend is built with Java and Maven with Spring Security for authentication.

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

## Authentication

### Spring Security Configuration

The application uses Spring Security with session-based authentication:

- **CORS Configuration**: Allows requests from `http://localhost:5173` (frontend)
- **Session Management**: Uses `SessionCreationPolicy.IF_REQUIRED`
- **Password Encoding**: BCrypt with strength 10
- **Default User**: 
  - Username: `admin`
  - Password: `geheim123`
  - Role: `ADMIN`

### Authentication Flow

1. **Frontend Login**: User submits credentials via the login form in `App.tsx`
2. **Backend Login Endpoint**: `POST /api/auth/login`
   - Accepts JSON: `{ "username": "admin", "password": "geheim123" }`
   - Returns: `{ "message": "Login erfolgreich!", "user": "<username>" }`
   - Sets session cookie for authenticated requests

3. **Authenticated Requests**: Frontend sends `credentials: 'include'` with all API calls to automatically include session cookies

### Protected Endpoints

All endpoints except `/api/auth/login` require authentication. Protected endpoints include:
- `GET /getraenke/all` - List all beverages
- `GET /snacks/all` - List all snacks
- `GET /bestellungen/all` - List all orders
- `POST /bestellungen/add` - Create new order

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

The application will be available at `http://localhost:5173` (frontend) and `http://localhost:8080` (backend).

### First Login

Navigate to the application and log in with:
- **Username**: `admin`
- **Password**: `geheim123`

## Development

### Frontend Development
```bash
cd frontend/learning-fronted
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Frontend Structure
- **App.tsx**: Main component with login logic and routing
- **Pages**: 
  - `Getraenke.tsx` - Beverages page
  - `Snacks.tsx` - Snacks page
  - `Bestellung.tsx` - Orders page
- **Components**:
  - `BestellungForm.tsx` - Main order creation form with navigation

### Backend Development
```bash
cd learning
./mvnw clean install
./mvnw spring-boot:run
```

### Backend Structure
- **config/**:
  - `SecurityConfig.java` - Spring Security and CORS configuration
  - `SetupDataLoader.java` - Initial data setup (creates default admin user)
- **controller/**:
  - `AuthController.java` - Authentication endpoints
  - `BestellungController.java` - Order management endpoints
- **model/**:
  - `AppUser.java` - User entity for authentication
  - `SecurityUser.java` - Spring Security UserDetails implementation
  - `Bestellung.java` - Order entity (now includes creation timestamp)
- **service/**:
  - `UserService.java` - User creation with password encoding
  - `MyUserDetailsService.java` - Spring Security user details service
- **repository/**:
  - `UserRepository.java` - User data access
  - `BestellungRepository.java` - Order data access

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username and password (public)

### Orders (requires authentication)
- `GET /bestellungen/all` - Get all orders
- `GET /bestellungen/{publicId}` - Get specific order
- `POST /bestellungen/add` - Create new order

### Products (requires authentication)
- `GET /getraenke/all` - Get all beverages
- `GET /snacks/all` - Get all snacks

## Recent Changes (PR #3)

### Frontend Updates
- **App.tsx** now serves as the main host component with:
  - Login screen for unauthenticated users
  - User greeting with logout button
  - Client-side routing via React Router
- **Navigation**: Updated from hardcoded `href` attributes to React Router `Link` components in:
  - `BestellungForm.tsx`
  - `GetraenkeList.tsx`
  - `SnackList.tsx`
- **Authentication**: Added `credentials: 'include'` to all fetch calls to support session-based authentication

### Backend Updates
- **New Dependencies**:
  - `spring-boot-starter-security` - Spring Security framework
  - `spring-security-test` - Security testing utilities
- **New Classes**:
  - `SecurityConfig.java` - Configures Spring Security with CORS and session management
  - `AuthController.java` - Handles login requests
  - `AppUser.java` - User entity for authentication
  - `SecurityUser.java` - Spring Security UserDetails wrapper
  - `UserService.java` - User management with password encoding
  - `MyUserDetailsService.java` - Custom user details service
  - `UserRepository.java` - User database access
  - `SetupDataLoader.java` - Creates default admin user on startup
- **Enhanced Models**:
  - `Bestellung.java` - Added `erstellt_am` timestamp field
  - `BestellungDTO.java` - Added `erstellt_am` field

## License

This project is open source and available under the MIT License.
