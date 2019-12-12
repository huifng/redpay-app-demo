import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { getSign } from '../utils/Encrypt';

export class PaymentScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mchNo: this.props.navigation.state.params.mchNo,
            mchOrderNo: this.props.navigation.state.params.mchOrderNo,
            payForm: this.props.navigation.state.params.payForm,
            interval: ''
        }
    }

    componentDidMount(){
    }

    queryPaymentResult(){
        //通过轮询方式查询支付状态（注：这里仅是demo目的直接调用了支付网关API，
        //实际生产环境中，建议调用redpayments支付网关的部分放在APP后端，以防泄漏apiKey).
        let interval = setInterval(()=>{
            const url = `${Consts.API.host}/pay/gateway/query-order`;
            const data = {
                mchNo: this.state.mchNo,
                mchOrderNo: this.state.mchOrderNo,
                channelOnly: true,
                timestamp: ((new Date()).getTime() / 1000).toFixed(0)
            };
            data['sign'] = getSign(data);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                return response.json();
            }).then((res) => {
                console.log(res);
                if (res && '0' === res.code && ('SUCCEEDED' === res.data.orderStatus || 'COMPLETED' === res.data.orderStatus)) {
                    const result = '<h1>Successful payment</h1><br>' +
                        '<h1>Order no: ' + res.data.orderNo + '</h1><br>' +
                        '<h1>Channel Order no: ' + res.data.channelOrderNo + '</h1><br>' +
                        '<h1>Currency: ' + res.data.currency + '</h1><br>' +
                        '<h1>Payment amount: ' + res.data.orderAmount + '</h1><br>';
                    this.setState({
                        payForm: result
                    });
                    clearInterval(this.state.interval);
                }
            });
        },3000);
        this.setState({
            interval: interval
        })
    }

    render() {
        return (<WebView
            originWhitelist={['*']}
            source={{ html: this.state.payForm }}
            sharedCookiesEnabled={true}
            onShouldStartLoadWithRequest={request => {
                let reqUrl =request.url;
                if(reqUrl.indexOf("alipay://")>-1 || reqUrl.indexOf("alipays://")>-1) {
                    //通过WebBrowser方法跳转到支付宝App
                    WebBrowser.openBrowserAsync(reqUrl).then((browserResult) => {
                        console.log(browserResult);
                        //跳转成功后开始主动查询支付
                        this.queryPaymentResult();
                    }, (reason) => {
                        console.log(reason);
                    })
                    return false;
                }
                return true;
            }}
            style={{ marginTop: 20 }}
          />)
    }

}
