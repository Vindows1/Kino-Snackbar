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
                <label>Getränk: </label>
                <select value={getraenkeId} onChange={e => setGetraenkId(Number(e.target.value))}>
                    <option value={1}>Cola</option>
                    <option value={2}>Fanta</option>
                    <option value={3}>Bier</option>
                    <option value={4}>Stilles Wasser</option>
                </select>
            </div>
            <div>
                <label>Menge: </label>
                <input type="number" value={gMenge} min={0} onChange={e => setGMenge(Number(e.target.value))} />
            </div>
            <div>
                <label>Snack: </label>
                <select value={snackId} onChange={e => setSnackId(Number(e.target.value))}>
                    <option value={1}>gesaltzenes Popcorn</option>
                    <option value={2}>sueßes Popcorn</option>
                    <option value={3}>Nachos mit Soße</option>
                    <option value={4}>Chips</option>
                </select>
            </div>
            <div>
                <label>Menge: </label>
                <input type="number" min={0} value={sMenge} onChange={e => setSMenge(Number(e.target.value))} />
            </div>
            <button type="submit">Bestellen</button>
        </form>
    );
};