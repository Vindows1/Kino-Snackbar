export interface SingleBestellung{
    Id: number;
    Wunsch_G: String;
    Wunsch_S: String;
    G_menge: number;
    S_menge: number;
    gesamtpreis: number;
}

export const BestellungenList=(props: {bestellung: SingleBestellung[]})=>{
    return(
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>Bestellungen</h2>
            {props.bestellung.map(singlebestellung=>(
                    <div
                        key={singlebestellung.Id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 80px 1fr 80px 80px',
                            gap:'15px',
                            padding: '10px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <span>{singlebestellung.Wunsch_G}</span>
                        <span style={{ textAlign: 'left'}} >{singlebestellung.G_menge}</span>
                        <span>{singlebestellung.Wunsch_S}</span>
                        <span style={{ textAlign: 'left'}} >{singlebestellung.S_menge}</span>
                        <span style={{ textAlign: 'right'}}>{singlebestellung.gesamtpreis} €</span>

                    </div>
                )
            )}
        </div>
    )
}