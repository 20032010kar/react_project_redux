import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay:number = 300):T{
    const [delayValue, setDelayValue] = useState<T>(value);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDelayValue(value);
        }, delay);

        return ()=>clearTimeout(timer);
    }, [value, delay])

    return delayValue;
}

export default useDebounce;