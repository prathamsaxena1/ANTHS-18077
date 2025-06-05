// debug-routes.js

import app from './app.js';

// Function to recursively print all registered routes
const printRoutes = (layer, path = '') => {
  if (layer.route) {
    // Routes registered directly
    const methods = Object.keys(layer.route.methods)
      .filter(method => layer.route.methods[method])
      .join(', ');
    
    try {
      // This is where the error might occur - testing each path
      const fullPath = path + layer.route.path;
      console.log(`${methods.toUpperCase()} ${fullPath}`);
    } catch (error) {
      console.error(`ERROR in route: ${path} + [INVALID PATH SYNTAX]`, error.message);
      console.error('This is likely the problematic route!');
    }
  } else if (layer.name === 'router' && layer.handle.stack) {
    // Router middleware
    layer.handle.stack.forEach(stackItem => {
      printRoutes(stackItem, path + (layer.regexp.fast_slash ? '' : layer.regexp.toString()));
    });
  } else if (layer.name === 'bound dispatch' && layer.route) {
    // Routes inside a router
    printRoutes(layer, path);
  }
};

// Print all routes
console.log('=== REGISTERED ROUTES ===');
app._router.stack.forEach(layer => {
  printRoutes(layer);
});
console.log('========================');