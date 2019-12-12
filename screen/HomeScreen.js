import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import { formatDate } from '../utils/Common';
import { getSign } from '../utils/Encrypt';
import { Consts, GlobaStyles } from '../constants/Consts';

export class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orderNo: '',
            subject: 'Infant power',
            seller: 'Infant market',
            currency: 'AUD',
            amount: '2.99'
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            title: 'Order Payment',
            headerStyle: {
                backgroundColor: '#ff0000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    componentDidMount(){
        this.setState({
            orderNo: formatDate((new Date()).getTime())
        });
    }

    //调用支付网关生成alipay支付请求form（注：这里仅是demo目的直接调用了支付网关API，
    //实际生产环境中，建议调用redpayments支付网关的部分放在APP后端，以防泄漏apiKey).
    _handleAliPay() {
        const url = `${Consts.API.host}/pay/gateway/create-order`;
        const data = {
            mchNo: '29901',
            storeNo: '39961',
            mchOrderNo: this.state.orderNo,
            channel: 'ALIPAY',
            payWay: 'WAP',
            currency: 'AUD',
            amount: this.state.amount,
            item: this.state.subject,
            quantity: 1,
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
            if (res && '0' === res.code) {
                this.props.navigation.navigate('payment',{
                    mchNo: '29901',
                    mchOrderNo: this.state.orderNo,
                    payForm: res.data.payForm
                })
            }
        });
    }

    render() {
      return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#ff0000'>
            </StatusBar>
            <KeyboardAwareScrollView>
                <View style={styles.inputContainer}>
                    <Text style={[GlobaStyles.label,{}]}>Order Number</Text>
                    <TextInput style={[GlobaStyles.input,{}]}
                        underlineColorAndroid='transparent'
                        selectionColor='#ff0000'
                        spellCheck={false}
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.orderNo}
                        onChangeText={(value)=>{
                            this.setState({
                                orderNo: value
                            });
                        }}>
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[GlobaStyles.label,{}]}>Subject</Text>
                    <TextInput style={[GlobaStyles.input,{}]}
                        underlineColorAndroid='transparent'
                        selectionColor='#ff0000'
                        spellCheck={false}
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.subject}
                        onChangeText={(value)=>{
                            this.setState({
                                subject: value
                            });
                        }}>
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[GlobaStyles.label,{}]}>Currency</Text>
                    <TextInput style={[GlobaStyles.input,{}]}
                        underlineColorAndroid='transparent'
                        selectionColor='#ff0000'
                        spellCheck={false}
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.currency}
                        onChangeText={(value)=>{
                            this.setState({
                                currency: value
                            });
                        }}>
                    </TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[GlobaStyles.label,{}]}>Amount</Text>
                    <TextInput style={[GlobaStyles.input,{}]}
                        underlineColorAndroid='transparent'
                        selectionColor='#ff0000'
                        spellCheck={false}
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.amount}
                        onChangeText={(value)=>{
                            this.setState({
                                amount: value
                            });
                        }}>
                    </TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        containerStyle={GlobaStyles.primaryButtonContainerStyle}
                        disabledContainerStyle={GlobaStyles.primaryButtonDisabledContainerStyle}
                        style={GlobaStyles.primaryButtonStyle}
                        styleDisabled={GlobaStyles.primaryButtonDisabedStyle}
                        onPress={() => { this._handleAliPay() }}>Alipay Pay
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Consts.COLOR9,

    },
    headerContainer: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 0,
        paddingBottom: 15,
    },
    inputContainer: {
        flex: 10,
        marginLeft: 32,
        marginRight: 32,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 50,
        paddingTop: 25,
        paddingBottom: 30
    },
    signUp: {
        color: Consts.COLOR4,
        fontSize: Consts.FONT_TITLE1.fontSize,
        fontWeight: Consts.FONT_TITLE1.fontWeight,
        marginLeft: 32,
    }
});