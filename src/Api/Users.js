import Api from "../Api/Api";

export default {
  get(limit, page) {
    return Api.get(`/users?limit=${limit}&page=${page}`);
  },

  post(user) {
    return Api.post("/user", { user });
  },
};
