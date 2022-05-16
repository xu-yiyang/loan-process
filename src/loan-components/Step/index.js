import React from 'react';
import { styled } from 'loan-ui';
import Config from 'scene-config/index';
import { Steps as Stp } from 'antd-mobile';
import uuidv4 from 'uuid/v4';

const { Step } = Stp;

const Wrap = styled.div`
  margin: 0 0 0.3rem;
  .customIcon {
    width:15px;
    height:15px;
    border-radius: 50%;
    margin-top: 3px;
  }
  .am-steps-item-content {
    width: 85px !important;
  }
  .am-steps-item-finish .am-steps-item-icon > .am-steps-icon .customIcon{
    background: #0E66FF;
  }
  .am-steps-item-custom.am-steps-item-process .am-steps-item-icon > .am-steps-icon .customIcon{
    background: #0E66FF;
  }
  .am-steps-item-wait .am-steps-item-icon > .am-steps-icon .customIcon {
    background: #ccc;
  }
`

const Title = styled.div`
  font-size: 0.24rem;
`

const Steps = ({current}) => {
  const steps = [
    {
      title: <Title>{Config.text.steps1}</Title>,
    },
    {
      title: <Title>{Config.text.steps2}</Title>,
    },
    {
      title: <Title>{Config.text.steps3}</Title>,
    },
  ];
  return (
    <Wrap>
      <Stp current={current} direction="horizontal">
        {steps.map(item => (
          <Step icon={<div className='customIcon'></div>} key={uuidv4()} title={item.title} />
        ))}
      </Stp>
    </Wrap>
  );
}
export {
  Steps
}
