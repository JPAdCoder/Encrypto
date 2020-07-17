let form = layui.form,
    $ = layui.jquery,
    layer = layui.layer;
// 加密
form.on('submit(encrypt)', function (data) {
    if (verifyParam(data, layer, "encrypt") == false) {
        return false;
    }
    data = getParam(data);
    let encryptedStr = getAES(data.field.encryptStr, data.field.key, data.field.iv, data.field.cryptMode, data.field.paddingMode);
    $("#encryptedTextArea").val(encryptedStr);
    return false;
});

// 解密
form.on('submit(decrypt)', function (data) {
    if (verifyParam(data, layer, "decrypt") == false) {
        return false;
    }
    data = getParam(data);
    let encryptStr = getDAes(data.field.encryptedStr, data.field.key, data.field.iv, data.field.cryptMode, data.field.paddingMode);
    $("#encryptTextArea").val(encryptStr);
    return false;
});

function getParam(data) {
    switch (data.field.cryptMode) {
        case "0":
            data.field.cryptMode = CryptoJS.mode.CBC;
            break;
        case "1":
            data.field.cryptMode = CryptoJS.mode.ECB;
            break;
        case "2":
            data.field.cryptMode = CryptoJS.mode.CTR;
            break;
        case "3":
            data.field.cryptMode = CryptoJS.mode.CFB;
            break;
        case "4":
            data.field.cryptMode = CryptoJS.mode.OFB;
            break;
        default:
            break;
    }
    switch (data.field.paddingMode) {
        case "0":
            data.field.paddingMode = CryptoJS.pad.Pkcs7;
            break;
        case "1":
            data.field.paddingMode = CryptoJS.pad.ZeroPadding
            break;
        default:
            break;
    }
    return data;
}

function refreshKey() {
    let key = generate();
    document.getElementById("keyInput").value = key;
}

function refreshIV() {
    let iv = generate();
    document.getElementById("ivInput").value = iv;
}

function verifyParam(data, layer, type) {
    if (type === "encrypt") {
        console.log(data.field.iv);
        if (data.field.key.length < 16) {
            layer.msg('密钥长度必须为16');
            return false;
        }
        if (data.field.iv.length < 16) {
            layer.msg('初始向量长度必须为16');
            return false;
        }
        if (data.field.encryptStr.length === 0) {
            layer.msg('加密内容不可为空');
            return false;
        }
    } else {
        if (data.field.encryptedStr.length === 0) {
            layer.msg('密文内容不可为空');
            return false;
        }
    }
    return true;
}

function generate() {
    let result = '';
    for (let i = 0; i < 16; i++) {
        // !: 33 ~:126  93 + 32 + 1
        let asciiNum = Math.floor(Math.random() * 93 + 33);
        result = result + String.fromCharCode(asciiNum);
    }
    return result;
}

function checkChinese(obj) {
    let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(obj.value)) {
        obj.value = "";
        layer.msg('不可包含中文');
    }

}