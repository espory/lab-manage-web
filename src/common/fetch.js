import axios from 'axios';

export const HOST = 'http://localhost:7003';
// export const HOST = 'http://localhost:3000';

export default function fetch(option = {}) {
  const { url, ...rest } = option;
  return axios({
    url: `${HOST}${url}`,
    withCredentials: true,
    ...rest,
  }).then(res => {
    return(res);
  });
}
