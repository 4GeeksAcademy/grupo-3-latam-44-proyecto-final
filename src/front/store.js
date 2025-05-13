export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    token:sessionStorage.getItem("access_token")
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'set_token':
      const token = action.payload
      return {
        ...store,
        token: token
      }
      case 'log_out':
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('user_id')
      return {
        ...store,
        token: null
      }
    default:
      throw Error('Unknown action.');
  }    
}
