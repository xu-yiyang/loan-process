import React from 'react'
import Loadable from 'react-loadable';
import loadingImg from './loading.png'

const REACT__APP__LOADING__BACKGROUND_STYLE = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const REACT__APP__LOADING__BACKGROUND_IMG_STYLE = {
  width: '50%',
}

export const Loading = () => (
  <div style={REACT__APP__LOADING__BACKGROUND_STYLE}>
    <img style={REACT__APP__LOADING__BACKGROUND_IMG_STYLE} src={loadingImg} alt="" />
  </div>
)
export function loadable(cmp) {
  return Loadable({
    loader: cmp,
    loading: Loading,
  });
}
