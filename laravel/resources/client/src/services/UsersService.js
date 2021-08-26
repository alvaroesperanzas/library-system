import { get, post, put, remove } from '../helpers/http';

class UsersService {

  async get(id) {
    try {
      const response = await get(`/api/users/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async edit(payload) {
    try {
      const response = await put(`/api/users`, {
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
      const response = await remove(`/api/users/${id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async list(page) {
    try {
      const response = await get(`/api/users${page ? '?page='+page: ''}`);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async add(payload) {
    try {
      const response = await post(`/api/users`, {
        payload,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new UsersService();
