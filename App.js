import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,TouchableOpacity, FlatList, Alert,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useState} from 'react'


const colors = {primary : '#1f145c', white : '#fff' , secondary : '#cde234'}

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([
    {id: 1, task: "First todo", content : 'selamalr', completed: true, isOpen : false},
    {id: 2, task: "Second todo", content : 'alskdjadsadlsajdlkasjdkasjdlasjdklasjdlkasjdlsadjlkasdjlaskdjlas', completed: false, isOpen : true}
    
  ]);

  const [editTodoContent, setEditTodoContent] = useState(false)
  const [holderTodos, setHolderTodos] = useState([])
  const [filterCompleted, setFilterCompleted] = useState(false)
  const [currentTodoId, setCurrentTodoId] = useState(null)


  const ListItem = ({todo}) => {
    return (
      <View style={[styles.listItem, {height : todo?.isOpen ? 350 : 65}]}>
        <View style={{flexDirection : 'row', width : '100%', height : 35, alignItems : 'center'}}>
            <View style={{flex : 1}}>
              
              <Text style={{fontWeight : 'bold', fontSize : 15, color : colors.primary, textDecorationLine : todo?.completed ? 'line-through' : 'none'}}>{todo.id} - {todo?.task}</Text>
          </View>
          <TouchableOpacity  style={{borderWidth : 1, width :30, height : 30, borderRadius : 999, borderColor : todo?.completed ? '#00781a' : 'black', backgroundColor : todo?.completed ? 'green' : null, alignItems : 'center',justifyContent : 'center'}} 
          onPress={() => !todo?.completed ? markTodoComplete(todo?.id) : unCompleteTodo(todo?.id)}
          >
          <Ionicons name="checkmark-outline" size={20} color={todo?.completed ? 'green' : 'black'} style={{opacity : todo?.completed ? 0 : 1}} />
          </TouchableOpacity>

          <TouchableOpacity  style={{width :30, height : 30, borderRadius : 999,backgroundColor : 'red', marginLeft : 13, justifyContent :'center', alignItems : 'center'}}
          onPress={() => deleteItem(todo?.id)}
          >
          <Ionicons  name="trash" size={19} color="white" />
          </TouchableOpacity>

          <TouchableOpacity  style={{width :30, height : 30, borderRadius : 999,backgroundColor : '#f8f8f8', marginLeft : 13, justifyContent :'center', alignItems : 'center', elevation : !todo?.isOpen ? 5 : 0}}
          onPress={() => toggleShowMore(todo?.id)}
          >
          <Ionicons  name={!todo?.isOpen ? 'caret-down-outline' : 'caret-up-outline'} size={19} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView
        showsVerticalScrollIndicator={true}
        style={{marginTop : 25 , opacity  : !todo?.isOpen ? 0 : 1 }}>
        <View style={{flexDirection : 'row' ,flex : 1, alignItems : 'center', justifyContent : 'flex-end',marginBottom: 25}}> 

            <TouchableOpacity  
              onPress={(event) => toggleEditMode(todo?.id,event)}
              >
              <Ionicons  name={ !editTodoContent ? 'create-outline' : 'close-outline'} size={30} color={colors.primary} />
            </TouchableOpacity>

        </View>
          <Text style={{color : 'black', minHeight:120, height : 'auto'}}>
            {todo.content}, { editTodoContent ? 'True' : 'False'} , Current TODO ID : {currentTodoId}
          </Text>
          <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-evenly', opacity : editTodoContent ? 1 : 0 }}>
            <TextInput 
            style={{ elevation : 1, padding: 20, width : '85%'}}
            placeholder='Edit content'
            />
            <TouchableOpacity  
              style={{backgroundColor : colors.secondary, alignItems : 'center', justifyContent : 'center', padding : 3, borderRadius: 999,height:45,width:45 }}
              onPress={(event) => toggleEditMode(todo?.id,event)}
              >
              <Ionicons  name='create-outline' size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  


  const addToDo = () => {
   if(textInput == ''){
     Alert.alert('Error', 'Please input a todo first.')
   }else{
     
    const todoList = Object.values(todos);
    let todoListID = todoList[todoList.length - 1]?.id
    if (todoListID < 0 || todoListID === undefined) todoListID = 0
     const newTodo = {
       id : todoListID+1,
       task : textInput,
       completed : false
     }
    setTodos([...todos, newTodo])
    setTextInput('')
   }
  }

  const markTodoComplete = (todoId) => {
   const newTodos = todos.map(e => {
     if(e.id === todoId) {
      return {...e, completed: true}
     }

     return e
   })

   setTodos(newTodos)
  }

  const unCompleteTodo = (todoId) => {
    const newTodos = todos.map(e => {
      if(e.id === todoId) return {...e, completed : false}

      return e
    })

    setTodos(newTodos)
  }


  const deleteItem = (index) => {
    const newTodos = todos.filter(e => e.id !== index)
    // you can do this with splice also splice(index, 1)
    setTodos(newTodos)
  }

  const toggleShowMore = (index) => {
    const newTodos = todos.map(e => {
      if(e.id === index) return {...e, isOpen : !e.isOpen}

      return e
    })
    
    setTodos(newTodos)
  }

  const hideCompleted = () => {
    setHolderTodos(todos)
    const newTodos = todos.filter(e=> e.completed === false)

    setTodos(newTodos)
    setFilterCompleted(true)
  }

  const showAllTodos = () => {
    setTodos(holderTodos)
    setFilterCompleted(false)
  }

  const toggleEditMode = (id) => {
    setEditTodoContent(!editTodoContent)
    setCurrentTodoId(id)
  }

  const editTodoContents = async (id) => {
    
    
    Alert.alert('info', await id)
      
   
  }



  return (
    <View style={{flex : 1, backgroundColor: colors.white, flexDirection : 'column', paddingHorizontal: 20}}>
      
     
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{fontWeight : 'bold', fontSize : 20}}>TODO APP</Text>
      <View style={{flexDirection: 'row' , alignItems : 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => !filterCompleted ? hideCompleted() :  showAllTodos()} >  
          <Text>{filterCompleted ? 'Show All' : 'Hide Completed'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTodos([])} style={{marginLeft: 13}}>  
          <Ionicons name="trash-outline" size={30} style={{color : 'red'}}/>
        </TouchableOpacity>
      </View>
      </View>
      <FlatList  
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 2,paddingBottom : 100}}
      data={todos}
      renderItem={({item}) => <ListItem todo={item}
       />}/>
      <View style={[styles.footer, {opacity : editTodoContent ? 0 : 1}]}>
        <View style={styles.inputContainer}>
          <TextInput  
          onChangeText={text => setTextInput(text)} 
          value={textInput} 
          placeholder={ !editTodoContent ? 'Please Add TODO' : 'Please edit content'}
          multiline={ !editTodoContent ? false :  true}
          />
        </View>
        <TouchableOpacity  onPress={!editTodoContent ? addToDo : editTodoContents}>
          <View style={styles.iconContainer}>
            <Ionicons name={!editTodoContent ? 'add-outline' : 'create-outline'} size={30} color={colors.white} /> 
          </View>
      </TouchableOpacity>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
 header : {
   
   paddingVertical: 55,
   flexDirection : 'row',
   alignItems : 'center',
   justifyContent : 'space-between',
  
 },
 footer: {
   position : 'absolute',
   bottom :0,
   backgroundColor: 'white',
   width : '112%',
  paddingHorizontal: 20,
   flexDirection : 'row',
   alignItems : 'center'
 },
 inputContainer : {
   backgroundColor : 'white',
   elevation : 5,
   flex: 1,
   height : 50,
   marginVertical : 20,
   marginRight : 20,
   paddingHorizontal: 20,
   borderRadius :4,
   justifyContent : 'center'
 },
 iconContainer : {
   height : 55,
   width : 55,
   backgroundColor : colors.primary,
   borderRadius : 999,
   elevation:3,
   justifyContent: 'center',
   alignItems: 'center'
 },
 listItem : {
  padding : 20,
  width : '100%',
  backgroundColor : colors.white,
  flexDirection: 'column',
  
  elevation : 5,
  borderRadius : 4,
  marginVertical : 7
 },
 actionIcon : {
   height : 25,
   width : 25,
   borderColor : "green",
   borderWidth :3,
   justifyContent : 'center',
   alignItems : 'center',
   marginLeft : 5,
   borderRadius : 999
 }
 
});


export default App;