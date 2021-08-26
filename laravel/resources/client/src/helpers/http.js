import 'isomorphic-fetch';
import config from '../config';
// import Auth from './Auth';
import {withErrorHandling} from './errorHandling';

export function HttpError(response = {}, parsedBody = {}) {
  this.name = 'HttpError';
  this.message = response.statusText;
  this.stack = new Error().stack;
  this.response = response;
  this.statusCode = response.status;
  this.body = parsedBody;
}

function coerce(k, v) {
  if (v === undefined) {
    return null;
  }
  return v;
}

export function serialize(value) {
  return JSON.stringify(value, coerce);
}

const DEFAULT_HEADERS = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-CSRF-TOKEN': window.csrf_token,
  // 'Authorization': `Bearer ${Auth.getAccessToken()}`,
});

function applyDefaults({ headers = {}, ...options }) {
  /* eslint-disable */
  headers = {
    ...DEFAULT_HEADERS(),
    ...headers,
  };

  return {
    headers,
    ...options,
  };
}

function parseResponse(response) {
  // response.json() doesn't handle null body properly.
  /* eslint-disable */
  return response.text().then(text => text ? JSON.parse(text) : {});
}

function processResponse(response) {
  if (!response.ok) {
    return parseResponse(response).then((parsedBody) => {
      throw new HttpError(response, parsedBody);
    }).catch(withErrorHandling((error) => {
      throw error;
    }));
  }
  return parseResponse(response);
}

export const resolveUrl = (url, base = config.URLS.API_URL) => {
  /* eslint-disable */
  url = url || '';
  return (url.startsWith('//') || url.startsWith('http')) ? url : `${base}${url}`;
};

export function get(url, options = {}, fetch = window.fetch) {
  return fetch(
    resolveUrl(url),
    applyDefaults({ ...options, method: 'GET' }),
  ).then(processResponse);
}

export function getFile(url, options = {}, fetch = window.fetch) {
  return fetch(
    resolveUrl(url),
    applyDefaults({ ...options, method: 'GET' }),
  );
}

export function remove(url, options = {}, fetch = window.fetch) {
  return fetch(
    resolveUrl(url),
    applyDefaults({ ...options, method: 'DELETE' }),
  ).then(processResponse);
}

export function post(url, options = {}, fetch = window.fetch) {
  const body = options.payload ? serialize(options.payload) : options.body;
  return fetch(
    resolveUrl(url),
    applyDefaults({ ...options, body, method: 'POST' }),
  ).then(processResponse);
}

export function put(url, options = {}, fetch = window.fetch) {
  const body = options.payload ? serialize(options.payload) : options.body;

  return fetch(
    resolveUrl(url),
    applyDefaults({ ...options, body, method: 'PUT' }),
  ).then(processResponse);
}

HttpError.prototype = new Error();