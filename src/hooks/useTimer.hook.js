import {useState, useRef, useEffect} from "react";
function useTimer() {
    const [outerTimer, setOuterTimer] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    })
    const [isTimerPaused, setIsTimerPaused] = useState(true)
    const isTimerDecrement = useRef(false)
    const innerTimer = useRef(outerTimer)
    
    const hasCountBeenStarted = useRef(false)

    const timerId = useRef(null)

    useEffect(() => {
        innerTimer.current = outerTimer
    }, [outerTimer])

    function stopTimer() {
        clearInterval(timerId.current)

        timerId.current = null

        setIsTimerPaused(true)
    }

    function nullifyTimer() {
        setOuterTimer({
            seconds: '00',
            minutes: '00',
            hours: '00'
        })
    }

    return {
        outerTimer, setOuterTimer, 
        innerTimer, 
        hasCountBeenStarted,
        timerId, 
        isTimerPaused, setIsTimerPaused, 
        isTimerDecrement,
        stopTimer,
        nullifyTimer
    }
}
export {useTimer}