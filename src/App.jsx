import './App.css'
import AutoSearch from './AutoSearch/AutoSearch'

function App() {
  return (
    <main className='App'>
    <header className='h-[4rem] flex justify-center items-center border-b-2'>
      <div className='font-bold'>Rick And Morty</div>
    </header>
      <AutoSearch />
    </main>
  )
}

export default App
