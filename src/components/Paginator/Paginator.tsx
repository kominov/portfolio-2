import React from 'react'
import styles from './Paginator.module.css'
import { OffsettConst, PageSize } from './../../constans';
import classNames from 'classnames'
import { RowsQuery, RowsResult } from '../../hooks/useLargeTable'
interface PagiProps {
    result: RowsResult
    onChange: (query: RowsQuery) => void
}

export const Paginator: React.FC<PagiProps> = ({ onChange, result }) => {

    const { totalRows, limit, offset, rows } = result;
    let totalPages = Math.ceil(totalRows / limit);
    let currentPage = Math.floor(offset / limit + 1);


    return (<>
        <div className={styles.pagination}>
            <div className={styles.paginationWrapper}>
                {currentPage !== 1 && (
                    <button
                        onClick={() => onChange({ limit: PageSize, offset: offset - OffsettConst })}
                        type="button"
                        className={classNames([styles.pageItem, styles.sides].join(' '))}
                    >
                        &lt;
                    </button>
                )}
                <button
                    onClick={() => onChange({ limit: PageSize, offset: 0 })}
                    type="button"
                    className={classNames(styles.pageItem, {
                        [styles.active]: currentPage === 1,
                    })}
                >
                    {1}
                </button>
                {currentPage > 3 && <div className={styles.separator}>...</div>}
                {currentPage === totalPages && totalPages > 3 && (
                    <button
                        onClick={() => onChange({ limit: PageSize, offset: offset - (2 * OffsettConst) })}
                        type="button"
                        className={styles.pageItem}
                    >
                        {currentPage - 2}
                    </button>
                )}
                {currentPage > 2 && (
                    <button
                        onClick={() => onChange({ limit: PageSize, offset: offset - OffsettConst })}
                        type="button"
                        className={styles.pageItem}
                    >
                        {currentPage - 1}
                    </button>
                )}
                {currentPage !== 1 && currentPage !== totalPages && (
                    <button
                        onClick={() => onChange({limit: PageSize, offset:offset})}
                        type="button"
                        className={[styles.pageItem, styles.active].join(' ')}
                    >
                        {currentPage}
                    </button>
                )}
                {currentPage < totalPages - 1 && (
                    <button
                        onClick={() => onChange({ limit: PageSize, offset: offset + OffsettConst })}
                        type="button"
                        className={styles.pageItem}
                    >
                        {currentPage + 1}
                    </button>
                )}
                {currentPage === 1 && totalPages > 3 && (
                    <button
                        onClick={() => onChange({ limit: PageSize, offset: offset + (2 * OffsettConst) })}
                        type="button"
                        className={styles.pageItem}
                    >
                        {currentPage + 2}
                    </button>
                )}
                {currentPage < totalPages - 2 && <div className={styles.separator}>...</div>}
                <button
                    onClick={() => onChange({ limit: PageSize, offset: (totalRows -1) })}
                    type="button"
                    className={classNames(styles.pageItem, {
                        [styles.active]: currentPage === totalPages,
                    })}
                >
                    {totalPages}
                </button>
                {currentPage !== totalPages && (
                    <button
                        onClick={() => onChange({limit:PageSize, offset: (offset+OffsettConst) })}
                        type="button"
                        className={[styles.pageItem, styles.sides].join(' ')}
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    </>)
}