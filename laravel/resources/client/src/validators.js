import _ from 'lodash';

export const createBookValidator = (values) => {
  const {name, author, publication_date} = values;
  const errors = {};

  if (_.isEmpty(name)) {
    errors.name = 'Required';
  }

  if (_.isEmpty(author)) {
    errors.author = 'Required';
  }

  if (!publication_date) {
    errors.publication_date = 'Required';
  }

  return errors;
};

export const createCategoriesValidator = (values) => {
  const {name, description, books} = values;
  const errors = {};

  if (_.isEmpty(name)) {
    errors.name = 'Required';
  }

  if (_.isEmpty(description)) {
    errors.description = 'Required';
  }

  if (_.isEmpty(books) || _.every(books, ['remove', true])) {
    errors.books = 'Books are required';
  }

  return errors;
};

export const createUserValidator = (values) => {
  const {name, email} = values;
  const errors = {};

  if (_.isEmpty(name)) {
    errors.name = 'Required';
  }

  if (_.isEmpty(email)) {
    errors.email = 'Required';
  }

  return errors;
};

export const borrowBookValidator = (values) => {
  const {book, user} = values;
  const errors = {};

  if (_.isEmpty(book)) {
    errors.book = 'Required';
  } else if (book.record) {
    errors.book = 'Book not available';
  }

  if (_.isEmpty(user)) {
    errors.user = 'Required';
  }

  if (!book.id) {
    errors.book = 'Select a book from the list';
  }

  if (!user.id) {
    errors.user = 'Select an user from the list';
  }

  return errors;
};

export const deliverBookValidator = (values) => {
  const {book} = values;
  const errors = {};

  if (_.isEmpty(book)) {
    errors.book = 'Required';
  }

  if (!book.id) {
    errors.book = 'Select a book from the list';
  }

  return errors;
}