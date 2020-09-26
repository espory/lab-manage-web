import fetch from '../../common/fetch';
import { message } from 'antd';

export function getNewsData() {
    return fetch({
        url: '/manage/news',
    });
}



export async function postUpdateNew(data) {
    await fetch({
        url: '/news',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('修改成功') : message.error('修改失败')
});;
}

export async function postDelNew(data) {
    console.log(data)
    await fetch({
        url: '/delnews',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('删除成功') : message.error('删除失败');
});;
}
