import React from "react"
import { useContext } from "react"
import { timerContext } from "../context/timer.context"
import '../styles/decrement-options.css'

function DecrementOptions({getCorrectTimeObj}) {
    const {outerTimer, setOuterTimer} = useContext(timerContext)

    function addTimeHandler(timeVariable, timeToAdd) {
        const newTimeValue = getAddedTimeValue(timeVariable, timeToAdd)

        if (timeVariable === 'hours' && isHoursValueExceedLimit(newTimeValue)) return       //Отменяем изменение таймера, если при прибавлении часа вышли за пределы двузначного числа

        const correctTimeObj = getCorrectTimeObj(timeVariable, newTimeValue)                //В результате может вернуться: 1) объект, имеющий все значения ({hours, minutes, seconds}), 
                                                                                            //2) объект, обладающий исключительно свойством timeVariable. Это зависит от того, нарущены ли лимиты 
        
        setOuterTimer({                                                                     //Здесь учтены оба сценария, указынне выше: в первом случае значения correctTimeObj                         
            ...outerTimer,                                                                  //перепишут все значения outerTimer, а во втором -- только одно из его значений.
            ...correctTimeObj
        })
    }
    function isHoursValueExceedLimit(value) {
        value = +value

        return value > 99 ? true : false 
    }
    function getAddedTimeValue(timeVariable, timeToAdd) {
        const prevTimeValue = +outerTimer[timeVariable]
        const newTimeValue = prevTimeValue + timeToAdd

        return newTimeValue
    }
    return (
        <div className="add-time-container">
            <div onClick={() => addTimeHandler('seconds', 30)}>+ 30 с</div>
            <div onClick={() => addTimeHandler('minutes', 1)}>+ 01 м</div>
            <div onClick={() => addTimeHandler('minutes', 5)}>+ 05 м</div>
            <div onClick={() => addTimeHandler('minutes', 10)}>+ 10 м</div>
            <div onClick={() => addTimeHandler('minutes', 30)}>+ 30 м</div>
            <div onClick={() => addTimeHandler('hours', 1)}>+ 01 ч</div>
        </div>
    )
}

export {DecrementOptions}