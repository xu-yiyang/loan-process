import React, { Component } from 'react';
// import axios from 'axios'
import { styled } from 'loan-ui';
import { history, ConfigContext, axios } from 'loan-utils';
// import { X_ADVAI_KEY } from 'constants/index'
import { NavWrap } from 'loan-components';
import LoadingImg from './assets/loading.png';

const Loading = styled.div`
  height: calc(100vh - 1.54rem);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #FFF;
  border-radius: 8px;
  div {
    img {
      width: 80%;
    }
    p {
      font-size:0.28rem;
      font-weight:400;
      color:rgba(0,0,0,1);
      margin-top:0.3rem;
    }
  }
`

class FaceScene extends Component {
  static contextType = ConfigContext;
  
  componentDidMount() {
    // const instance = axios.create();
    // instance.defaults.headers.common['X-ADVAI-KEY'] = X_ADVAI_KEY[getEnv];
    // instance.defaults.headers.common['Content-Type'] = 'application/json';
    // instance.post('/openapi/liveness/v1/h5/get-result', {
    //   token: localStorage.getItem('faceToken')
    // })
    // .then(res => {
    //   console.log(res);
    //   if(res.data.code === 'SUCCESS') {
    //     history.replace('confirm-order-scene')
    //   } else {
    //     history.replace('match-fail-scene')
    //   }
    // })
    // .catch((err) => {
    //   console.log(err)
    //   history.replace('match-fail-scene')
    // })
    axios.get(`/loan/liveness/result?liveness_token=${localStorage.getItem('faceToken')}`).then(res => {
      // eslint-disable-next-line
      if(res.data === 1) {
        history.replace('confirm-order-scene')
      } else {
        history.replace('match-fail-scene')
      }
    })
  }

  componentWillUnmount() {
    // localStorage.removeItem('faceToken')
  }

  render() {
    const { text } = this.context
    return (
      <NavWrap title={text.confirmOrderScene_title}>
        <Loading>
          <div>
            <img src={LoadingImg} alt="" />
            <p>
              {text.confirmOrderScene_load_p1}.
              {text.confirmOrderScene_load_p2}
            </p>
          </div>
        </Loading>
      </NavWrap>
    );
  }
}
export default FaceScene
