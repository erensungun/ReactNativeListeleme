import { StyleSheet,  View, SafeAreaView, ScrollView, Image} from 'react-native'
import React,{useState} from 'react'
import { Avatar, Appbar, Button, Dialog, Portal, Text, PaperProvider, SegmentedButtons, useTheme, Divider, IconButton, Icon, Card} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Detail = ({route,navigation}) => {
    const {product, handleDelete} = route.params;
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState(0)
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();

    const hideDialog = () => setVisible(false);
    const showDialog = () => setVisible(true);

    const imageButtons = product.images.map((image, index) => ({
        value: image,
        label: `${index + 1}`
    }));

    const handleValue=(item)=>{
        if(item===-1 && value>0){
            setValue(value-1)
        }else if(item===-1 && value===0){
            setValue(0)
        }else if(item===1){
            setValue(value+1)
        }
    }

  return (
    <PaperProvider>
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode='small'>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={product.title} />
                <Appbar.Action icon="delete" onPress={showDialog} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Card style={{marginVertical:10}}>
                <View style={styles.imageSection}>
                  <Card.Cover source={{ uri: selectedImage }} style={styles.image} />
                  {product.images.length > 1 ? (
                      <SegmentedButtons
                      value={selectedImage}
                      onValueChange={setSelectedImage}
                      buttons={imageButtons}
                      style={{ marginHorizontal:25}}
                      />
                  ) : null}
                </View>

                <Divider/>
                
                <View style={styles.titleSection}>
                    <View style={styles.titleLeftSide}>
                        <Text style={styles.title}>{product.title}</Text>
                        <View style={{}}>
                          <Text style={styles.brand}>{product.brand}</Text>
                          <Text style={styles.category}>{product.category}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.titleRightSide}>
                        <Text style={styles.rating}><Text style={{fontWeight:"bold"}}>{product.rating}</Text> <Icon source="star"/></Text>
                        <Text style={styles.rating}>{product.stock} stocks</Text>
                    </View>
                </View>
                <Divider/>
                <Text style={styles.description}>{product.description}</Text>
                <Divider/>
                <Text style={styles.availability}>Availability: {product.availabilityStatus}</Text>
                
                <Text style={styles.weight}>Weight: {product.weight} kg</Text>
                <Text style={styles.dimensions}>Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</Text>
                <Text style={styles.returnPolicy}>Return Policy: {product.returnPolicy}</Text>
                <Text style={styles.warrantyInformation}>Warranty: {product.warrantyInformation}</Text>
                <Text style={styles.shippingInformation}>Shipping: {product.shippingInformation}</Text>
              </Card>
                


                <Card>
                  <Card.Title title={product.reviews[0].reviewerName} subtitle="Card Subtitle" right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />} />
                  <Card.Content>
                    <Text variant="titleLarge">{product.reviews[0].reviewerName}</Text>
                    <Text variant="bodyMedium">{product.reviews[0].reviewerName}</Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                  </Card.Actions>
                </Card>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Icon icon="alert" />
                        <Dialog.Title>Uyarı!</Dialog.Title>

                        <Dialog.Content>
                            <Text variant="bodyMedium">"{product.title}" isimli öğeyi silmek istediğine emin misin?</Text>
                        </Dialog.Content>

                        <Dialog.Actions>
                            <Button onPress={hideDialog} style={{textAlign:"flex-start"}}>Hayır</Button>
                            <Button onPress={() => handleDelete(product.id)}>Evet</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
            <Divider/>
            <Appbar
                style={[
                    styles.bottom,{
                        height: BOTTOM_APPBAR_HEIGHT + bottom, 
                        backgroundColor: theme.colors.elevation.level2,
                        paddingHorizontal:20,
                        justifyContent:"space-between"
                    },
                ]}
                safeAreaInsets={{ bottom }}
                >
                <Button mode='contained' >${product.price}</Button>
                <View style={{flexDirection:"row", backgroundColor:"#e6e6e6", borderRadius:100, justifyContent:"space-between", alignItems:"center"}}>
                    <IconButton mode='contained' icon="minus" onPress={() => handleValue(-1)} style={{fontsize:18}}></IconButton>
                    <Text style={{marginHorizontal:10,fontSize:18,fontWeight:"bold"}}>{value}</Text>
                    <IconButton mode="contained" icon="plus" onPress={() => handleValue(+1)}></IconButton>
                </View>
            </Appbar>
        </SafeAreaView>
    </PaperProvider>
  )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      contentContainer: {
        marginHorizontal:10
      },
      imageSection:{
        alignItems: 'center',
        marginBottom: 16,
      },
      image: {
        width: 200,
        height: 200,
        margin: 16,
        resizeMode:"contain",
      },
      titleSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center',
      },
      titleLeftSide:{
        width: "80%"
      },
      titleRightSide:{
        alignItems:"center",
        width: "20%"
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      brand:{
        fontSize: 14,
      },
      category:{
        fontSize: 14,
        color:"gray"
      },
      description: {
        fontSize: 16,
        textAlign: 'center',
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      availability: {
        fontSize: 16,
      },
      rating: {
        fontSize: 16,
      },
      weight: {
        fontSize: 16,
      },
      dimensions: {
        fontSize: 16,
      },
      returnPolicy: {
        fontSize: 16,
      },
      warrantyInformation: {
        fontSize: 16,
      },
      shippingInformation: {
        fontSize: 16,
      },
})