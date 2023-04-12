$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $(".reg-box").show()
    });
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $(".reg-box").hide()
    });
});
// 自定义layui 表单的验证规则
// 获取form对象
var form = layui.form;
// 写规则
form.verify({
    // 自定义pwd规则
    pwd : [/^[\S]{6,12}$/,'密码需6-12为且不能有空格'],
    repwd : function(value){
        // value是用户输入的值  和 密码框的值做对比
        var pwd = $('.reg-box [name="password"]').val();
        // 属性选择器要加个空格
        if(pwd !== value){
            return '密码不相同'
        }
        
    }
    
})