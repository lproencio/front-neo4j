import Api from "../Api/Api";

export default {
  get(limit, page) {
    return Api.get(`/users?limit=${limit}&page=${page}`);
  },

  post(user) {
    return Api.post("/user", { user });
  },

  update(id, user) {
    return Api.put(`/users/${id}`, { user });
  },

  delete(id) {
    return Api.delete(`/users/${id}`);
  },
};
