<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <!--[if lte IE 10]>
      <script
        src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,media-match/2.0.2/media.match.min.js"></script>
  <![endif]-->
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
  <link rel="stylesheet" href="/public/sercss/weui.css?version=2">
</head>

<body>
  <div class="page">
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">充值提醒</h2>
            <p class="weui-msg__desc">您在肆阅空间的 XXX会员 消费 将要支付<a href="javascript:void(0);">130</a>元</p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="#" onclick="test();" class="weui-btn weui-btn_primary">确定</a>
            </p>
        </div>
        <div class="weui-msg__extra-area">
            <div class="weui-footer">
                <p class="weui-footer__links">
                    <a href="javascript:void(0);" class="weui-footer__link">肆阅空间</a>
                </p>
                <p class="weui-footer__text">Copyright &copy; 2008-2016 bjlanyue</p>
            </div>
        </div>
    </div>
</div>
  <script type="text/javascript">
    function test(){
        window.open('http://'+window.location.host+'/mobile/payresult/true/345/123/2/3/月卡',"_self");
    }
  </script>
</body>

</html>
