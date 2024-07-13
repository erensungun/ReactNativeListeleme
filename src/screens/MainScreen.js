import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { List, Appbar, ActivityIndicator, FAB } from 'react-native-paper'
import ListItem from '../components/ListItem'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = ({navigation}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({ open: false });

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

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header mode='center-aligned' statusBarHeight={0}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Listeleme Uygulaması" />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        {loading ? (<View style={{height:"100%",justifyContent:"center"}}><ActivityIndicator size={"large"}/></View>) : (
            <View style={{margin:10,marginBottom:40}}>
              <FlatList data={products} keyExtractor={(item)=> item.id} renderItem={({item})=>(
                <ListItem data={item} navigation={navigation} handleDelete={handleDelete}/>
              )}/>
            </View>
        )}
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'menu'}
          actions={[
            {
              icon: 'refresh',
              label: 'Refresh',
              onPress: () => fetchProducts(),
            },
            {
              icon: 'logout',
              label: 'Logout',
              onPress: () => navigation.goBack(),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
    },
})