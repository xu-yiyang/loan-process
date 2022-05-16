(this.webpackJsonploan=this.webpackJsonploan||[]).push([[16],{296:function(e,n,t){"use strict";t.r(n);t(145);var r=t(89),a=t.n(r),o=(t(90),t(49)),i=t.n(o),c=t(17),l=t(18),u=t(20),d=t(19),m=t(3),s=t(0),f=t.n(s),p=t(8),b=t(15),h=t(42),g=t(88),v=t(300),O=Object(v.b)({user_orders:function(e){var n;return(null===(n=e.externalData.getIn(["user_orders"]))||void 0===n?void 0:n.toJS())||{}},payment_delay_h5:function(e){return e.externalData.getIn(["payment_delay_h5"])||""}}),y=t(34),D=(t(144),t(87)),E=t.n(D),x=Object(b.d)({get_contract:function(e){return function(){return E.a.loading("",0),b.c.get("/loan/app/get_contract").then((function(e){0===e.code?(E.a.hide(),window.location.href=e.data):E.a.fail()}))}},payment_h5:function(e){return function(){return E.a.loading("",0),b.c.get("/loan/app/payment_h5").then((function(e){0===e.code?(E.a.hide(),window.location.href=e.data):E.a.fail(e.message)}))}}}),j=t(471),_=t.n(j),k=t(23);function w(){var e=Object(m.a)(["\n  margin-bottom: 0 !important;\n  background: #fff;\n  width: 100%;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  padding: 0.2rem 0.3rem;\n  box-sizing: border-box;\n  display: flex;\n  > * {\n    flex: 1 1 0%;\n    margin: 0 0.2rem;\n  }\n"]);return w=function(){return e},e}function F(){var e=Object(m.a)(["\n    background:rgba(255,83,83,0.18);\n    color: #FF5353;\n  "]);return F=function(){return e},e}function S(){var e=Object(m.a)(["\n    background:rgba(14,102,255,0.18);\n    color: #0E66FF;\n  "]);return S=function(){return e},e}function M(){var e=Object(m.a)(["\n    background:rgba(153,153,153,0.18);\n    color: #222;\n  "]);return M=function(){return e},e}function P(){var e=Object(m.a)(["\n  border-radius:50px;\n  padding: 0 0.33rem;\n  float: right;\n  font-size: 0.28rem;\n  text-align: center;\n  line-height: 0.47rem;\n  ","\n  ","\n  ","\n"]);return P=function(){return e},e}function A(){var e=Object(m.a)(["\n  margin-bottom: 1.5rem;\n  > div {\n    margin-bottom: 0.2rem;\n  }\n  .card1 {\n    position: relative;\n    .header {\n      margin: 0 -0.2rem;\n      padding: 0.2rem 0.2rem;\n      line-height: 0.28rem;\n      font-size:0.28rem;\n      color:#000;\n      background: #F4F4F4;\n      img {\n        width: 0.48rem;\n        margin-right: 0.16rem;\n        vertical-align: middle;\n      }\n    }\n    :before {\n      content: '';\n      position: absolute;\n      background:rgba(14,102,255,1);\n      width: 0.28rem;\n      height: 0.28rem;\n      border-radius: 100%;\n      left: -0.35rem;\n      top: 0.7rem;\n    }\n    :after {\n      content: '';\n      position: absolute;\n      background:rgba(14,102,255,1);\n      width: 0.28rem;\n      height: 0.28rem;\n      border-radius: 100%;\n      right: -0.35rem;\n      top: 0.7rem;\n    }\n    .amount {\n      text-align: center;\n      padding: 0.6rem 0;\n      h4 {\n        font-size:0.28rem;\n        color:rgba(136,136,136,1);\n        margin-bottom: 0.16rem;\n      }\n      p {\n        font-size:0.48rem;\n        color: #000;\n      }\n    }\n  }\n  .bankcard {\n    h4 {\n      font-size:0.28rem;\n      color: #000;\n      margin-bottom: 0.24rem;\n      font-weight: normal;\n    }\n    div {\n      background: #0E66FF;\n      border-radius: 4px;\n      padding: 0.3rem;\n      color: #fff;\n      i {\n        float: right;\n      }\n      p {\n        margin-top: 0.4rem;\n      }\n    }\n  }\n"]);return A=function(){return e},e}var q=p.c.div(A()),U=p.c.div(P(),(function(e){return"disabled"===e.type&&Object(p.b)(M())}),(function(e){return"primary"===e.type&&Object(p.b)(S())}),(function(e){return"warning"===e.type&&Object(p.b)(F())})),Z=p.c.div(w()),H=function(e){Object(u.a)(t,e);var n=Object(d.a)(t);function t(){return Object(c.a)(this,t),n.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){var e=this,n=this.context.text,t=this.props,r=t.user_orders,o=t.payment_delay_h5;return f.a.createElement(h.d,{title:n.orderDetailsScene_title},f.a.createElement(q,null,f.a.createElement(p.a,{className:"card1"},f.a.createElement("div",{className:"header"},f.a.createElement("img",{src:_.a,alt:""}),r.product_name,f.a.createElement(U,{type:200===r.order_status?"disabled":"primary"},k.a.text.orderStatusItem_status[r.order_status])),f.a.createElement("div",{className:"amount"},f.a.createElement("h4",null,n.orderDetailsScene_repay_amount),f.a.createElement("p",null,"Rp ",Object(b.r)(r.repay_amount))),f.a.createElement(h.c,null,f.a.createElement(i.a.Item,{extra:Object(b.r)(r.loan_amount)},n.orderDetailsScene_loan_amount),f.a.createElement(i.a.Item,{extra:Object(b.r)(r.actual_amount)},n.orderDetailsScene_actual_amount),f.a.createElement(i.a.Item,{extra:Object(b.r)(r.interest_rate)},n.orderDetailsScene_interest_rate),f.a.createElement(i.a.Item,{extra:Object(b.r)(r.interest_amount)},n.orderDetailsScene_interest_amount),f.a.createElement(i.a.Item,{extra:Object(b.r)(r.admin_amount)},n.orderDetailsScene_admin_amount),f.a.createElement(i.a.Item,{extra:"".concat(r.loan_term," Hari")},n.orderDetailsScene_loan_term))),f.a.createElement(p.a,null,f.a.createElement(h.c,null,f.a.createElement(i.a.Item,{extra:r.order_no},n.orderDetailsScene_order_no),f.a.createElement(i.a.Item,{extra:r.loan_time},n.orderDetailsScene_loan_time))),f.a.createElement(p.a,{className:"bankcard",isPadding:!0},f.a.createElement("h4",null,n.orderDetailsScene_card_tit),f.a.createElement("div",null,r.bank_card.bank_user_name,f.a.createElement("i",null,r.bank_card.bank_name),f.a.createElement("p",null,r.bank_card.bank_account))),1===r.api_contract&&f.a.createElement(p.a,{onClick:function(){e.props.get_contract({product_id:r.product_id,amount:r.loan_amount,period:r.loan_term})}},f.a.createElement(h.c,null,f.a.createElement(i.a.Item,{arrow:"horizontal"},n.orderDetailsScene_protocol))),(175===r.order_status||180===r.order_status)&&f.a.createElement(a.a,{type:"primary",size:"large"},n.orderDetailsScene_btn),(o||175===r.order_status||180===r.order_status)&&f.a.createElement(Z,null,o&&f.a.createElement(a.a,{type:"ghost",onClick:function(){window.location.href=o}},n.orderDetailsScene_delay_btn),(175===r.order_status||180===r.order_status)&&f.a.createElement(a.a,{type:"primary",size:"large",onClick:function(){e.props.payment_h5({order_no:r.order_no})}},n.orderDetailsScene_btn))))}}]),t}(s.Component);H.contextType=b.a;n.default=Object(g.b)(O,x)(Object(b.b)((function(e){var n=e.dispatch,t=Object(b.q)("/loan/app/user_orders/".concat(1));E.a.loading("Menuat, tidak ada konten...",0);try{return Promise.all([t()]).then((function(e){var t=Object(y.a)(e,1)[0];return E.a.hide(),n(Object(b.f)("user_orders",t)),Promise.all([Object(b.q)("/loan/app/payment_delay_h5")()])})).then((function(e){var t=Object(y.a)(e,1)[0];0===t.code&&n(Object(b.f)("payment_delay_h5",t.data))})).catch((function(e){E.a.hide(),E.a.fail(JSON.stringify(e))}))}catch(r){E.a.fail(JSON.stringify(r))}}))(H))},300:function(e,n,t){"use strict";function r(e,n){return e===n}function a(e,n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,a=0;a<r;a++)if(!e(n[a],t[a]))return!1;return!0}function o(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+t+"]")}return n}t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return c}));var i=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];var i=0,c=r.pop(),l=o(r),u=e.apply(void 0,[function(){return i++,c.apply(null,arguments)}].concat(t)),d=e((function(){for(var e=[],n=l.length,t=0;t<n;t++)e.push(l[t].apply(null,arguments));return u.apply(null,e)}));return d.resultFunc=c,d.dependencies=l,d.recomputations=function(){return i},d.resetRecomputations=function(){return i=0},d}}((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,t=null,o=null;return function(){return a(n,t,arguments)||(o=e.apply(null,arguments)),t=arguments,o}}));function c(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;if("object"!==typeof e)throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);var t=Object.keys(e);return n(t.map((function(n){return e[n]})),(function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return n.reduce((function(e,n,r){return e[t[r]]=n,e}),{})}))}},471:function(e,n){e.exports="data:image/png;base64,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"}}]);