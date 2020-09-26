// import { async } from 'regenerator-runtime';
import { getNewsData, getIntroduction, postDelNew, postUpdateNew } from './service';



export default {
    namespace: 'news',
    initial: {
        editingKey: '',
        maxId: 0,
        dataSource: [],
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

        async getNewsData(dispatch) {
            const res_data = await getNewsData();
            const newsData = res_data.data.data;
            let maxIdTem = -9999;

            newsData.forEach((item, index) => {
                item.key = index;
                maxIdTem = maxIdTem < item.id ? item.id : maxIdTem;
            });

            console.log(maxIdTem);
            try {
                dispatch('setData', { dataSource: newsData, tableLength: newsData.length, maxId: maxIdTem })

            } catch (e) {
                console.log(e)
            }
        },

        async updateNew(dispatch, getState, payload) {
            try {
                console.log(payload)
                await postUpdateNew(payload).then(
                    () => {
                        dispatch('getNewsData');
                    }
                );
            } catch (e) {
                console.table(e);
            }
        },

        async addNew(dispatch, getState) {
            const { maxId } = getState();
            const newData = {
                id: maxId + 1,
                year: "",
                month: "",
                detail: "",
            };
             dispatch('updateNew', newData)
        },

        async delNew(dispatch, getState, payload) {
            try {
                await postDelNew(payload).then(
                    () => {
                        dispatch('getNewsData');
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
        dispatch('getNewsData');
    },
};
