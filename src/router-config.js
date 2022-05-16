// import Loadable from 'react-loadable'
import { AsyncLoading } from './utils'

let routesConfig = [
  {
    path: '/transition-scene',
    component: AsyncLoading('transition-scene'),
  },
  {
    path: '/credit-items-scene',
    component: AsyncLoading({
      componentName: 'credit-items-scene',
      componentConfig: 'credit-items-scene',
    }),
  },
  {
    path: '/login-scene',
    component: AsyncLoading({
      componentName: 'login-scene',
      componentConfig: 'login-scene',
    }),
  },
  {
    path: '/ocr-scene',
    component: AsyncLoading({
      componentName: 'ocr-scene',
      componentConfig: 'ocr-scene',
    }),
  },
  {
    path: '/base-info-scene',
    component: AsyncLoading({
      componentName: 'base-info-scene',
      componentConfig: 'base-info-scene',
    }),
  },
  {
    path: '/debit-card-scene',
    component: AsyncLoading({
      componentName: 'debit-card-scene',
      componentConfig: 'debit-card-scene',
    }),
  },
  {
    path: '/add-debit-card-scene',
    component: AsyncLoading({
      componentName: 'add-debit-card-scene',
      componentConfig: 'add-debit-card-scene',
    }),
  },
  {
    path: '/loan-apple-scene/:id?',
    component: AsyncLoading({
      componentName: 'loan-apple-scene',
      componentConfig: 'loan-apple-scene',
    }),
  },
  {
    path: '/face-scene',
    component: AsyncLoading({
      componentName: 'face-scene',
      componentConfig: 'face-scene',
    }),
  },
  {
    path: '/confirm-order-scene',
    component: AsyncLoading({
      componentName: 'confirm-order-scene',
      componentConfig: 'confirm-order-scene',
    }),
  },
  {
    path: '/submit-result-scene',
    component: AsyncLoading({
      componentName: 'submit-result-scene',
      componentConfig: 'submit-result-scene',
    }),
  },
  {
    path: '/match-fail-scene',
    component: AsyncLoading({
      componentName: 'match-fail-scene',
      componentConfig: 'match-fail-scene',
    }),
  },
  {
    path: '/order-scene',
    component: AsyncLoading({
      componentName: 'order-scene',
      componentConfig: 'order-scene',
    }),
  },
  {
    path: '/order-details-scene',
    component: AsyncLoading({
      componentName: 'order-details-scene',
      componentConfig: 'order-details-scene',
    }),
  },
]

export {routesConfig}
