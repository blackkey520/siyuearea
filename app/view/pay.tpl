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
  
</head>

<body>
 {{attach.type}}
<button type="button" class="btn" onclick="goPay('{{appId}}','{{timeStamp}}', '{{nonceStr}}', '{{package}}', '{{signType}}', '{{paySign}}');">微信支付</button>
 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    function goPay(appId, timeStamp, nonceStr, package, signType, paySign) {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId" : appId,
            "timeStamp":timeStamp,
            "nonceStr" : nonceStr,
            "package" : package,
            "signType" : signType,
            "paySign" : paySign
        }, function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok"){
                 var obj = eval('(' + '{{attach}}' + ')');
                alert(obj.type);
              
            }else{
                alert("支付失败，请重试");
            }
        });
    }
</script>
   
</body>

</html>
