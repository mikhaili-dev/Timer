import React, { useCallback, useEffect, useContext } from "react"
import { DecrementOptions } from "./DecrementOptions"
import {ChangeModeBtn} from "./ChangeModeBtn"
import { Timer } from "./Timer"
import { timerContext } from "../context/timer.context"
import { ToggleTimerBtn } from "./ToggleTimerBtn"
import { ResetBtn } from "./ResetBtn"
import { PassedPercent } from "./PassedPercent"
import '../styles/timer-interface.css'

function TimerInterface() {
    const {
        outerTimer,
        timerId,
        isTimerDecrement } = useContext(timerContext)

    const isTimerZero = useCallback(() => {
        const timeObj = outerTimer

        let isZero = true

        for (let timeVariable in timeObj) {
            const timeValue = timeObj[timeVariable]

            if (timeValue !== '00') {                                               //Проверяем, отличается ли хоть одно из значений **:**:** от нуля
                isZero = false
                break
            }
        }
        return isZero
    }, [outerTimer])

    const changeTitle = useCallback(() => {
        if (isTimerZero() || !timerId.current) { 
            document.title = 'Timer'
        } else {
            document.title = `${outerTimer.hours}:${outerTimer.minutes}:${outerTimer.seconds}`
        }
    }, [outerTimer, isTimerZero, timerId])

    useEffect(() => {
        changeTitle()
    }, [outerTimer, changeTitle])

    function getCorrectTimeObj(timeVariable, timeValue) {
        let modifyingTimeObj = {[timeVariable]: timeValue}

        if (isCorrectLimitsNeeded(timeVariable, timeValue)) {
            modifyingTimeObj = getObjWithCorrectTimeLimits(timeVariable, timeValue)
        }
        modifyingTimeObj = getObjWithCorrectTimeLength(modifyingTimeObj)

        return modifyingTimeObj
    }
    function isCorrectLimitsNeeded(timeVariable, timeValue) {                       //Проверяем, нужно ли обрабатывать значение с учётом нарушения лимитов
        timeValue = +timeValue

        if ((timeVariable === 'minutes' || timeVariable === 'seconds') && timeValue > 59) {
            return true
        }
        return false
    }
    function getObjWithCorrectTimeLimits(timeVariable, timeValue) {                 //Функция отсчитывает время с учётом превышенных лимитов для значений мин и сек (59), распределяя их значения
        timeValue = +timeValue                                                      //Например, если ввести "77" минут, то: 1) значение часа повысится на 1; 2)значение минут станет равным 17

        let hours = +outerTimer.hours
        let minutes = +outerTimer.minutes
        let seconds = +outerTimer.seconds

        if (timeVariable === 'minutes') {
            let additionalMinutes = timeValue

            hours += Math.trunc(additionalMinutes / 60)                             //Суммируем предыдущее значение часов с нынешним, которое равно целой части от делении минут на 60
            minutes = additionalMinutes % 60

            if (hours > 99) {                                                       //Фиксируем двузначное значение часов на случай,
                hours = 99                                                          //если при изменении минут значение часов стало трёхкратным
                minutes = 59
            }
        } else if (timeVariable === 'seconds') {
            let additionalSeconds = timeValue

            minutes += Math.trunc(additionalSeconds / 60)
            seconds = additionalSeconds % 60

            if (minutes > 59) {
                hours += Math.trunc(timeValue / 60)
                minutes = minutes - 60

                if (hours > 99) {
                    hours = 99
                    minutes = 59
                    seconds = 59
                }
            }
        }
        const correctTimeObj = {hours, minutes, seconds}

        return correctTimeObj
    }

    function getObjWithCorrectTimeLength(timeObj) {                                 //Параметр в формате объекта, так как функция должна позволять проверять множество значений в цикле.
        let correctTimeLengthObj = {};                                              //Множество значений используется в decrementTime() и incrementTime()

        for (let timeVariable in timeObj) {
            let timeValue = timeObj[timeVariable]

            timeValue = String(timeValue)
            
            const correctTimeValue = timeValue.length === 1 ? "0" + timeValue : timeValue

            correctTimeLengthObj[timeVariable] = correctTimeValue
        }
        return correctTimeLengthObj
    }
    return (
        <div className='timer-interface'>
            <ChangeModeBtn/>
            <Timer getCorrectTimeObj={getCorrectTimeObj}/>
            {isTimerDecrement.current ? <DecrementOptions getCorrectTimeObj = {getCorrectTimeObj}/> : null}
            <ResetBtn/>
            <PassedPercent/>
            <ToggleTimerBtn isTimerZero={isTimerZero} getObjWithCorrectTimeLength={getObjWithCorrectTimeLength}/>
        </div>
    )
}
export {TimerInterface}