import '../resources/navbar.css'
export interface Snack{
    Id: number;
    name: string;
    preis: number;
}

export const SnackList=(props: {snacks: Snack[]})=>{
    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <ul className={'nav-list'}>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/bestellungen/all'}>Bestellung</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/snacks/all'}>Snacks</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/getraenke/all'}>Getraenke</a></li>
                </ul>
                <h2>Snack Auswahl</h2>
                {props.snacks.map(snack => (
                        <div
                            key={snack.Id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '12px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <span>{snack.name}</span>
                            <span>{snack.preis}€</span>
                        </div>
                    )
                )}
            </div>
        </>
    )
}