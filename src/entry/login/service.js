import fetch from '../../common/fetch';

export function login({ name, password }) {
  return fetch({
    url: '/login',
    method: 'post',
    data: {
      name,
      password,
    },
  });
}
