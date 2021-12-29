import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("header", config);
  newObject = { ...newObject, likes: Number(newObject.likes) };
  console.log("newObject", newObject);
  const response = await axios.post(baseUrl, newObject, config);
  console.log("response.data", response.data);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
