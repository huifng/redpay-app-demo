import { Platform, StyleSheet, Dimensions } from 'react-native';

export const Consts = {
    COLOR1: '#ff0000',
    COLOR2: '#ce0000',
    COLOR3: '#ffce00',
    COLOR4: '#000',
    COLOR5: 'rgba(0,0,0,0.65)',
    COLOR6: 'rgba(0,0,0,0.45)',
    COLOR7: 'rgba(0,0,0,0.25)',
    COLOR8: 'rgba(0,0,0,0.05)',
    COLOR9: '#ffffff',
    COLOR_LOADING: "#f008",
    FONT_TITLE1: {
        fontSize: 28,
        fontWeight: 'normal',
    },
    FONT_TITLE2: {
        fontSize: 22,
        fontWeight: 'normal'
    },
    FONT_TITLE3: {
        fontSize: 20,
        fontWeight: 'normal'
    },
    FONT_HEADLINE: {
        fontSize: 17,
        fontWeight: '500'
    },
    FONT_BODY: {
        fontSize: 17,
        fontWeight: 'normal'
    },
    FONT_CALLOUT: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    FONT_SUBHEAD: {
        fontSize: 15,
        fontWeight: 'normal'
    },
    FONT_FOOTNOTE: {
        fontSize: 13,
        fontWeight: 'normal'
    },
    FONT_CAPTION1: {
        fontSize: 12,
        fontWeight: 'normal'
    },
    FONT_CAPTION2: {
        fontSize: 11,
        fontWeight: 'normal'
    },
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
    ISIPHONEX: Dimensions.get('window').width==375 && Dimensions.get('window').height == 812,
    platform: Platform.OS === 'ios' ? 'REDPAY_IOS' : 'REDPAY_ANDROID',
    API: {
        host: 'https://dev-service.redpayments.com.au'
    },
    appVersion: '1.0.0'
}

export const GlobaStyles = StyleSheet.create({
    primaryButtonContainerStyle: {
        marginLeft: 32,
        marginRight: 32,
        padding: 0,
        height:44, 
        overflow:'hidden', 
        borderRadius:8, 
        backgroundColor: Consts.COLOR1,
    },
    primaryButtonDisabledContainerStyle: {
        marginLeft: 32,
        marginRight: 32,
        padding: 0,
        height:44, 
        overflow:'hidden', 
        borderRadius:8, 
        backgroundColor: 'rgba(255,0,0,0.3)'
    },
    primaryButtonStyle: {
        fontSize: Consts.FONT_HEADLINE.fontSize,
        fontWeight: Consts.FONT_HEADLINE.fontWeight,
        color: Consts.COLOR9,
        lineHeight:44,
        alignSelf: 'center',
    },
    primaryButtonDisabedStyle: {
        fontSize: Consts.FONT_HEADLINE.fontSize,
        fontWeight: Consts.FONT_HEADLINE.fontWeight,
        color: Consts.COLOR9,
        lineHeight:44,
    },
    label: {
        fontSize: Consts.FONT_FOOTNOTE.fontSize,
        fontWeight: Consts.FONT_FOOTNOTE.fontWeight,
        color: Consts.COLOR5,
    },
    input: {
        fontSize: Consts.FONT_BODY.fontSize,
        fontWeight: Consts.FONT_BODY.fontWeight,
        color: Consts.COLOR4,
        backgroundColor: Consts.COLOR8,
        height: 44,
        borderRadius: 8,
        marginTop: 8,
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
    }
});


global.Consts = Consts;