import { useState, useEffect } from 'react';
import {BestellungenList} from "../components/BestellungenList.tsx";
import { BestellungForm } from "../components/BestellungForm.tsx";


export const Bestellung = () => {
    const [bestellung, setBestellung] = useState<any[]>([]);

    const ladeBestellungen = () => {
        fetch('http://localhost:8080/bestellungen/all')
            .then(res => res.json())
            .then(data => setBestellung(data));
    };

    useEffect(() => {
        ladeBestellungen();
    }, []);
    return (
        <div>
            <BestellungForm onBestellungCreated={ladeBestellungen} />
            <BestellungenList bestellung={bestellung}/>
        </div>
    );
};

