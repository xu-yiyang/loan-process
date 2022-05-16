// import React from 'react';
// import { FormattedMessage } from 'react-intl';

export default {
  text: {
    steps1: 'Otentifikas',
    steps2: 'Informasi Pribadi',
    steps3: 'Nomor Rekening',
    orderStatusItem_amount: '借款金额',
    orderStatusItem_status: {
      200: 'Sudah Lunas', // 贷款结清
      90: 'Sedang Diverifikasi', // 审批中
      100: 'Verifikasi Berhasil', // 审批通过
      170: 'Pencairan Berhasil', // 放款成功
      175: 'Pelunasan', // 待还款
      180: 'Keterlambatan', // 已逾期
      169: 'Pencairan Gagal', // 放款失败
      110: 'Verifikasi Gagal', // 审批不通过
    },
    footer_loan: 'Rumah',//'借款',
    footer_order: 'Pesanan',//'订单',
  }
}