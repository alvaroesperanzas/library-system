import errorCodes from './errorCodes';
import constants from './constants';
import config from '../config';

export const withErrorHandling = defaultErrorAction => (error) => {
  const { statusCode } = error;
  if (statusCode === 401) window.location = config.URLS.LOGIN_URL;

  const message = errorCodes[statusCode] ?
    errorCodes[statusCode] : constants.GENERAL_ERROR;
  
  return defaultErrorAction({ message, ...error });
};
