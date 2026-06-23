import '../resources/navbar.css'
export interface Snack{
    Id: string;
    name: string;
    preis: number;
}
const imageMap: Record<string, string> = {
    '38ee733d-c1ce-4d95-b2c6-e8ae7e550f63': "https://cdn.pixabay.com/photo/2013/07/13/01/21/popcorn-155602_1280.png",
    'c0d511e9-0328-4182-b458-bcead57f8fdb': "https://cdn.pixabay.com/photo/2013/07/13/01/21/popcorn-155602_1280.png",
    'e1b3e412-1c7e-431d-9b47-16626248c77b': "https://cdn.pixabay.com/photo/2023/07/27/04/20/nachos-8152413_1280.png",
    '97e9082d-a1a6-43c7-a256-db8cd3a2c4c7': "https://cdn.pixabay.com/photo/2022/04/07/17/15/potato-chips-7118004_1280.png"
};
export const SnackList=(props: {snacks: Snack[]})=>{
    const korrigierteSnacks = props.snacks.map(g => ({
        ...g,
        Id: (g as any).id
    }));
    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <ul className={'nav-list'}>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/bestellungen/all'}>Bestellung</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/snacks/all'}>Snacks</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/getraenke/all'}>Getraenke</a></li>
                </ul>
                <h2>Snack Auswahl</h2>
                {korrigierteSnacks.map(snack => (
                        <div
                            key={snack.Id}
                            style={{display: 'grid',
                                gridTemplateColumns: '50px 1fr 80px',
                                gap: '15px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                alignItems: 'center'
                            }}
                        >
                            {imageMap[snack.Id] ? (
                                <img
                                    src={imageMap[snack.Id]}
                                    alt={snack.name}
                                    style={{width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px'}}
                                />
                            ) : (
                                <div style={{width: '50px', height: '50px'}} />
                            )}
                            <span>{snack.name}</span>
                            <span>{snack.preis}€</span>
                        </div>
                    )
                )}
            </div>
        </>
    )
}