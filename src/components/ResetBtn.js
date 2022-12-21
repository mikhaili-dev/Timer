import React, { useContext, useEffect } from "react"
import { timerContext } from "../context/timer.context"
import resetIcon from "../images/reset-icon.png"
import '../styles/reset-btn.css'

function ResetBtn() {
    const {hasCountBeenStarted, nullifyTimer, stopTimer} = useContext(timerContext)
    
    function clickResetBtnHandler() {
        hasCountBeenStarted.current = false

        stopTimer()
        nullifyTimer()
    }
    useEffect(() => {
        window.addEventListener('keydown', keydownHandler)

        return () => window.removeEventListener('keydown', keydownHandler)
        // eslint-disable-next-line
    }, [])
    function keydownHandler(event) {
        const keyCode = event.code

        if (keyCode === 'Escape') clickResetBtnHandler()
    }
    return (
        <button 
            className="reset-btn"
            onClick={clickResetBtnHandler}
            onDragStart={(event) => event.preventDefault()}         //Чтобы не перетаскивалась картинка внутри
            onKeyDown={(event) => event.preventDefault()}           /*Удаляем триггер на нажатие клавиш клавиатуры ранее нажатой кнопки, чтобы корректно работал window.onkeydown в ToggleTimerBtn.js*/>
            <img
                src={resetIcon}
                alt="00:00"
            />
        </button>
    )
}

export {ResetBtn}