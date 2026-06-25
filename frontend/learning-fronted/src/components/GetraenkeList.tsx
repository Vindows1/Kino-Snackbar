import '../resources/navbar.css'
import {Link} from "react-router-dom";
export interface Getraenk{
    Id: string;
    name: string;
    groeße: number;
    preis: number;
}
const imageMap: Record<string, string> = {
    '63609b8d-36f6-475b-aecc-1856278b80bc': "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_1280.png",
    '59533375-892f-4d9c-98ca-4998ec3d1092': "https://cdn.pixabay.com/photo/2023/08/12/02/43/soda-8184603_1280.png",
    '1f32b79c-04c3-4cca-b466-cfd8eeeedb47': "https://cdn.pixabay.com/photo/2014/03/25/23/15/beer-298268_1280.png",
    'e88529ba-5268-47d8-bd9f-0f9f3f4e47c8': "https://cdn.pixabay.com/photo/2019/05/18/12/58/water-4211792_1280.png"
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
                    <ul className={'nav-list'}>
                        <li className={'nav-item'}><Link className={'nav-link'} to={"/bestellungen/all"}>Bestellung</Link></li>
                        <li className={'nav-item'}><Link className={'nav-link'} to={'/snacks/all'}>Snacks</Link></li>
                        <li className={'nav-item'}><Link className={'nav-link'} to={'/getraenke/all'}>Getraenke</Link></li>
                    </ul>
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
