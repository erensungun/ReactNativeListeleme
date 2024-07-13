import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { List, Appbar, ActivityIndicator, FAB } from 'react-native-paper'
import ListItem from '../components/ListItem'

const MainScreen = ({navigation}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => setProducts(json.products))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header mode='center-aligned'>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Listeleme Uygulaması" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      {loading ? (<View style={{height:"100%",justifyContent:"center"}}><ActivityIndicator size={"large"}/></View>) : (
          <View style={{marginHorizontal:10}}>
            <FlatList data={products} keyExtractor={(item)=> item.id} renderItem={({item})=>(
              <ListItem data={item} navigation={navigation} handleDelete={handleDelete}/>
            )}/>
          </View>
      )}
      <FAB
            style={styles.fab}
            icon="refresh"
            onPress={fetchProducts}
            disabled={loading}
          />
    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
})