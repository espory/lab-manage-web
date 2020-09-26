import React, { useContext, useState, useEffect, useRef } from 'react';
import { Tag, Table, Input, Button, Popconfirm, Form, Col, Row, Select } from 'antd';
import { Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { postUpdateImage } from '../service'


const { TextArea } = Input;

import Title from './title'
import { call } from 'file-loader';
import Item from 'antd/lib/list/Item';
const { Option } = Select;


export default function TitleWithTable(props) {
  const { dispatch, editingKey, dataSource, dataName, tableLength, category } = props;

  const [form] = Form.useForm();

  const data = dataSource;

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    key,
    children,
    ...restProps
  }) => {

    const inputNode = inputType === 'text' ? <Input /> : (
      <Select style={{ width: 120 }}>
        {category.map((item) => (
          <Option key={item.key} value={item.category}>{item.category}</Option>
        ))}
        {/* <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
      </Option>
        <Option value="Yiminghe">yiminghe</Option> */}
      </Select>
    );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {inputNode}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };


  const cancel = () => {
    dispatch('setEditingKey', '')
  };

  const isEditing = (record) => record.key === editingKey;
  const handleAdd = () => {
    dispatch('addData');
  }
  const edit = (record) => {
    // console.log(record)
    form.setFieldsValue({
      ...record,
    });
    dispatch('setEditingKey', record.key)
  };
  const del = (record) => {
    console.log(record)
    dispatch('delData', record);
  };
  const save = async (record) => {
    // console.log(record)
    try {
      const row = await form.validateFields();
      const newRow = { ...record, ...row };
      console.log(row)
      console.log(record)
      await dispatch('modifyData', { 'newRow': newRow, 'oldRowCategory': record.category })
      await dispatch('setEditingKey', '')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: 'id',
      width: 200,
      dataIndex: 'id',
      editable: false,

    },
    {
      title: '标题',
      width: 200,
      dataIndex: 'title',
      editable: true,

    },
    {
      title: '作者',
      width: 200,
      dataIndex: 'author',
      editable: true,
    },
    {
      title: '会议',
      width: 200,
      dataIndex: 'conference',
      editable: true,
    },
    {
      title: '发表时间',
      width: 200,
      dataIndex: 'time',
      editable: true,
    },
    {
      title: '分类',
      width: 200,
      dataIndex: 'category',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (<span>
          <a
            // href="javascript:;"
            onClick={() => save(record)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </a>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>) : (
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Tag color={editingKey === '' ? "green" : 'gray'} onClick={() => {
                  if (editingKey === '') {
                    edit(record);
                  }
                }} >编辑</Tag>
              </Col>
              <Col span={24}>
                <Popconfirm title="Sure to delete?" onConfirm={() => del(record)}>
                  <Tag color="red" >删除</Tag>
                </Popconfirm>
              </Col>
            </Row>
          )
      }
    },
  ];

  const mergedColumns = columns.map((col) => {

    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'category' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const components = {
    body: {
      // row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <Form form={form} component={false}>

      <Row justify="space-around" align="middle" gutter={[0, 14]}>
        <Col span={22} >
          <Title spanValue={'24'} fontSize={17} titleName={props.titleName} childrenTitle={true} />
        </Col>
        <Col span={2}>
          <Button
            onClick={handleAdd}
            type="primary"
          // style={{
          //   // marginBottom: 16,
          //   background :"volcano"

          // }}
          >
            添加新闻
        </Button>
        </Col>

      </Row>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={mergedColumns}
      />
    </Form>

  )
}