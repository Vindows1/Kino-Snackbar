export interface BestellPositionDTO {
    produktName: string;
    menge: number;
    preis: number;
}

export interface SingleBestellung {
    id: string;
    positionen: BestellPositionDTO[];
    gesamtpreis: number;
}

export const BestellungenList = (props: {bestellung: SingleBestellung[]}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2>Alle Bestellungen</h2>
            {props.bestellung.map(bestellung => (
                <div key={bestellung.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#fff' }}>
                    <h4>Bestellung: {bestellung.id.substring(0,8)}...</h4>

                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {bestellung.positionen.map((pos, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{pos.menge}x {pos.produktName}</span>
                                <span>{(pos.menge * pos.preis).toFixed(2)} €</span>
                            </li>
                        ))}
                    </ul>

                    <hr/>
                    <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        Summe: {bestellung.gesamtpreis.toFixed(2)} €
                    </div>
                </div>
            ))}
        </div>
    );
};