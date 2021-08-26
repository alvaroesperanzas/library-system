import { get, post, put, remove } from '../helpers/http';
import qs from 'qs';

class BooksService {
  async deliver(record_id) {
    try {
      const response = await post(`/api/deliver-book`, {
        payload: {
          record_id,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async borrow(book_id, user_id) {
    try {
      const response = await post(`/api/borrow-book`, {
        payload: {
          book_id,
          user_id,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async get(id) {
    try {
      const response = await get(`/api/books/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async records(id, page) {
    try {
      const response = await get(`/api/records/${id}?${page ? `page=${page}` : '' }`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async borrowed(page) {
    try {
      const response = await get(`/api/borrowed?page=${page}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async available() {
    try {
      const response = await get('/api/books-available');
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async edit(payload) {
    try {
      const response = await put(`/api/books`, {
        payload,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const response = await remove(`/api/books/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async list(page, filters) {
    const queryString = qs.stringify(filters);
    try {
      const response = await get(`/api/books?${page ? 'page='+page: ''}${queryString ? '&'+queryString : ''}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async add(payload) {
    try {
      const response = await post(`/api/books`, {
        payload,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new BooksService();
