import { LicenseLinks } from './components/LicenseLinks'
import { TimerInterface } from './components/TimerInterface'
import { timerContext } from './context/timer.context'
import { useTimer } from './hooks/useTimer.hook'
import './styles/App.css'

function App() {
  const {
    outerTimer, setOuterTimer, 
    innerTimer,
    isTimerPaused, setIsTimerPaused,
    hasCountBeenStarted, 
    timerId, 
    isTimerDecrement, setIsTimerDecrement,
    stopTimer,
    nullifyTimer } = useTimer()
  return (
    <timerContext.Provider value={{outerTimer, setOuterTimer, innerTimer, hasCountBeenStarted, timerId, isTimerPaused, setIsTimerPaused, isTimerDecrement, setIsTimerDecrement, stopTimer, nullifyTimer}}>
      <TimerInterface/>
      <LicenseLinks/>
    </timerContext.Provider>
  )
}

export default App;
