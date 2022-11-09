import { TouchableHighlight, View, Text, ActivityIndicator } from 'react-native'

export default Button = ({ onPress, text = "", color = "#027D29", loading=false }) => {

    const styles = {
        container: {
            margin: 10,
            //width: '90%',
            //marginVertical: '5%'
        },
        button: {
            alignItems: "center",
            backgroundColor: color,
            padding: 10,
            height: 40
        },
        text:{
            color: '#FFFFFF',
            fontWeight: "bold"
        }
    };

    return (
        <TouchableHighlight
            onPress={onPress} 
            style={styles.container} 
            disabled={loading}
            activeOpacity={0.6}
        >
            <View style={styles.button}>
                {
                    loading
                    ? <ActivityIndicator size="small" color="#FFFFFF"/>
                    :<Text style={styles.text}>{text}</Text>
                }
            </View>
        </TouchableHighlight>
    )
}
