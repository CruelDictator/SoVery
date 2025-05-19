# Cursor Rules for Lerna Upgrade Project

## Code Style and Formatting Rules

1. **JavaScript/React Code Style**

   - Use single quotes for strings (as per .prettierrc)
   - Maximum line length of 100 characters (as per .prettierrc)
   - Follow ESLint configuration from .eslintrc.json:
     - Use babel-eslint parser
     - Follow standard and React recommended rules
     - Enable JSX support
     - Use import/export syntax
     - Disable console warnings
     - Require .js/.jsx extensions for React components

2. **File Organization**

   - Keep packages in src/\* directory (as per lerna.json)
   - Maintain separate client and server directories
   - Follow existing directory structure:
     - src/client/ for React frontend
     - src/server/ for Node.js backend
     - Root level for shared configuration

3. **Version Control**

   - Ignore patterns from .gitignore:
     - .env files
     - node_modules
     - dist directories
     - \*.log files
     - package-lock.json and yarn.lock
   - Use husky pre-commit hooks for:
     - ESLint validation
     - Prettier formatting
     - Lint-staged checks

4. **Dependency Management**

   - Follow independent versioning (as per lerna.json)
   - Maintain separate package.json files for:
     - Root package (core dependencies)
     - Client package (frontend dependencies)
     - Server package (backend dependencies)
   - Use exact versions for critical dependencies
   - Document all dependency updates in changelog

5. **Build and Development**

   - Follow webpack configuration patterns:
     - Use babel-loader for JS/JSX
     - Support CSS/Less modules
     - Handle static assets
     - Configure dev server with proxy
   - Maintain separate build processes for:
     - Development (npm run dev)
     - Production (to be implemented)
     - Testing (to be implemented)

6. **Testing and Validation**

   - Follow existing validation patterns:
     - Use Yup for form validation
     - Implement comprehensive test coverage (target: 100%)
     - Use Jest for testing (to be implemented)
   - Maintain validation schemas in separate files
   - Follow existing error message patterns

7. **Documentation**

   - Follow README.md structure:
     - Clear tech stack documentation
     - Prerequisites section
     - Installation instructions
     - Development and production setup
   - Document all breaking changes
   - Maintain up-to-date dependency badges
   - Include security vulnerability status

8. **Security**

   - Follow existing security patterns:
     - Use environment variables for sensitive data
     - Implement Helmet for security headers
     - Use bcrypt for password hashing
     - Follow session management best practices
   - Maintain security audit process
   - Document security updates

9. **Development Workflow**

   - Follow sequential task execution (as per LernaDependencyUpdatePlan.md)
   - Maintain clear task status tracking
   - Document all changes and updates
   - Follow established rollback procedures
   - Implement comprehensive testing at each stage

10. **Code Quality**
    - Follow existing code quality patterns:
      - Use ESLint for static analysis
      - Implement Prettier for formatting
      - Follow React best practices
      - Maintain consistent error handling
    - Document code quality metrics
    - Track technical debt

## Implementation Rules

1. **Package Updates**

   - Follow defined update order from LernaDependencyUpdatePlan.md
   - Maintain backward compatibility where possible
   - Document all breaking changes
   - Test thoroughly after each update

2. **Configuration Updates**

   - Maintain existing configuration patterns
   - Update configurations incrementally
   - Document all configuration changes
   - Test configurations in isolation

3. **Build Process**

   - Follow existing webpack configuration
   - Maintain separate client/server builds
   - Document build process changes
   - Test build outputs thoroughly

4. **Testing Strategy**

   - Follow existing validation patterns
   - Implement comprehensive testing
   - Maintain test coverage
   - Document test results

5. **Documentation Updates**
   - Follow existing documentation structure
   - Update all relevant documentation
   - Maintain changelog
   - Document breaking changes

## Validation Rules

1. **Code Validation**

   - Run ESLint before commits
   - Apply Prettier formatting
   - Validate against existing patterns
   - Check for security vulnerabilities

2. **Build Validation**

   - Test all build configurations
   - Verify production builds
   - Check for build warnings
   - Validate asset generation

3. **Dependency Validation**

   - Check dependency compatibility
   - Verify version constraints
   - Test peer dependencies
   - Validate security updates

4. **Documentation Validation**
   - Verify documentation accuracy
   - Check for broken links
   - Validate code examples
   - Review changelog entries
