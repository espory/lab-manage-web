import { async } from 'regenerator-runtime';
import { getMembersData, getIntroduction, postDelMember, postUpdateMember } from './service';



export default {
    namespace: 'members',
    initial: {
        editingKey: '',
        maxId: 0,
        instructorData: [],
        doctorData: [],
        masterData: [],
        formerData: [],
        tableLength: 0,
    },

    reducers: {
        setData(state, payload) {
            return {
                ...state,
                ...payload,
            };
        },
        setEditingKey(state, payload) {
            return {
                ...state,
                editingKey: payload
            }
        }
    },

    asyncs: {

        async getMembersData(dispatch, getState) {


            const res_data = await getMembersData();
            // console.log(res_data.data.data.members);
            const members = res_data.data.data.members
            let maxIdTem = -9999;
            members.forEach((item, index) => {
                item.isSet = false;
                item.detail = item.detail.join("&&");
                item.degree = item.degree.join("&&");
                item.photo = item.photo ? item.photo : 'upload/upload_6a8ce3cc760f4052129b4cb1333d014e.png'
                item.key = index;
                maxIdTem = maxIdTem < item.id ? item.id : maxIdTem;
            });

            const instructor = members.filter(item => (item.type === 'instructor'));
            const doctor = members.filter(item => (item.type === 'doctor'));
            const master = members.filter(item => (item.type === 'master'));
            const former = members.filter(item => (item.type === 'former'));

            try {
                dispatch('setData', { instructorData: instructor, doctorData: doctor, masterData: master, formerData: former, tableLength: members.length, maxId: maxIdTem })

            } catch (e) {
                console.log(e);
            }
        },

        async addMember(dispatch, getState, payload) {

            let { maxId } = getState();

            const newData = {
                id: maxId + 1,
                name_cn: "",
                name_en: "",
                institude: "",
                job_title: "",
                degree: "",
                detail: "",
                type: payload.slice(0, -4),
                photo: `upload/upload_6a8ce3cc760f4052129b4cb1333d014e.png`,
                url: ""
            };

            dispatch('updateMember', newData);
        },

        async updateMember(dispatch, getState, payload) {
            try {
                await postUpdateMember(payload).then(
                    () => {
                        dispatch('getMembersData');
                    }
                );
            } catch (e) {
                console.table(e);
            }
        },

        async delMember(dispatch, getState, payload) {
            try {
                await postDelMember(payload).then(
                    () => {
                        dispatch('getMembersData');
                    }
                );
            } catch (e) {
                console.table(e);
            }
        },
    },
    /**
     * 初始化请求
     * @param {Function} dispatch dispatch方法
     * @param {Function} getState 获取当前页面store
     * @param {Object} payload dispatch参数
     */
    async setup(dispatch, getState, payload) { // eslint-disable-line
        dispatch('getMembersData');
    },
};
