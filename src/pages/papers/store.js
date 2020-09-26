// import { async } from 'regenerator-runtime';
import { getData, postDelData, postUpdateData, getCategory, postAddCategory } from './service';



export default {
    namespace: 'papers',
    initial: {
        maxId: 0,
        editingKey: '',
        dataSource: [],
        category:[],
        // membersData: []
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

        async getData(dispatch, getState) {
            const dataSource = await getData();
            const category = await getCategory();
            const newsData = dataSource.data.data;
            const categoryData = category.data.data;
            console.log(categoryData)     ;       
            let maxIdTem = -9999;
            newsData.forEach((item,index) => {
                item.key = index
                maxIdTem = maxIdTem < item.id ? item.id : maxIdTem;

            });
            categoryData.forEach((item,index) =>{
                item.key = index
            });


            try {
                dispatch('setData', { dataSource: newsData, tableLength: newsData.length, category:categoryData , maxId:maxIdTem})
            } catch (e) {
                console.log(e)
            }
        },

        async addData(dispatch, getState) {

            let { maxId } = await getState()

            const newData = {
                id: maxId+1,
                title: "",
                author: "",
                conference: "",
                time: "",
                category: "Software",
            };

            let commitPaper = {
                type: "add",
                oldCategory: '',
                data: newData
            };

            await dispatch('updateData', commitPaper);
        },

        async modifyData(dispatch, getState, payload) {

            // console.log('newRow: ', payload.newRow);
            // console.log('oldRow: ', payload.oldRowCategory);
            let {newRow, oldRowCategory} =  payload;

            let commitPaper = {
                type: "modify",
                oldCategory: oldRowCategory || '',
                data: newRow
            };

            await dispatch('updateData', commitPaper);

        },

        async updateData(dispatch, getState, payload) {
            try {
                console.log(payload)
                await postUpdateData(payload).then(
                    () => {
                        dispatch('getData');
                    }
                );
            } catch (e) {
                console.table(e);
            }
        },

        async delData(dispatch, getState, payload) {
            try {
                await postDelData(payload).then(
                    () => {
                        dispatch('getData');
                    }
                );
            } catch (e) {
                console.table(e);
            }
        },


        async addCategory(dispatch, getState, payload) {

            let commitCategory = {
                newCategory: payload,
            }
            await postAddCategory(commitCategory).then(
                () => {
                    dispatch('getData');
                }
            );
        },
    },
    /**
     * 初始化请求
     * @param {Function} dispatch dispatch方法
     * @param {Function} getState 获取当前页面store
     * @param {Object} payload dispatch参数
     */
    async setup(dispatch, getState, payload) { // eslint-disable-line
        dispatch('getData');
    },
};
