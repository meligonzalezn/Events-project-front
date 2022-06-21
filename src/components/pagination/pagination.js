
export const Pagination = ({eventsPerPage, totalEvents}) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalEvents / eventsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log("monda", Math.ceil(totalEvents / eventsPerPage));
    return(
        <nav>
            <ul>
              {pageNumbers.map( number => {
                <li key={number}> 
                    <a href="!#">{number}</a>
                 </li>
              })}
            </ul>
        </nav>
    )
}