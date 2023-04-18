$(function(){
//   导入layui中的form
var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '不能大于6位'
            }
        }
    });
var layer = layui.layer;  
inntUserInfo();  

    // 初始化用户的基本信息的函数
    function inntUserInfo(){
        $.ajax({
            method : 'GET',
            url: '/my/userinfo',
            sccess : function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败')
                };
                form.val('formUserInfo',res.data)
                
            }
        })
    };

    $('#btnReset').on('click',function(e){
        e.preventDefault();
        inntUserInfo();  
        
    });
    // form 表单提交事件
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            method : 'POST',
            url : '/my/userinfo',
            data : $(this).serialize,
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('error')
                }
                layer.msg('用户信息更新成功');
                // 在当前页面调取index的方法  重新渲染用户信息
                window.parent.getUesrInfo();
                    
            }
        })
    })
    
})