import {useState} from "react";

export function useStopFetching(setIsLoading, callback) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const fetching = async (flag) => {
        try {
            setLoading(true)
            await callback(flag)
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
            setIsLoading(false)
        }
    }

    return [fetching, loading, error]
}