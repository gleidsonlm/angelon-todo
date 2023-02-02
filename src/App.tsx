import { TaskApp } from './components/Task'
import './App.css'

export function Header() {

  return (
    <header className="header">
      <img src='/logo.svg' className="logo" alt="AngelOn logo" />
      <h1 className="title">T<span className='blue'>oD</span>o</h1>
    </header>
  )
}

export function Main() {
  return (
    <main className='main'>
      <TaskApp />
    </main>
  )
}
