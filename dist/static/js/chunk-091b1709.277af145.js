(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-091b1709"],{"075a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"navBar"},[a("van-nav-bar",{attrs:{title:"首页"}})],1),a("div",{staticClass:"swiper"},[a("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},t._l(t.swiperData,(function(t){return a("van-swipe-item",{key:t.id},[a("img",{attrs:{src:t.url,alt:""}})])})),1)],1),a("div",{staticClass:"gridMenu"},[a("van-grid",{attrs:{"column-num":3}},t._l(t.categoryData,(function(e){return a("van-grid-item",{key:e.id,attrs:{icon:e.icon,text:e.name},on:{click:function(a){return t.toProductDetailPage(e)}}})})),1)],1),a("div",{staticClass:"productList"},[a("van-card",{attrs:{price:"2.00",desc:"描述信息",title:"商品标题",thumb:"https://img01.yzcdn.cn/vant/ipad.jpeg"}})],1)])},n=[],i=a("1da1"),c=(a("96cf"),a("b0c0"),a("dac6")),s={data:function(){return{swiperData:[],categoryData:[]}},created:function(){this.getSwiperData(),this.getProductCategoryData()},methods:{toProductDetailPage:function(t){this.$router.push({path:"/manage/productList",query:{productCategoryId:t.id,categoryName:t.name}})},getSwiperData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(c["a"])("/carousel/findAll");case 2:a=e.sent,t.swiperData=a.data.data;case 4:case"end":return e.stop()}}),e)})))()},getProductCategoryData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={page:1,pageSize:6},e.next=3,Object(c["a"])("/productCategory/pageQuery",a);case 3:r=e.sent,t.categoryData=r.data.data.list;case 5:case"end":return e.stop()}}),e)})))()}}},u=s,o=(a("7f01"),a("2877")),d=Object(o["a"])(u,r,n,!1,null,"27ea80a9",null);e["default"]=d.exports},"7f01":function(t,e,a){"use strict";a("dbd7")},b0c0:function(t,e,a){var r=a("83ab"),n=a("5e77").EXISTS,i=a("e330"),c=a("9bf2").f,s=Function.prototype,u=i(s.toString),o=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=i(o.exec),p="name";r&&!n&&c(s,p,{configurable:!0,get:function(){try{return d(o,u(this))[1]}catch(t){return""}}})},dbd7:function(t,e,a){}}]);
//# sourceMappingURL=chunk-091b1709.277af145.js.map