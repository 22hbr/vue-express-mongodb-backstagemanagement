# 1.为什么后端返回前端的json数据，需要从data中获取而不是直接获得。(res.data.code/res.data.data之类)
返回的是Axios（或其他 HTTP 客户端）封装后的响应对象，想要直接使用可以在响应拦截器中返回response.data;

# 2.经常性出现的遮挡层报错原因：cancel . at handleError (webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:251:58) . at eval (webpack-internal:///./node_modules/webpack-dev-server/client/overlay.js:274:7).
配置项设置不成功：overlay: false
                // overlay: {
                //   warnings: false,
                //   errors: false
                // }
                设置前者，后者注释掉的写法不起效。


# 3.menu的循环渲染方法
在路由中添加meta属性【设置图标、是否显示等】，通过是否有children进行判断循环遍历;


# 4.menu和右侧内容处于一个div里面才能正常显示的原因
设置flex属性，弹性盒子默认水平对齐。



