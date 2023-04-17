$.ajaxPrefilter(function (option) {
  option.url = "http://www.liulongbin.top:3007" + option.url;
  // 给需要请求头的请求设置好请求头
  if (option.url.indexOf("/my/") !== -1) {
    option.header = {
      Authorization: localStorage.getItem("token") || "",
    };
  };
//   option.complete = function(res){
//     // 如果获取用户信息失败，或用户直接访问index.html 清空token 强制跳转到登录页
    
//     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
//             // 1. 强制清空 token
//             localStorage.removeItem('token')
//             // 2. 强制跳转到登录页面
//             location.href = '/login.html'
//           }
// };



});
