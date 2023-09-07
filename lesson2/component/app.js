import html from '../core.js'
import Header from '../component/header.js'
import TodoList from '../component/ToDoList.js'
import Footer from '../component/footer.js'
  
function App() {
    return html`
        <section class="todoapp">
            ${Header()}
            ${TodoList()}
            ${Footer()}
        </section>
    `
}

export default App 