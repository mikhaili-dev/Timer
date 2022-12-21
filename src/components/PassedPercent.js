import React, { useState, useCallback, useRef, useContext, useEffect } from "react"
import { timerContext } from "../context/timer.context"
import '../styles/passed-percent.css'

function PassedPercent() {
    const {
        outerTimer,
        isTimerDecrement, 
        hasCountBeenStarted} = useContext(timerContext)
    const maxSecValue = useRef(0)
    const [passedPercent, setPassedPercent] = useState(null)

    const changePercentHandler = useCallback(() => {
        if (isTimerDecrement.current && hasCountBeenStarted.current) {
            const currentSeconds = +outerTimer.seconds
            const currentMinutes = +outerTimer.minutes
            const currentHours = +outerTimer.hours

            const currentTotalSec = (currentHours * 60 * 60) + (currentMinutes * 60) + currentSeconds   //Переводим в секунды текущее время таймера

            if (currentTotalSec === 0) {
                maxSecValue.current = 0
                setPassedPercent(null)                                                                  //Убираем счётчик, если время вышло или пока не было установлено
                return
            }

            if (currentTotalSec > maxSecValue.current) {
                maxSecValue.current = currentTotalSec
            }

            const currentpassedPercent = 100 - Math.ceil((currentTotalSec / maxSecValue.current) * 100)

            setPassedPercent(currentpassedPercent)
            
        } else {                                                                    //Сбрасываем значения, если был переключен режим таймера
            maxSecValue.current = 0                                                 //(при переключении режима обновляется значение таймера, и от этого срабатывает useEffect с этой функцией)
            setPassedPercent(null)                                                  //(значение не обновится, только если оно уже было равно нулю -- но для этого случая уже был убран таймер)
        }
        // eslint-disable-next-line
    }, [outerTimer, isTimerDecrement, hasCountBeenStarted.current])

    useEffect(() => {
        changePercentHandler()                                                      //При изменении outerTimer может также требоваться обновить процент пройденного времени
    }, [outerTimer, changePercentHandler])

    return (
        Number.isFinite(passedPercent) ? 
            <div className="passed-percent">
                <span>{passedPercent + '%'}</span>
            </div> 
            : null
    )
}
export {PassedPercent}