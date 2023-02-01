import { CreateTask } from './components/Task'

import './App.css'
import logo from './assets/logo.svg'

export function Header() {

  return (
    <header className="header">
      <img src={logo} className="logo" alt="AngelOn logo" />
      <h1 className="title">to<span className='blue'>do</span></h1>
    </header>
  )
}

export function Main() {
  return (
    <main className='main'>
      <CreateTask />
    </main>
  )
}