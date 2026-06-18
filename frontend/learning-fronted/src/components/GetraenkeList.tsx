export interface Getraenk{
    Id: number;
    name: string;
    groeße: number;
    preis: number;
}

export const GetraenkeList=(props: {getraenke: Getraenk[]})=>{
    return(
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2>Getrenke Auswahl</h2>
                {props.getraenke.map(getraenk=>(
                    <div
                        key={getraenk.Id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 80px 80px',
                            gap:'15px',
                            padding: '10px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <span>{getraenk.name}</span>
                        <span style={{ textAlign: 'right' }}>{getraenk.groeße}</span>
                        <span style={{ textAlign: 'right' }}>{getraenk.preis}€</span>
                    </div>
                    )
            )}
            </div>
    )
}