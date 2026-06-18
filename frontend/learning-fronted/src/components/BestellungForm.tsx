import { useState } from 'react';

interface BestellungFormProps {
    onBestellungCreated: () => void;
}

// @ts-ignore
export const BestellungForm = ({ onBestellungCreated }: BestellungFormProps) => {
    const [getraenkeId, setGetraenkId] = useState(1);
    const [snackId, setSnackId] = useState(1);
    const [gMenge, setGMenge] = useState(1);
    const [sMenge, setSMenge] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const neueBestellung = {
            G_menge: gMenge,
            S_menge: sMenge,
            getraenk: { id: getraenkeId },
            snack: { id: snackId }
        };

        fetch('http://localhost:8080/bestellungen/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(neueBestellung),
        })
            .then(res => {
                if (res.ok) {
                    alert('Bestellung erfolgreich abgeschickt!');
                    onBestellungCreated();
                } else {
                    alert('Fehler beim Bestellen');
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px', alignItems: 'flex-end' }}>
            <div>
                <label>Getraenk-ID: </label>
                <input type="number" value={getraenkeId}  min={1} max={4} onChange={e => setGetraenkId(Number(e.target.value))} />
            </div>
            <div>
                <label>Menge G: </label>
                <input type="number" value={gMenge} min={0} onChange={e => setGMenge(Number(e.target.value))} />
            </div>
            <div>
                <label>Snack-ID: </label>
                <input type="number" value={snackId} min={1} max={4} onChange={e => setSnackId(Number(e.target.value))} />
            </div>
            <div>
                <label>Menge S: </label>
                <input type="number" min={0} value={sMenge} onChange={e => setSMenge(Number(e.target.value))} />
            </div>
            <button type="submit">Bestellen</button>
        </form>
    );
};