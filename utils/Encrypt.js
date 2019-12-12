import md5 from 'md5';

//注：实际生产环境中，请示redpayments网关部分的代码请放在业务App后端的api中，保护apiKey.
//测试商户和apiKey信息请联系admin@redpayments.com.au
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxx';

export const getSign = (params) => {
    var strData = "";
    Object.keys(params).sort().forEach(key => {
        if (key !== 'sign' && params[key] !== undefined) {
            strData = strData + key + "=" + params[key] + "&";
        }
    })

    strData = strData + "key=" + apiKey;

    return md5(strData);
}

export const signParams = (params) => {
    const sign = getSign(params);
    params['sign'] = sign;
    return params;
}

export const verifyParams = (params) => {
    const sign = getSign(params);
    return sign === params['sign'];
}

