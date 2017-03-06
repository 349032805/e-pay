$(function() {
	// 一点击事件支付功能
	// 获取所需参数
	var storeName = getQueryString("storeName");
	$(".dinner-name").html(storeName);
	var code = getQueryString("code");
	var auth_code = getQueryString("auth_code");
	var storeId = getQueryString("storeId");
	var brandId = getQueryString("brandId");
	var sign = getQueryString("sign");
	var payType = getQueryString("payType");

	// 确认支付
	$("#keyboard-confirm").on("click", function() {
		var moneyTotal = $("#hid-value").val() * 100;
		if (moneyTotal == "") {
			layer.open({
				content: '请输入金额',
				skin: 'msg',
				time: 2
			});
			return;
		} else if (parseFloat(moneyTotal / 100) > 200000) {
			layer.open({
				content: '支付金额最高为200000',
				skin: 'msg',
				time: 2
			});
			return;
		} else {

			if (payType == "alipay") {
				window.location.href = "success_ali.html?code=" + auth_code + "&storeId=" + storeId + "&moneyTotal=" + moneyTotal + "&storeName=" + storeName + "&brandId=" + brandId + "&sign=" + sign + "";
			} else {
				window.location.href = "success_wechat.html?code=" + code + "&storeId=" + storeId + "&moneyTotal=" + moneyTotal + "&storeName=" + storeName + "&brandId=" + brandId + "&sign=" + sign + "";
			}



		}
	});

	// 二 键盘事件封装
	//绑定fastclick事件，处理300ms延迟
	FastClick.attach(document.body);
	//键盘事件
	var _inputValue = "";
	setInterval(function() {
		var $_inputSpan = $("#inputPrice").find(".cursor");
		var $_placeholder = $("#inputPrice").find(".placeholder");
		if ($_inputSpan.is(":visible")) {
			$_inputSpan.hide();
			$_placeholder.css({
				"marginLeft": "1px"
			});
		} else {
			$_inputSpan.show();
			$_placeholder.css({
				"marginLeft": "0"
			});
		}
	}, 500);

	//填写。点击输入符号
	var _pointAfterLength = 0;
	var _hasPoint = false;
	$(".list .number").not(".error").on("click", function() {
		var _text = $(this).text();
		// var $_inputSpan = $("#inputPrice").find("span");
		$("#inputPrice").find(".placeholder").hide();
		if (_text == ".") {
			_hasPoint = true;
		}
		if (_hasPoint) {
			if (_pointAfterLength > 0) {
				if (_text == ".") {
					return;
				}
			}
			if (_pointAfterLength > 2) {
				return;
			} else {
				_pointAfterLength++;
			}
		}
		_inputValue += _text;
		$("#inputPrice").html("<span>" + _inputValue + "</span><span class='cursor'></span>");
		$("#hid-value").val(_inputValue);
	});
	// 删除
	$("#minus").on("click", function() {
		if (_pointAfterLength == 0) {
			_hasPoint = false;
		} else {
			_pointAfterLength--;
		}
		if (_inputValue) {
			_inputValue = _inputValue.slice(0, -1);
		}
		$("#inputPrice").text("").html("<span>" + _inputValue + "</span><span class='cursor'></span>");
		$("#hid-value").val(_inputValue);
	});


});