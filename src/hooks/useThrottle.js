import { useEffect, useState, useRef } from "react";

export const useThrottled = (value, delay) => {

    const [Throttledvalue, setThrittledvalue] = useState(value);
    const lastExecuted = useRef(Date.now());
    useEffect(() => {
        const handler = setTimeout(() => {
            const now = Date.now();
            const timeElapsed = now - lastExecuted.current;
            if (timeElapsed >= delay) {
                setThrittledvalue(value);
                lastExecuted.current = now;
                console.log(`Throtlled update ${value} at ${new Date().toLocaleTimeString()}`);
            }
        }, delay - (Date.now() - lastExecuted.current));



        return () => {

            clearTimeout(handler);

        }
    }, [delay, value])


    return Throttledvalue;



}
export default useThrottled;