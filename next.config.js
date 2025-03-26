module.exports = {
    webpack: (config) => {
      config.resolve.fallback = { 
        fs: false,  // Explicitly disable fs module for client-side
        path: false 
      };
      return config;
    }
  }