import { useEffect, useReducer, useRef } from 'react'
import './App.css'

interface Todo {
  text: string
  id: number
  completed: boolean
}

type Actions =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CLEAR_TODOS' }
  | { type: 'TOGGLE_TODO_COMPLETED'; payload: Todo }

function reducer(TodoList: Array<Todo>, action: Actions) {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload
    case 'ADD_TODO':
      const todo: Todo = {
        text: action.payload,
        id: new Date().getTime(),
        completed: false,
      }
      return [...TodoList, todo]
    case 'DELETE_TODO':
      return TodoList.filter((todo) => todo.id !== action.payload)
    case 'CLEAR_TODOS':
      return []
    case 'TOGGLE_TODO_COMPLETED':
      const idx = TodoList.findIndex((todo) => todo.id === action.payload.id)
      const newTodoList = [...TodoList]
      newTodoList[idx] = {
        ...action.payload,
        completed: !action.payload.completed,
      }
      return newTodoList
    default:
      return [...TodoList]
  }
}

function App() {
  const [TodoList, dispatch] = useReducer(reducer, [])
  const input = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  const handleAdd = () => {
    if (!input.current) {
      return
    }
    if (!input.current.value) {
      alert('please input todo text')
      return
    }
    dispatch({ type: 'ADD_TODO', payload: input.current.value })
    input.current.value = ''
    input.current.focus()
  }

  const handleClear = () => {
    if (!TodoList.length) {
      alert("you haven't add any todo yet")
      return
    }
    dispatch({ type: 'CLEAR_TODOS' })
  }

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const handleToggle = (todo: Todo) => {
    dispatch({ type: 'TOGGLE_TODO_COMPLETED', payload: todo })
  }
  
  return (
    <div className="App">
      <input type="text" ref={input} />
      <button onClick={handleAdd}>Add</button>
      {TodoList.map((todo) => (
        <div key={todo.id} className="flex">
          <h3>{todo.text}</h3>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo)}
          />
          <button onClick={() => handleDelete(todo.id)}>delete</button>
        </div>
      ))}
      <button onClick={handleClear} className="block">
        Clear
      </button>
    </div>
  )
}

export default App
