export interface SingleBestellung{
    Id: number;
    wunsch_G: String;
    wunsch_S: String;
    g_menge: number;
    s_menge: number;
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
                        <span>{singlebestellung.wunsch_G}</span>
                        <span style={{ textAlign: 'left'}} >{singlebestellung.g_menge}</span>
                        <span>{singlebestellung.wunsch_S}</span>
                        <span style={{ textAlign: 'left'}} >{singlebestellung.s_menge}</span>
                        <span style={{ textAlign: 'right'}}>{singlebestellung.gesamtpreis} €</span>

                    </div>
                )
            )}
        </div>
    )
}

