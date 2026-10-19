import { useEffect, useState } from "react";

function useLocalStorage<T>(key:string, initialValue:T){
    const [storedValue, setStoredValue] = useState(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item? JSON.parse(item) as T :initialValue;
        } catch (error) {
            return initialValue;
        }
    })

    useEffect(()=>{
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Error while creating new item in local storage: ", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;