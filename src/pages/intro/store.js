import { getIntroduction,getIntroductionImg, postUpdateIntroduction } from './service';

// import { postSubscribeGroup, postUnsubscribeGroup } from './service';
// import { postDeleteGroup, postCreateGroup, postUpdateGroup } from './service';


export default {
    namespace: 'intro',
    initial: {
        introData: '',
        labImg:'',
    },

    reducers: {
        setData(state, payload) {
            return {
                ...state,
                ...payload,
            };
        },
    },

    // async action
    asyncs: {
        // async getSubData(dispatch, getState) {
        //   const { subGroupPageInfo } = getState();
        //   const { current, pageSize } = subGroupPageInfo;
        //   try {
        //     dispatch('setData', { loading: true });
        //     const { rows, total } = await getSubbedGroup({ current, pageSize });
        //     dispatch('setData', { loading: false, subGroupPageInfo: { ...subGroupPageInfo, total }, subGroupList: rows });
        //   } catch (e) {
        //     console.log(e);
        //   }
        // },

        async getIntroduction(dispatch, getState) {
            const res_data = await getIntroduction();
            const res_img = await getIntroductionImg(res_data.data.data.lab_photo);
            try {
                dispatch('setData', { introData: res_data.data.data, labImg:res_img.config.url })
            } catch(e){
                console.log(e);
            }
        },

        async updateIntroduction(dispatch, getState, payload) {
            try {
              const { introData } = getState();
              await postUpdateIntroduction(introData);
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
        dispatch('getIntroduction');
    },
};
