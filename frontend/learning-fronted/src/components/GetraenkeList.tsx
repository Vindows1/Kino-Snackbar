import '../resources/navbar.css'
export interface Getraenk{
    Id: number;
    name: string;
    groeße: number;
    preis: number;
}
const imageMap: Record<number, string> = {
    1: "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
    2: "https://cdn.pixabay.com/photo/2023/08/12/02/43/soda-8184603_1280.png",
    3: "https://cdn.pixabay.com/photo/2014/03/25/23/15/beer-298268_1280.png",
    4: "https://cdn.pixabay.com/photo/2019/05/18/12/58/water-4211792_1280.png"
};


export const GetraenkeList=(props: {getraenke: Getraenk[]})=>{

    const korrigierteGetraenke = props.getraenke.map(g => ({
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
                <h2>Getraenke Auswahl</h2>
                {korrigierteGetraenke.map(getraenk => (
                        <div
                            key={getraenk.Id}
                            style={{display: 'grid',
                                gridTemplateColumns: '50px 1fr 80px 80px',
                                gap: '15px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                alignItems: 'center'
                            }}
                        >
                            {imageMap[getraenk.Id] ? (
                                <img
                                    src={imageMap[getraenk.Id]}
                                    alt={getraenk.name}
                                    style={{width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px'}}
                                />
                            ) : (
                                <div style={{width: '50px', height: '50px'}} />
                            )}
                            <span>{getraenk.name}</span>
                            <span style={{textAlign: 'right'}}>{getraenk.groeße}l</span>
                            <span style={{textAlign: 'right'}}>{getraenk.preis}€</span>
                        </div>
                    )
                )}
            </div>
        </>
    )
}
