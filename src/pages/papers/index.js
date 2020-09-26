import React, { Component } from 'react'
import pageWrapper from '../../components/page-wrapper';
import PageContainer from '../../components/page-container';
import Title from './component/title'
import AddPaper from './component/addPaper'
import Addcategory from './component/addCategory'
import TitleWithTable from './component/titleWithTable'


import store from './store';
import { Divider, Row, Col, Button, Form, Input } from 'antd';


@pageWrapper({ store })
export default class Papers extends Component {
    render() {

        const { dispatch } = this.props;
        const { editingKey, dataSource, tableLength, category } = this.props;

        return (
            <PageContainer>
                <Title spanValue={'24'} fontSize={18} titleName={"论文管理"} />
                <Divider />
                {/* <AddPaper />
                <Divider /> */}
                <Addcategory  dispatch={dispatch} />
                <Divider />
                <TitleWithTable titleName={'论文总览'} dispatch={dispatch} editingKey={editingKey} dataSource={dataSource} tableLength={tableLength} category={category}  />
            </PageContainer>

        )
    }
}

