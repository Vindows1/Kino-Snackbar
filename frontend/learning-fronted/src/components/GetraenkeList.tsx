import '../resources/navbar.css'
export interface Getraenk{
    Id: number;
    name: string;
    groeße: number;
    preis: number;
}

export const GetraenkeList=(props: {getraenke: Getraenk[]})=>{
    return(
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <ul className={'nav-list'}>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/bestellungen/all'}>Bestellung</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/snacks/all'}>Snacks</a></li>
                    <li className={'nav-item'}><a className={'nav-link'} href={'http://localhost:5173/getraenke/all'}>Getraenke</a></li>
                </ul>
                <h2>Getraenke Auswahl</h2>
                {props.getraenke.map(getraenk => (
                        <div
                            key={getraenk.Id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: ' 1fr 80px 80px',
                                gap: '15px',
                                padding: '10px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <span>{getraenk.name}</span>
                            <span style={{textAlign: 'right'}}>{getraenk.groeße}l</span>
                            <span style={{textAlign: 'right'}}>{getraenk.preis}€</span>
                        </div>
                    )
                )}
            </div>
        </>
    )
}// { getraenk.Id === 1 &&(<img src={"https://upload.wikimedia.org/wikipedia/commons/2/23/Glass_of_Cola.jpg"} style={{width: '50px', height: '50px'}}/>)}
//{ getraenk.Id === 2 &&(<img src={"https://images.pexels.com/photos/33107433/pexels-photo-33107433.jpeg"} style={{width: '50px', height: '50px'}}/>)}
//{ getraenk.Id === 3 &&(<img src={"https://cdn.pixabay.com/photo/2014/03/25/23/15/beer-298268_1280.png"} style={{width: '50px', height: '50px'}}/>)}
//{ getraenk.Id === 4 &&(<img src={"https://cdn.pixabay.com/photo/2020/03/15/17/54/water-4934455_1280.jpg"} style={{width: '50px', height: '50px'}}/>)}
