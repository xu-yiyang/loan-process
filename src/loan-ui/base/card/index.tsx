import React from 'react';
import styled, { css } from '../../styled'

const Wrap = styled.div<any>`
  background: #fff;
  border-radius: 0.12rem;
  padding: 0 0.2rem;
  overflow: hidden;
  ${(props) => props.isPadding && css`
    padding: 0.2rem;
  `}
`

export class Card extends React.Component<any, any> {
  public render() {
    const { children } = this.props
    return (
      <Wrap {...this.props} >
        {children}
      </Wrap>
    )
  }
}


export default Card;
