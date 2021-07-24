//Here while importing we can also use alias(we can write abc instead of Todo here) for default export that is for sinnglee file and for multiple files we use curly braces
import Todo from './Components/Todo'
import Todo2 from './Components/Todo2'
import Todo3 from './Components/TodoWithComponentsOptimised'
import TodoWithComponents from './Components/TodoWithComponents'
function App() {
  return(
    <>
      <Todo3/>
      {/* <Todo/> */}
      <Todo2/> 
    </>
  )
}
export default App;

