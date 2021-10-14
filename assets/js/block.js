!function(e){var t={};function a(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){e.exports=a(1)},function(e,t,a){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}();function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}!function(e,t){var a=e.plugins.registerPlugin,s=e.i18n.__,c=e.editPost.PluginDocumentSettingPanel,u=e.components,l=u.PanelRow,p=u.DateTimePicker,d=u.CheckboxControl,f=u.SelectControl,g=u.FormTokenField,y=u.Spinner,m=e.element,b=m.Fragment,x=m.Component,v=e.htmlEntities.decodeEntities,h=lodash,E=h.isEmpty,P=h.keys,S=h.compact;a("postexpirator-sidebar",{render:function(a){function u(){n(this,u);var e=i(this,(u.__proto__||Object.getPrototypeOf(u)).apply(this,arguments));return e.state={categoriesList:[],catIdVsName:[]},e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(u,a),o(u,[{key:"componentWillMount",value:function(){var a=this,r=(this.state.attributes,e.data.select("core/editor").getEditedPostAttribute("meta")),o=e.data.select("core/editor").getCurrentPostType(),n=1==t.defaults.autoEnable,i=new Date,c=this.getExpireType(r),u=[];c.includes("category")&&(u=this.getCategories(r)),r["_expiration-date-status"]&&"saved"===r["_expiration-date-status"]&&(n=!0),r["_expiration-date"]?i.setTime(1e3*(r["_expiration-date"]+60*i.getTimezoneOffset())):(u=t.default_categories,t.default_date&&i.setTime(1e3*(parseInt(t.default_date)+60*i.getTimezoneOffset())));var l=t.defaults.taxonomy||"category";this.setState({enabled:n,date:i,expireAction:c,categories:u,taxonomy:l});var p=[],d=[];!l&&"post"===o||"category"===l?e.apiFetch({path:e.url.addQueryArgs("wp/v2/categories",{per_page:-1})}).then((function(e){e.forEach((function(e){p[e.name]=e,d[e.id]=e.name})),a.setState({categoriesList:p,catIdVsName:d,taxonomy:s("Category")})})):"page"!==o&&e.apiFetch({path:e.url.addQueryArgs("wp/v2/taxonomies/"+l,{context:"edit"})}).then((function(t){e.apiFetch({path:e.url.addQueryArgs("wp/v2/"+t.rest_base,{context:"edit"})}).then((function(e){e.forEach((function(e){p[v(e.name)]=e,d[e.id]=v(e.name)})),a.setState({categoriesList:p,catIdVsName:d,taxonomy:v(t.name)})}))}))}},{key:"componentDidUpdate",value:function(){var t=this.state,a=t.enabled,r=t.date,o=t.expireAction,n=t.categories,i=t.attribute,s=function(t){return e.data.dispatch("core/editor").editPost({meta:t})},c=e.data.select("core/editor").getEditedPostAttribute("meta");switch(i){case"enabled":s({"_expiration-date-status":a?"saved":""}),c["_expiration-date"]||s({"_expiration-date":this.getDate(r)});break;case"date":"string"==typeof r&&s({"_expiration-date":this.getDate(r)});break;case"action":s({"_expiration-date-type":o}),o.includes("category")||s({"_expiration-date-categories":[]});break;case"category":s({"_expiration-date-categories":n})}}},{key:"render",value:function(){var t=this,a=this.state,r=a.categoriesList,o=a.catIdVsName,n=this.state,i=n.enabled,u=n.date,m=n.expireAction,x=n.categories,v=n.taxonomy,h=e.data.select("core/editor").getCurrentPostType(),T=[{label:s("Draft","post-expirator"),value:"draft"},{label:s("Delete","post-expirator"),value:"delete"},{label:s("Trash","post-expirator"),value:"trash"},{label:s("Private","post-expirator"),value:"private"},{label:s("Stick","post-expirator"),value:"stick"},{label:s("Unstick","post-expirator"),value:"unstick"}];"page"!==h&&(T=_.union(T,[{label:s("Category: Replace","post-expirator"),value:"category"},{label:s("Category: Add","post-expirator"),value:"category-add"},{label:s("Category: Remove","post-expirator"),value:"category-remove"}]));var k=x&&S(x.map((function(e){return o[e]||!1})));return"string"==typeof k&&(k=[]),React.createElement(c,{title:s("Post Expirator","post-expirator"),icon:"calendar",initialOpen:i,className:"post-expirator-panel"},React.createElement(l,null,React.createElement(d,{label:s("Enable Post Expiration","post-expirator"),checked:i,onChange:function(e){t.setState({enabled:!i,attribute:"enabled"})}})),i&&React.createElement(b,null,React.createElement(l,null,React.createElement(p,{currentDate:u,onChange:function(e){return t.setState({date:e,attribute:"date"})},is12Hour:!0})),React.createElement(f,{label:s("How to expire","post-expirator"),value:m,options:T,onChange:function(e){t.setState({expireAction:e,attribute:"action"})}}),m.includes("category")&&(E(P(r))&&React.createElement(b,null,s("Loading","post-expirator")+" ("+v+")",React.createElement(y,null))||React.createElement(g,{label:s("Expiration Categories","post-expirator")+" ("+v+")",value:k,suggestions:Object.keys(r),onChange:function(e){t.setState({categories:t.selectCategories(e),attribute:"category"})},maxSuggestions:10}))))}},{key:"getExpireType",value:function(e){var a=e["_expiration-date-type"],r=e["_expiration-date-options"]&&e["_expiration-date-options"].expireType;return a||(r||(t&&t.defaults&&t.defaults.expireType?t.defaults.expireType:"draft"))}},{key:"getCategories",value:function(e){var t=e["_expiration-date-categories"]&&e["_expiration-date-categories"],a=e["_expiration-date-options"]&&e["_expiration-date-options"].category;return"object"===(void 0===t?"undefined":r(t))&&t.length>0?t:(a&&void 0!==a&&"object"!==(void 0===a?"undefined":r(a))&&(categories=[a]),a)}},{key:"selectCategories",value:function(e){var t=this.state,a=t.categoriesList;t.catIdVsName;if(!e.some((function(e){return"string"==typeof e&&!a[e]})))return e.map((function(e){return"string"==typeof e?a[e]:e})).map((function(e){return e.id}))}},{key:"getDate",value:function(e){var t=new Date;return t.setTime(Date.parse(e)),t.setTime(t.getTime()-60*(new Date).getTimezoneOffset()*1e3),t.getTime()/1e3}}]),u}(x)})}(window.wp,config)}]);
//# sourceMappingURL=block.js.map