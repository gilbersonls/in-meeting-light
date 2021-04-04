import axios from "axios";

import { IML_API_URL } from "../constants/envs";

const api = axios.create({
  baseURL: IML_API_URL,
});

const getEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

export default {
  getEvents,
};
