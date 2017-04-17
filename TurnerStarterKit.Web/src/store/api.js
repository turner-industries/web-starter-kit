import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:14210/api',
  timeout: 10000,
});

// simply sugar for more common usage. If you want more control,
// pull in the "instance" into consuming code and use.
const helper = {
  async get(url, params) {
    const {data} = await instance.get(url, {params});
    return data;
  },
  async post(url, payload) {
    const {data} = await instance.post(url, payload); // pass through until developed
    return data;
  },
  async put(url, ...rest) {
    const {data} = await instance.put(url, ...rest); // pass through until developed
    return data;
  },
  async delete(url, ...rest) {
    const {data} = await instance.delete(url, ...rest); // pass through until developed
    return data;
  },
};

export default helper;
export {instance};
