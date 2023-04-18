$(function(){
    // 导入layui的form模块
    var form = layui.form;
    var layer = layui.layer;
    // 定义校验规则
    form.verify({
        pwd : [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd : function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能同旧密码一致';
            }
        },
        rePwd : function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    });

    // 表单提交
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.post({
            url : '/my/updatepwd',
            data : $(this).serialize(),
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('失败')
                };
                layer.msg('成功');
                // 清空表单内容 使用原生的方法
                $(this)[0].reset();


            }
        })
    })
})