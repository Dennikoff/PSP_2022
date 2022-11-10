import {useMemo} from "react";

export const getPagesArray = (totalPages) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => {
        let arr = []
        for (let i = 0; i < totalPages; i++) {
            arr.push(i + 1);
        }
        return arr
    }, [totalPages])
}