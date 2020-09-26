import fetch from '../../common/fetch';
import { message } from 'antd';

export function getIntroduction() {
    return fetch({
        url: '/manage/intro',
    });
}

export function getIntroductionImg(lab_photo) {
    return fetch({
        url: `/${lab_photo}`,
    });
}
export function postUpdateIntroduction(introData) {
    let msg = {
        lab_name_en: introData.lab_name_en,
        lab_name: introData.lab_name,
        lab_intro: introData.lab_intro,
        lab_intro_en: introData.lab_intro_en,
        team_intro: introData.team_intro,
        strength: introData.strength
    };

    return fetch({
        url: '/introduction',
        method: 'post',
        data: msg,
    }).then((res) => {
            (res.data === 'success') ?
            message.success('修改成功') : message.error('修改失败')
    });
    // console.log(res)
}

export async function postUpdateImage(file) {
    let uploadImg = new window.FormData();
    uploadImg.append('picture', file);
    return await fetch({
        url: '/labimg',
        method: 'post',
        data: uploadImg,
    });
}