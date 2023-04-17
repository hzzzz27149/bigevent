$(function(){
    getUesrInfo();
    var layer = layui.layer;
    $('#btn-exit').on('click',function(){
        layer.confirm('确认退出吗', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href= '/login.html';
            layer.close(index);
          });
    })
    
});



function getUesrInfo(){
    console.log(localStorage.getItem('token'));
    
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
        // header  请求头对象
        header : {
            Authorization : localStorage.getItem('token') || ''
        },
        success : function(res){
            console.log(res);
            
           if(res.status !==0){
            return layui.layer.msg('获取用户信息失败')
           };
        //    调用渲染用户信息函数
           randerAvatar(res.data);
        },
        complete : function(res){
            // 如果获取用户信息失败，或用户直接访问index.html 清空token 强制跳转到登录页
            
            // if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1. 强制清空 token
            //         localStorage.removeItem('token')
            //         // 2. 强制跳转到登录页面
            //         location.href = '/login.html'
            //       }

        }
    })
};

function randerAvatar (user){
    // 1.获取用户名称
    var name = user.nickname || user.uesrname;
    // 2. 设置用户名称
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户的头像
    // 判断用户有没有自定义的头像，没有就显示用户名的首字母
    if(user.user_pic !== null){
        // 有自定义头像
        $('layui-nav-img').attr('url',user.user_pic).show()
        $('text-avatar').hide();
    }else{
        // 显示首字母图像
        var first = name[0].toUpperCase();
        $('text-avatar').html(first).show();
        $('layui-nav-img').hide();

    }

}