interface Props {
    setPage: ((page: string) => void),
}

function Meny(props: Props) {
    return ( 
        <div className="header">
            <button className='button' onClick={() => props.setPage("start")}>Start</button>
            <button className='button' onClick={() => props.setPage("statistics")}>Statistik</button>
        </div>
     );
}

export default Meny;