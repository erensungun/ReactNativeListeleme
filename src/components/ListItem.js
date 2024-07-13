import React from 'react'
import { StyleSheet, Image} from 'react-native'
import { List } from 'react-native-paper'

const ListItem = ({data, navigation,handleDelete}) => {
return (
    <List.Item 
            title={data.title}
            description={data.description}
            left={() => <List.Image source={{uri:data.thumbnail}}/>}
            onPress={() => navigation.navigate("Detail",{ product: data , handleDelete:handleDelete})}
    />
    
)
}

export default ListItem

const styles = StyleSheet.create({})