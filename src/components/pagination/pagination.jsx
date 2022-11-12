import React from 'react';
import {getPagesArray} from "../../utils/getPages";
import './pagination.css'

const Pagination = ({setPage, page, totalPages}) => {
    const pagesArray = getPagesArray(totalPages)
    return (
        <div className="page__wrapper"> {/*TODO: make pagination looks more beautiful*/}
            {pagesArray.map(p=>
                <span
                    onClick={() => setPage(p)}
                    key={p}
                    className={page === p ? 'page page__current': 'page'}
                >{p}</span>
            )}
        </div>
    );
};

export default Pagination;