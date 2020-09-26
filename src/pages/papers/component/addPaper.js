import React, { Component } from 'react'
import Title from './title'
import TagWithInput from './addThing/tagWithInput'
import TagWithSelect from './addThing/tagWithSelect'


import { Row, Button } from 'antd';

export default class AddPaper extends Component {
    render() {
        return (
            <div>
                <Row gutter={[0, 18]} justify="space-around" align="middle">
                    <Title spanValue={'22'} fontSize={15} titleName={'新增论文'} childrenTitle={true} />
                    <Button span={2}
                        type="primary"
                    >提交修改</Button>
                </Row>
                <TagWithInput tagName='ID' />
                <TagWithInput tagName='标题' />
                <TagWithInput tagName='作者' />
                <TagWithInput tagName='发表时间' />
                <TagWithInput tagName='会议' />
                <TagWithSelect tagName='分类' />
            </div>
        )
    }
}
