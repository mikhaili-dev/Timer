import { createContext } from "react";

const notAssigned = () => console.log('Not assigned')

const timerContext = createContext({
    outerTimer: {                                                                       //Те значения, что будут отображать в таймере
        hours: null,
        minutes: null,
        seconds: null
    },
    innerTimer: {                                                                       //Будет использовано для корректного определения предыдущего элемента
        hours: null,                                                                    //в setInterval с функциями incrementTime(), decrementTime() 
        minutes: null,
        seconds: null
    },
    hasCountBeenStarted: null,                                                          //Чтобы не показывать проценты, если таймер не был запущен.
    timerId: null,                                                                      //Для отключения таймера в разных местах кода
    isTimerPaused: null,
    setIsTimerPaused: notAssigned,
    isTimerDecrement: null,
    setOuterTimer: notAssigned,
    stopTimer: notAssigned,
    nullifyTimer: notAssigned
})

export {timerContext}