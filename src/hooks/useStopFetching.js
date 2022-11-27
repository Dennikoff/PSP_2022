import {useState} from "react";

export function useStopFetching(setIsLoading, callback) {
    const [error, setError] = useState('')

    const fetching = async (flag) => {
        try {
            await callback(flag)
        } catch(error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, error]
}