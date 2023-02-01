import { CreateTask } from './components/Task'

import './App.css'

export function Header() {

  return (
    <header className="header">
      <img src='/logo.svg' className="logo" alt="AngelOn logo" />
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