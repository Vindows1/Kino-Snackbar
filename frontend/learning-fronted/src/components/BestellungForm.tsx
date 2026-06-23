import { useState, useEffect } from 'react';

export const BestellungForm = ({ onBestellungCreated }: { onBestellungCreated: () => void }) => {
    const [getraenke, setGetraenke] = useState<any[]>([]);
    const [snacks, setSnacks] = useState<any[]>([]);

    const [warenkorb, setWarenkorb] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/getraenke/all').then(res => res.json()).then(setGetraenke).catch(err => console.error(err));
        fetch('http://localhost:8080/snacks/all').then(res => res.json()).then(setSnacks).catch(err => console.error(err));
    }, []);

    const zumWarenkorbHinzufuegen = (produkt: any, typ: "GETRAENK" | "SNACK") => {
        // HIER IST DER FIX: Wir prüfen auf publicId ODER id
        const sichereId = produkt.publicId || produkt.id;

        if (!sichereId) {
            console.error("Fehler: Das Produkt hat keine ID!", produkt);
            alert("Fehler: Produkt kann nicht hinzugefügt werden, da die ID fehlt.");
            return;
        }

        setWarenkorb((vorherigerWarenkorb) => {
            const existiertBereits = vorherigerWarenkorb.find(item => item.produktId === sichereId);

            if (existiertBereits) {
                return vorherigerWarenkorb.map(item =>
                    item.produktId === sichereId ? { ...item, menge: item.menge + 1 } : item
                );
            } else {
                return [
                    ...vorherigerWarenkorb,
                    { produktId: sichereId, name: produkt.name, typ: typ, menge: 1 }
                ];
            }
        });
    };

    const bestellen = async () => {
        if (warenkorb.length === 0) {
            alert("Dein Warenkorb ist leer!");
            return;
        }

        const bestellDaten = {
            positionen: warenkorb.map(item => ({
                produktId: item.produktId,
                typ: item.typ,
                menge: item.menge
            }))
        };

        try {
            const response = await fetch("http://localhost:8080/bestellungen/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bestellDaten)
            });

            if (response.ok) {
                alert("Bestellung erfolgreich abgesendet!");
                setWarenkorb([]);

                onBestellungCreated();
            } else {
                alert("Fehler beim Absenden der Bestellung.");
            }
        } catch (error) {
            console.error("Netzwerkfehler:", error);
        }
    };

    return (
        <>
            <ul className={'nav-list'}>
                <li className={'nav-item'}><a className={'nav-link'}
                                              href={'http://localhost:5173/bestellungen/all'}>Bestellung</a></li>
                <li className={'nav-item'}><a className={'nav-link'}
                                              href={'http://localhost:5173/snacks/all'}>Snacks</a></li>
                <li className={'nav-item'}><a className={'nav-link'}
                                              href={'http://localhost:5173/getraenke/all'}>Getraenke</a></li>
            </ul>
            <div style={{
                display: "flex",
                gap: "10px",
                marginBottom: "15px",
                padding: "7.5px",
                border: "1px solid #ddd",
                position: 'sticky'
            }}>
                <div style={{ flex: 1 }}>
                    <h2>Getränke</h2>
                    {getraenke.map(g => {
                        const sichereId = g.publicId || g.id;
                        return (
                            <div key={sichereId} style={{ margin: "5px 0" }}>
                                {g.name} ({g.preis}€) <button onClick={() => zumWarenkorbHinzufuegen(g, "GETRAENK")}>+</button>
                            </div>
                        );
                    })}

                    <h2>Snacks</h2>
                    {snacks.map(s => {
                        const sichereId = s.publicId || s.id;
                        return (
                            <div key={sichereId} style={{ margin: "5px 0" }}>
                                {s.name} ({s.preis}€) <button onClick={() => zumWarenkorbHinzufuegen(s, "SNACK")}>+</button>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    flex: 1,
                    background: "#f9f9f9",
                    padding: "5px",
                    borderRadius: "2.5px",
                    alignItems: 'flex-end',
                    position:'sticky'
                }}>
                    <h3>Aktueller Warenkorb</h3>
                    {warenkorb.length === 0 ? <p>Leer</p> : (
                        <ul>
                            {warenkorb.map((item, i) => (
                                <li key={i}>{item.menge}x {item.name} ({item.typ})</li>
                            ))}
                        </ul>
                    )}
                    <button onClick={bestellen} disabled={warenkorb.length === 0} style={{ color: 'black'}}>
                        Kostenpflichtig Bestellen
                    </button>
                </div>
            </div>
        </>
    )
};