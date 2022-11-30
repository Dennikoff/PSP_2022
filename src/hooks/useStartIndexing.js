import {useState} from "react";

export function useStartIndexing(callback) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async (flag) => {
        try {
            setIsLoading(true)
            await callback(flag)
        } catch(error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, setIsLoading, error]
}