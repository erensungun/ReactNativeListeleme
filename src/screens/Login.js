import React,{useState} from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { Button, Card, TextInput, useTheme } from 'react-native-paper';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);

    const theme = useTheme();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
  return (
    <View style={styles.container}>
    <Card style={styles.card}>
        <Card.Title title="Login" titleVariant="headlineLarge" titleStyle={{alignSelf:"center",fontWeight:"bold"}}/>
        <Card.Content>
        <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode='outlined'
            type="email"
        />
        <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode='outlined'
            secureTextEntry={!passwordVisible}
            right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={togglePasswordVisibility} />}
        />
        <Button mode="contained" onPress={() => navigation.navigate("Main")} dark="true" style={{margin:10}}>Login</Button>
        <View style={{alignItems:"center"}}>
            <Pressable >
                <Text>Don't have an account? <Text style={{color:theme.colors.primary}}>Register</Text></Text>
            </Pressable>
        </View>
        </Card.Content>
    </Card>
</View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: "80%",
        padding: 10,
    }
})