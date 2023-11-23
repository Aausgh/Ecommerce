

const Pagination = ({ pageCount, handlePageChange, itemOffset, itemsPerPage }: any) => {
    return (
        <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" onClick={() => handlePageChange(0)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {[...Array(pageCount).keys()].map((index) => (
                    <li key={index} className={`page-item ${index === itemOffset / itemsPerPage ? 'active' : ''}`}>
                        <a className="page-link" onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" onClick={() => handlePageChange(pageCount - 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;