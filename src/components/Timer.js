import React from "react";
import { useContext } from "react";
import { timerContext } from "../context/timer.context";
import '../styles/timer.css'

function Timer({getCorrectTimeObj}) {
    const {outerTimer, setOuterTimer} = useContext(timerContext)
    
    function handleEventInput(timeVariable, timeValue) {
        if (!Number(timeValue)) {                                                   //Такую проверку пройдут значения NaN - то есть не числа, и, в частности, не undefined
            timeValue = ""                                                          //В случае undefined избежим ошибкок в useState
        }                                                                   
        setOuterTimer({
            ...outerTimer,
            [timeVariable]: timeValue
        })
    }
    function handleChangeEvent(timeVariable, timeValue) {
        if (!timeValue) timeValue = "0"                                             //Так как в input не должно ничего не быть после потери фокуса

        const correctTimeObj = getCorrectTimeObj(timeVariable, timeValue)

        setOuterTimer({
            ...outerTimer,
            ...correctTimeObj
        })

    }
    function inputKeyDownHandler(event) {
        const key = event.key
        const input = event.target

        if (key === 'Enter' || key === 'Escape') input.blur()
    }
    return (
        <div className='timer'>
            <div>
                <input 
                    type='text'
                    maxLength="2"
                    onInput={(event) => handleEventInput('hours', event.target.value)}
                    onBlur={(event) => handleChangeEvent('hours', event.target.value)}          //onBlur как альтернатива onChange, так как второй в react работает так же, как onInput
                    onKeyDown={(event) => inputKeyDownHandler(event, 'hours')}
                    value={outerTimer.hours}
                />
                <span>:</span>
                <input 
                    type='text'
                    maxLength="2"
                    onInput={(event) => handleEventInput('minutes', event.target.value)}
                    onBlur={(event) => handleChangeEvent('minutes', event.target.value)}
                    onKeyDown={(event) => inputKeyDownHandler(event, 'minutes')}
                    value={outerTimer.minutes}
                />
                <span>:</span>
                <input 
                    type='text'
                    maxLength="2"
                    onInput={(event) => handleEventInput('seconds', event.target.value)}
                    onBlur={(event) => handleChangeEvent('seconds', event.target.value)}
                    onKeyDown={(event) => inputKeyDownHandler(event, 'seconds')}
                    value={outerTimer.seconds}
                />
            </div>
        </div>
    )
}

export {Timer}