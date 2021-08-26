import { get, post, put, remove } from '../helpers/http';

class CategoriesService {

  async get(id) {
    try {
      const response = await get(`/api/categories/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async edit(payload) {
    try {
      const response = await put(`/api/categories`, {
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
      const response = await remove(`/api/categories/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async list(page) {
    try {
      const response = await get(`/api/categories?page=${page}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async add(payload) {
    try {
      const response = await post(`/api/categories`, {
        payload,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new CategoriesService();
