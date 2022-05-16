import React, { Component } from 'react';
import { Picker, List } from 'antd-mobile';

class PickerItem extends Component {
  state = {
    pickerVal: this.props.pickerVal
  }
  render() {
    const { data, label, name, getFieldProps = () => {}, rules =[], cols=1 } = this.props
    return (
      <Picker
        {...getFieldProps(name, {
          onChange: (val) => {
            this.setState({
              pickerVal: val,
            });
          },
          rules: rules,
          initialValue: this.state.pickerVal
        })}
        extra='tolong pilih'
        data={data}
        cols={cols}
        // format={(labels) => {
        //   console.log(labels, '22');
        //   console.log(this.state.pickerVal, '22');
        //   return labels.join(',');
        // }}
      >
        {
          this.props.children || <List.Item arrow="horizontal">{label}</List.Item>
        }
      </Picker>
    );
  }
}
export {PickerItem}
