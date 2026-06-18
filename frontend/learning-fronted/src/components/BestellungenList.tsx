export interface SingleBestellung{
    Id: number;
    wunsch_G: String;
    wunsch_S: String;
    g_menge: number;
    s_menge: number;
    gesamtpreis: number;
}

export const BestellungenList=(props: {bestellung: SingleBestellung[]})=>{
    const gesamtSumme = props.bestellung.reduce((acc, curr) => acc + curr.gesamtpreis, 0);
    return (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2>Alle Bestellungen</h2>
                {props.bestellung.map(singlebestellung => (
                    <div key={singlebestellung.Id} style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 80px 1fr 80px 80px',
                        gap: '15px', padding: '10px', border: '1px solid #ccc'
                    }}>
                        <span>{singlebestellung.wunsch_G}</span>
                        <span>{singlebestellung.g_menge}</span>
                        <span>{singlebestellung.wunsch_S}</span>
                        <span>{singlebestellung.s_menge}</span>
                        <span style={{ textAlign: 'right' }}>{singlebestellung.gesamtpreis} €</span>
                    </div>
                ))}
            </div>

            <div style={{
                width: '200px',
                padding: '5px',
                border: '2px solid #333',
                borderRadius: '3px',
                position: 'sticky',
                top: '20px'
            }}>
                <h3>Warenkorb</h3>
                <p>Anzahl Bestellungen: <strong>{props.bestellung.length}</strong></p>
                <hr />
                <h2 style={{ color: 'red' }}>Gesamtsumme: {gesamtSumme.toFixed(2)} €</h2>
            </div>
        </div>
    );
}

