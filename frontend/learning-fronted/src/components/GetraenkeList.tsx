export interface Getraenk{
    Id: number;
    name: string;
    groeße: number;
    preis: number;
}

export const GetraenkeList=(props: {getraenke: Getraenk[]})=>{
    return(
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2>Getraenke Auswahl</h2>
                {props.getraenke.map(getraenk=>(
                    <div
                        key={getraenk.Id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '50px 1fr 80px 80px',
                            gap:'15px',
                            padding: '10px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <img src={"https://upload.wikimedia.org/wikipedia/commons/2/23/Glass_of_Cola.jpg"} style={{width:'50px', height:'50px'}}/>
                        <span>{getraenk.name}</span>
                        <span style={{ textAlign: 'right' }}>{getraenk.groeße}</span>
                        <span style={{ textAlign: 'right' }}>{getraenk.preis}€</span>
                    </div>
                    )
            )}
            </div>
    )
}