export default function (Vue, options) {
  //全局注册
  const req = require.context("./", true, /\.vue$/);
  console.log(req.keys());
  req.keys().forEach((item) => {
    const com = req(item).default;
    Vue.component(com.name, com);
  });
}
