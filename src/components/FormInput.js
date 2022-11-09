import { TextInput, StyleSheet, View, Text, Dimensions } from 'react-native'

export default FormInput = ({ value, onChangeText, text="", password=false, w=93, s=10, h=60, multiline=false }) => {

    const styles = {
        container: {
            height: h,
            width: w + '%',
            marginHorizontal: 10,
            flexDirection: 'column',
        },
        text: {
            //flex:1,
            height: '30%',
            fontSize: s,
            //margin: 1,
            fontWeight: "bold",
            marginVertical: 2,
            color: '#7E7E7E'
        },
        input: {
            flex:1,
            fontSize: s,
            //margin: 1,
            borderWidth: 1,
            borderColor: '#E5E5E5'
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <TextInput
                style={styles.input}
                value={value}
                editable
                {...multiline ? multiline: ""}
                numberOfLines={multiline ? 4: 1}
                onChangeText={onChangeText}
                secureTextEntry={password}
                maxLength={40}
            />
        </View>
    )
}
