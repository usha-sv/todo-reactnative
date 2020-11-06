/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
function ToDoList(props){
  const items = props.items;
  const listItems = items.map(item =>{
   return <View style={styles.displayList}>
            <View style={{ width:"50%"}}>
              <Text numberOfLines={1} style={styles.list}>{item.text }</Text>
            </View>
            <View style={styles.displayButtons}>
              <TouchableOpacity onPress={() => {props.handleDelete(item.key);}}>
                 <View style={styles.buttonDel}>
                    <Text style={styles.textDel}>Delete</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {props.handleEdit(item.key);}}>
                <View style={styles.buttonEdit}>
                  <Text style={styles.textEdit}>  Edit  </Text>
                </View>
              </TouchableOpacity>
           </View>
   </View>;});
    return (
      <ScrollView>{listItems}</ScrollView>
    );
  }

class ToDo extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:[],
      key:'',
      text:'',
      selectedKey:'',
      updateItem:false,
    };
  }
  handleInput=(e)=>{
    this.setState({
      text: e, //entered text is set
      key:Date.now(),              //key is created
    });
  }

  handleAdd=()=>{
    const newItem = {
      key:this.state.key, //creting new item
      text:this.state.text,
    };
    if (newItem.text !== ''){
     const items = [...this.state.items, newItem];//destructuring using spread(adding new item to items[])
      this.setState({
        items: items,
        text:'',
        key:'',
      });
    }
    else
      {alert('List items cannot be empty!!');}
  }
  handleEdit=(key)=>{
    let {items} = this.state; //destructuring assignment
    const selectedItem = items.find(item=>item.key === key);
    this.setState({
      selectedKey:key,        //storing the key of selected item
      text: selectedItem.text,//updating the text
      updateItem :true,
    });
  }
  handleUpdate=()=>{
    let {selectedKey,items,text} = this.state;  //destructuring assignment
    let selectedItem = items.find(item => item.key == selectedKey);//selcting the item from items[]
    let indexOfSelectedItem = items.indexOf(selectedItem); //finding the index of selected item
    let newItems = items;
    console.log(items);
    newItems[indexOfSelectedItem] = {key:selectedKey,text};
    console.log(newItems[indexOfSelectedItem]);  //updating the item at its index
    this.setState({
      items: newItems,
      text:'',
      key:'',
      updateItem:false,
    });
  }

  handleDelete=(key)=>{
    const filteredItems = this.state.items.filter(item =>item.key !== key);//removing the item of selected key
    this.setState({
      items: filteredItems,  //updating items[] from flitered items
    });
  }

  handleEdit=(key)=>{
    const selectedItem = this.state.items.find(item=>item.key === key);
    this.setState({
      selectedKey:key,            //storing the key of selected item
      text: selectedItem.text,
      updateItem :true,
    });
  }

  render(){
    let {items,updateItem,text} = this.state; //destructuring assignment
    return (
      <View style={styles.form}>
        <View style={styles.head} >
          <Text style={styles.heading}>ToDo App</Text>
        </View> 

        <View style={styles.body}>
          <TextInput style={styles.input}
           placeholder="Enter your remainders"
           onChangeText={this.handleInput}
           value={text}/>
           <TouchableOpacity onPress={updateItem ? ()=>this.handleUpdate() : ()=>this.handleAdd()}>
             <View style={styles.buttonAdd}>
                 <Text style={styles.buttonAddText}>{updateItem ? 'Update' : 'Add'}</Text>
               </View>
            </TouchableOpacity>
        </View>
     
        <ToDoList items={items} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonAdd:{
    backgroundColor: 'rgb(176, 192, 88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:2,
    marginTop:18,
    height: 45,
    width:80,
    marginRight:20,
    borderColor:'powderblue',//white rgb(229, 233, 229)
  },
  buttonAddText:{
    color: 'black', 
    fontSize: 15,
    fontWeight: '800'
  },
  buttonDel:{
    backgroundColor: 'rgb(192, 109, 88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonEdit:{
    backgroundColor:'rgb(176, 192, 88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textEdit:{
    color: 'black',
    fontSize: 15, 
    fontWeight: '800'
  },
  textDel:{
    color: 'black', 
    fontSize: 15, 
    fontWeight: '800'
  },
  list:{
    color: 'black', 
    fontSize: 15,
    fontStyle: 'italic',
    flexDirection: "row",
    margin:10,
    width:"100%",
  },
  heading:{
    alignContent:"center",
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily:'sans-serif',
    backgroundColor:"powderblue",
    textAlign: "center",
    padding:10,
  },
 input:{
    borderWidth: 2,
    borderColor: 'powderblue',
    margin: 10,
    marginTop:18,
    height: 45,
    width:280,
 },
 displayList:{
    backgroundColor:'rgb(229, 233, 229)',
    marginRight:10,
    marginLeft:10,
    marginTop:10, 
    borderColor:"rgb(3, 10, 3)",
    borderWidth:1,
    flexDirection: "row" ,
    justifyContent: 'space-between'
 },
 displayButtons:{
    flexDirection: "row" , 
    justifyContent: 'flex-end'
},
from:{
    flex: 1,backgroundColor:"powderblue", 
    flexDirection: 'column',
    alignContent:"stretch"
},
 head:{
    alignContent:"stretch", 
    height: 50, 
    backgroundColor: 'powderblue'
  },
  body:{
    alignContent:"stretch",
     flexDirection: "row",
     justifyContent: 'space-between',
     height: 80, 
     backgroundColor: 'rgb(225, 190, 219)'
  },
});
export default ToDo;

