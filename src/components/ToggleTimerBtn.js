import React, { useContext, useEffect } from "react";
import { timerContext } from "../context/timer.context";
import pauseIcon from "../images/pause-icon.png"
import playIcon from "../images/play-icon.png"
import '../styles/toggle-timer-btn.css'

function ToggleTimerBtn({isTimerZero, getObjWithCorrectTimeLength}) {
    const {
        setOuterTimer,
        innerTimer, 
        timerId, 
        hasCountBeenStarted, 
        isTimerPaused, setIsTimerPaused,
        isTimerDecrement,
        stopTimer } = useContext(timerContext)

    useEffect(() => {
        window.addEventListener('keydown', keydownHandler)

        return () => window.removeEventListener('keydown', keydownHandler)
        // eslint-disable-next-line
    }, [])

    function keydownHandler(event) {
        const keyCode = event.code

        if (keyCode === 'Space') clickToggleTimerBtn()
    }

    function clickToggleTimerBtn() {
        if (!timerId.current) {                                                 //Если таймер не запущен
            startTimer()
        } else {
            stopTimer()
        }
    }
    function startTimer() {
        const timeMode = 
                isTimerDecrement.current ? 
                    !isTimerZero() ? 
                        decrementTime : null 
                    : incrementTime

        if (!timeMode) return

        hasCountBeenStarted.current = true

        setIsTimerPaused(false)
                    
        timerId.current = setInterval(timeMode, 1000)
    }
    function decrementTime() {
        let prevTimeObj = innerTimer.current

        let prevHours = +prevTimeObj.hours
        let prevMinutes = +prevTimeObj.minutes
        let prevSeconds = +prevTimeObj.seconds

        let currentHours, currentMinutes, currentSeconds

        if (!prevSeconds) {                                                         //Если секунды равны нулю: --:--:00 ("--" значит не известно)
            if (prevMinutes) {                                                      //Если 00 секунд, но не 00 минут: --:**:00  (** - значение больше 0)
                currentHours = prevHours
                currentMinutes = prevMinutes - 1
                currentSeconds = 59
                
            } else if (prevHours) {                                                 //Если 00 секунд и минут, но не 00 часов: **:00:00
                currentHours = prevHours - 1
                currentMinutes = 59
                currentSeconds = 59
            } else {
                currentHours = currentMinutes = currentSeconds = 0
            }
        } else {                                                                    //Если не 00 секунд: --:--:**
            currentHours = prevHours
            currentMinutes = prevMinutes
            currentSeconds = prevSeconds - 1
        }
        const currentTimeObj = {
            hours: String(currentHours), 
            minutes: String(currentMinutes), 
            seconds: String(currentSeconds)
        }

        if (!(currentHours || currentMinutes || currentSeconds)) {                  //Выполнится, если все значения равны нулю: 00:00:00
            stopTimer()

            hasCountBeenStarted.current = false
        }
        
        addChangedTimeToCount(currentTimeObj)
    }
    
    function incrementTime() {
        let prevTimeObj = innerTimer.current

        let currentHours, currentMinutes, currentSeconds

        let prevHours = +prevTimeObj.hours
        let prevMinutes = +prevTimeObj.minutes
        let prevSeconds = +prevTimeObj.seconds

        if (prevSeconds === 59) {                                                   //Если --:--:59
            currentSeconds = 0

            if (prevMinutes === 59) {                                               //Если --:59:59
                currentMinutes = 0
                currentHours = prevHours + 1
            } else {                                                                //Если --:[!=59]:59
                currentMinutes = prevMinutes + 1
                currentHours = prevHours
            }
        } else {                                                                    //Если --:--:[!=59]
            currentSeconds = prevSeconds + 1
            currentMinutes = prevMinutes
            currentHours = prevHours
        }
        if (currentHours === 99 && currentMinutes === 59 && currentSeconds === 59) {         //Чтобы не ломался интерфейс при появлении третьей цифры в часах, останавливаем таймер при 99:59:59
            stopTimer()
        }
        const currentTimeObj = {
            hours: String(currentHours), 
            minutes: String(currentMinutes), 
            seconds: String(currentSeconds)
        }
        addChangedTimeToCount(currentTimeObj)
    }
    function addChangedTimeToCount(currentTimeObj) {
        const correctFormatObj = getObjWithCorrectTimeLength(currentTimeObj)

        setOuterTimer(correctFormatObj)
    }
    return (
        <button 
            className='toggle-timer-btn'
            onClick={clickToggleTimerBtn}
            onDragStart={(event) => event.preventDefault()}                                 //Чтобы не перетаскивалась картинка внутри
            onKeyDown={(event) => event.preventDefault()}                                   /*Чтобы не было бага с двойным нажатием c выше подключённым window.onkeydown*/>
            <img 
                src={isTimerPaused ? playIcon : pauseIcon}
                alt={isTimerPaused ? "▶" : "❚❚"}
            />
        </button>
    )
}

export {ToggleTimerBtn}