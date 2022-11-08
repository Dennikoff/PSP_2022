import {useState} from "react";

export function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch(error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}