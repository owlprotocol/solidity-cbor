"use strict";(self.webpackChunksolidity_cbor_docs=self.webpackChunksolidity_cbor_docs||[]).push([[31],{7522:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(9901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,y=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(y,i(i({ref:t},s),{},{components:r})):n.createElement(y,i({ref:t},s))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4318:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>c,metadata:()=>p,toc:()=>u});var n=r(1911),a=r(2633),o=(r(9901),r(7522)),i=["components"],c={},l=void 0,p={unversionedId:"contract-docs/CBORSpec",id:"contract-docs/CBORSpec",title:"CBORSpec",description:"CBORSpec",source:"@site/docs/contract-docs/CBORSpec.md",sourceDirName:"contract-docs",slug:"/contract-docs/CBORSpec",permalink:"/solidity-cbor/docs/contract-docs/CBORSpec",editUrl:"https://github.com/owlprotocol/solidity-cbor/docs/contract-docs/CBORSpec.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"CBORPrimitives",permalink:"/solidity-cbor/docs/contract-docs/CBORPrimitives"},next:{title:"CBORTesting",permalink:"/solidity-cbor/docs/contract-docs/CBORTesting"}},s={},u=[{value:"CBORSpec",id:"cborspec",level:2},{value:"MAJOR_BITMASK",id:"major_bitmask",level:3},{value:"SHORTCOUNT_BITMASK",id:"shortcount_bitmask",level:3},{value:"MajorType",id:"majortype",level:3},{value:"TAG_TYPE_BIGNUM",id:"tag_type_bignum",level:3},{value:"TAG_TYPE_NEGATIVE_BIGNUM",id:"tag_type_negative_bignum",level:3},{value:"BREAK_MARKER",id:"break_marker",level:3},{value:"UINT_TRUE",id:"uint_true",level:3},{value:"UINT_FALSE",id:"uint_false",level:3}],d={toc:u};function m(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"cborspec"},"CBORSpec"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Basic CBOR specification tools and constants.")),(0,o.kt)("h3",{id:"major_bitmask"},"MAJOR_BITMASK"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 MAJOR_BITMASK\n")),(0,o.kt)("h3",{id:"shortcount_bitmask"},"SHORTCOUNT_BITMASK"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 SHORTCOUNT_BITMASK\n")),(0,o.kt)("h3",{id:"majortype"},"MajorType"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"enum MajorType {\n  UnsignedInteger,\n  NegativeInteger,\n  ByteString,\n  TextString,\n  Array,\n  Map,\n  Semantic,\n  Special\n}\n")),(0,o.kt)("h3",{id:"tag_type_bignum"},"TAG_TYPE_BIGNUM"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 TAG_TYPE_BIGNUM\n")),(0,o.kt)("h3",{id:"tag_type_negative_bignum"},"TAG_TYPE_NEGATIVE_BIGNUM"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 TAG_TYPE_NEGATIVE_BIGNUM\n")),(0,o.kt)("h3",{id:"break_marker"},"BREAK_MARKER"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"bytes1 BREAK_MARKER\n")),(0,o.kt)("h3",{id:"uint_true"},"UINT_TRUE"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 UINT_TRUE\n")),(0,o.kt)("h3",{id:"uint_false"},"UINT_FALSE"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint8 UINT_FALSE\n")))}m.isMDXComponent=!0}}]);