/*
 * Configuration
 */

const ENVIRONMENTS = {
  DEV: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

const config = {
  [ENVIRONMENTS.DEV]: {
    URLS: {
      HOST: 'http://localhost:8000',
      API_URL: 'http://localhost:8000',
      LOGIN_URL: 'http://localhost:8000/login'
    }
  },
  [ENVIRONMENTS.STAGING]: {
    URLS: {
      HOST: 'https://alvarozetina.dev',
      API_URL: 'https://alvarozetina.dev',
      LOGIN_URL: 'https://alvarozetina.dev/login'
    }
  },
  [ENVIRONMENTS.PRODUCTION]: {
    URLS: {
      HOST: 'https://alvarozetina.dev',
      API_URL: 'https://alvarozetina.dev',
      LOGIN_URL: 'https://alvarozetina.dev/login'
    }
  },
};

export const hostname = {
  get: () => window.location.hostname,
};

export const heuristicEnvironment = () => {
  // eslint-disable-next-line no-underscore-dangle
  const _hostname = hostname.get();
  if (_hostname) {
    if (_hostname.includes('0.0.0.0') ||
        _hostname.includes('127.0.0.1') ||
        _hostname.includes('localhost')) {
      return ENVIRONMENTS.DEV;
    }

    if (_hostname.indexOf('staging') !== -1) {
      return ENVIRONMENTS.STAGING;
    }
  }
  // Default to Production
  return ENVIRONMENTS.PRODUCTION;
};

const env = heuristicEnvironment();
// Expose ENV to console
window.env = env;

export default {
  ENV: env,
  ENVIRONMENTS,
  ...config[env],
};
