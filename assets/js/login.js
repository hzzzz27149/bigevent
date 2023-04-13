$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 自定义layui 表单的验证规则
  // 获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 写规则
  form.verify({
    // 自定义pwd规则
    pwd: [/^[\S]{6,12}$/, "密码需6-12为且不能有空格"],
    repwd: function (value) {
      // value是用户输入的值  和 密码框的值做对比
      var pwd = $('.reg-box [name="password"]').val();
      // 属性选择器要加个空格
      if (pwd !== value) {
        return "密码不相同";
      }
    },
  });

  // 注册表单的对应事件

  $("#reg-form").on("submit", function (e) {
    e.preventDefault();
    // console.log($('#reg-form [name=username]').val());
    var data = {
        username: $('#reg-form [name="username"]').val(),
        password: $('#reg-form [name="password"]').val()
    }
    $.post(
      "/api/reguser",
      data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 注册成功后 自动点击去登录 
        $('#link_login').click()
      }
    );
  });

//   登录表单事件
    $('#login-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            url : "/api/login",
            method : 'POST',
            data : $(this).serialize(),
            //获取表单中的数据 注意标签的属性中要有name属性
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败')
                };
                layer.msg('登录成功');
                // 将token存到localstorage中去
                localStorage.setItem('token',res.token)  ;
                location.href = '/index.html'
            }

        })
    })
});
