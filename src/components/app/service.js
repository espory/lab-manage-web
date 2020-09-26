import fetch from '../../common/fetch';

export function login() {
  return fetch({
    url: '/manage/manage',
    method: 'get',
  });
}
