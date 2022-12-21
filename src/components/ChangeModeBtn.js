import React, { useState, useEffect, useContext } from "react";
import { timerContext } from "../context/timer.context";
import arrowIcon from '../images/arrow-icon.png'
import plusIcon from '../images/plus-icon.png'
import minusIcon from '../images/minus-icon.png'
import '../styles/change-mode-btn.css'

function ChangeModeBtn() {
    const {
        isTimerDecrement,
        timerId,
        hasCountBeenStarted,
        stopTimer,
        nullifyTimer } = useContext(timerContext)
    const [switchModeText, setSwitchModeText] = useState(null)                                          //Текст, который будет на кнопке переключения режима

    useEffect(() => {
        setSwitchModeText(isTimerDecrement.current ? 'Режим увеличения' : 'Режим уменьшения')                   //При изменении режима меняем текст кнопки
        // eslint-disable-next-line
    }, [isTimerDecrement.current])

    function clickChangeModeBtn() {
        if (timerId.current) stopTimer()

        hasCountBeenStarted.current = false

        nullifyTimer()
        changeMode()
    }
    function changeMode() {
        isTimerDecrement.current = !isTimerDecrement.current

        const timerInterface = document.querySelector('.timer-interface')

        changeInterface(timerInterface)
    }
    function changeInterface(timerInterface) {
        timerInterface.classList.toggle('decrement')
    }

    return (
        <button 
            className="change-mode-btn"
            onClick={(event) => clickChangeModeBtn(event.target)}
            onDragStart={(event) => event.preventDefault()}         //Чтобы не перетаскивалась картинка внутри
            onKeyDown={(event) => event.preventDefault()}           /*Удаляем триггер на нажатие клавиш клавиатуры ранее нажатой кнопки, чтобы корректно работал window.onkeydown в ToggleTimerBtn.js*/>
                <div>
                    <img src={arrowIcon} alt='arrow'/>&nbsp;
                    {switchModeText}
                </div>
                <img className='mode-sign' src={isTimerDecrement.current ? plusIcon : minusIcon} alt='sign'/>
        </button>
    )
}

export {ChangeModeBtn}