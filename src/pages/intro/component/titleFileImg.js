import React, { Component } from 'react'
import { Row, Upload, message } from 'antd'
import { postUpdateImage } from '../service'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {HOST} from '../../../common/fetch'

import Title from './title'
import { from } from 'form-data';


export default class TitleFileImg extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }


    render() {
        const { dispatch, labImg } = this.props;
        // const HOST = 'http://localhost:7001';

        let {loading} = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Row align="left" gutter={[14, 18]}>
                <Title spanValue={24} fontSize={15} titleName={this.props.titleName} childrenTitle={true} />
                <Upload
                    method='POST'
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    style={{ width: '300px' }}
                    showUploadList={false}
                    customRequest={async (detail) => {
                        await postUpdateImage(detail.file).then(async callback=>{
                            console.log(callback)
                            await dispatch('setData',{labImg:`${HOST}/${callback.data.url}`})
                            message.success('宣传照更新成功');
                        });
                        detail.onSuccess();
                    }}
                    onChange={(info) => {
                        if (info.file.status === 'uploading') {
                            this.setState({ loading: true });
                        }
                        if (info.file.status === 'done') {
                            this.setState({ loading: false })
                        }
                    }}
                >
                    {console.log(labImg)}
                    {labImg ? <img src={labImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Row>
        )
    }
}

