$(function(){
    var layer = layui.layer;
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#btnChangeImage').on('click',function(){
    $('#file').click()
  });
//   图片的change事件
  $('#file').change(function(e){
    //    改动的列表 ，未改动的话长度为0
    var fileList = e.target.files;
    if(fileList.lenth ===0){
        return layer.msg('请选择图片');
    }

    // 拿到用户选择的文件
    var file = fileList[0];
    // 将图片转化成URL 
    var imgURL = URL.createObjectURL(file);
    //重新初始化剪裁区域
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', imgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

  });
  $('#btnUpLoad').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')  ;
         // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


         $.ajax({
            method : 'POST',
            url : '/my/update/avatar',
            data : {
                avatar : dataURL
            },
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功');
                window.parent.getUserInfo();
            }
        })
  });

   

})