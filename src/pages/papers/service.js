import fetch from '../../common/fetch';
import { message } from 'antd';

export function getData() {
    return fetch({
        url: '/manage/paper',
    });
}

export function getCategory(){
    return fetch({
        url: '/manage/category',
    });
}

export async function postAddCategory(data) {
    await fetch({
        url: '/category',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('添加成功') : message.warning('失败，可能为重复类型')
});;
}

export async function postUpdateData(data) {
    await fetch({
        url: '/paper',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('修改成功') : message.error('修改失败')
});;
}

export async function postDelData(data) {
    console.log(data)
    await fetch({
        url: '/delpaper',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('删除成功') : message.error('删除失败');
});;
}
