import { useState, useEffect } from 'react';
import {BestellungenList} from "../components/BestellungenList.tsx";
import { BestellungForm } from "../components/BestellungForm.tsx";


export const Bestellung = () => {
    const [bestellung, setBestellung] = useState<[]>([]);

    const ladeBestellungen = () => {
        fetch('http://localhost:8080/bestellungen/all')
            .then(res => res.json())
            .then(data => setBestellung(data));
    };

    useEffect(() => {
        ladeBestellungen();
    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <BestellungForm onBestellungCreated={ladeBestellungen} />

            <hr />
            <BestellungenList bestellung={bestellung}/>
        </div>
    );
};

