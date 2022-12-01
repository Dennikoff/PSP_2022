import {useState} from "react";

export function useFetchingWithTimeout(callback) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (flag) => {
        try {
            setIsLoading(true)
            await callback(flag)
        } catch(error) {
            setError(error)
        } finally {
        }
    }

    return [fetching, isLoading, setIsLoading, error]
}