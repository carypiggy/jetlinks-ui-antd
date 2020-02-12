import React, { useState, useEffect } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FormItemConfig } from '@/utils/common';
import { Input, Select, Row, Col, Button, Icon } from 'antd';
import apis from '@/services';
import { DeviceProduct } from '../../product/data';

interface Props extends FormComponentProps {
  search: Function;
}

interface State {
  expandForm: boolean;
  productList: DeviceProduct[];
}

const Search: React.FC<Props> = props => {
  const initState: State = {
    expandForm: true,
    productList: [],
  };

  const {
    form,
    form: { getFieldDecorator },
  } = props;

  const [expandForm, setExpandForm] = useState(initState.expandForm);
  const [productList, setProductList] = useState(initState.productList);

  useEffect(() => {
    //获取下拉框数据
    apis.deviceProdcut
      .queryNoPagin()
      .then(e => {
        setProductList(e.result);
      })
      .catch(() => {
        //
      });
  }, []);

  const simpleItems: FormItemConfig[] = [
    {
      label: '设备名称',
      key: 'name$LIKE',
      component: <Input placeholder="请输入" />,
    },
    {
      label: '状态',
      key: 'state',
      component: (
        <Select placeholder="请选择">
          <Select.Option value="notActive">未激活</Select.Option>
          <Select.Option value="offline">离线</Select.Option>
          <Select.Option value="online">在线</Select.Option>
        </Select>
      ),
    },
  ];

  const advancedItems: FormItemConfig[] = [
    {
      label: '设备名称',
      key: 'name$LIKE',
      component: <Input placeholder="请输入" />,
    },
    {
      label: '状态',
      key: 'state',
      component: (
        <Select placeholder="请选择">
          <Select.Option value="notActive">未激活</Select.Option>
          <Select.Option value="offline">离线</Select.Option>
          <Select.Option value="online">在线</Select.Option>
        </Select>
      ),
    },
    {
      label: '设备型号',
      key: 'productId$LIKE',
      component: (
        <Select placeholder="请选择">
          {productList.map(item => (
            <Select.Option key={item.id}>{item.name}</Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const colSize =
    (expandForm ? simpleItems : advancedItems)
      .map(item => (item.styles ? item.styles.md : 8))
      .reduce((i, j) => {
        if (!i) return;
        if (!j) return;
        return Number(i) + Number(j);
      }) || 1;

  const search = () => {
    const data = form.getFieldsValue();
    //TODO 查询数据
    props.search(data);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (
    <Form {...formItemLayout}>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        {expandForm
          ? simpleItems.map(item => (
              <Col md={8} sm={24} key={item.key}>
                <Form.Item label={item.label}>
                  {getFieldDecorator(item.key)(item.component)}
                </Form.Item>
              </Col>
            ))
          : advancedItems.map(item => (
              <Col
                md={item.styles ? item.styles.md : 8}
                sm={item.styles ? item.styles.sm : 24}
                key={item.key}
                style={{ height: 56 }}
              >
                <Form.Item label={item.label}>
                  {getFieldDecorator(item.key, item.options)(item.component)}
                </Form.Item>
              </Col>
            ))}

        <Col push={16 - (Number(colSize) % 24)} md={8} sm={24}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button
              type="primary"
              onClick={() => {
                search();
              }}
            >
              查询
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                props.search();
              }}
            >
              重置
            </Button>
            {
              <a style={{ marginLeft: 8 }} onClick={() => setExpandForm(!expandForm)}>
                {expandForm ? '展开' : '收起'} <Icon type={expandForm ? 'down' : 'up'} />
              </a>
            }
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create<Props>()(Search);
