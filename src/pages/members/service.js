import fetch from '../../common/fetch';
import { message } from 'antd';

export function getMembersData() {
    return fetch({
        url: '/manage/member',
    });
}

export function getMemberImg(photo) {
    return fetch({
        url: `/${photo}`,
    });
}

// export function getIntroductionImg(lab_photo) {
//     return fetch({
//         url: `/${lab_photo}`,
//     });
// }


export async function postUpdateMember(data) {
    await fetch({
        url: '/member',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('修改成功') : message.error('修改失败')
});;
}

export async function postUpdateImage(file) {
    let uploadImg = new window.FormData();
    uploadImg.append('picture', file);
    return await fetch({
        url: '/labimg',
        method: 'post',
        data: uploadImg,
    }).then((res)=>{
        // console.log(res)
        res.statusText==='OK'?message.success('图片上传成功，多次上传仅保存最后一次记录') : message.error('图片上传失败，请重新操作');
        console.log(res)
        return res;
    });
}

export async function postDelMember(data) {
    await fetch({
        url: '/delmember',
        method: 'post',
        data: data,
    }).then((res) => {
        (res.data === 'success') ?
        message.success('删除成功') : message.error('删除失败');
});;
}
