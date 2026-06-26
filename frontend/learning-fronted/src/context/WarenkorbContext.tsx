import { createContext, useContext, useState, type ReactNode } from 'react';

export interface WarenkorbItem {
    produktId: string;
    name: string;
    typ: "GETRAENK" | "SNACK";
    menge: number;
}

interface WarenkorbContextType {
    warenkorb: WarenkorbItem[];
    zumWarenkorbHinzufuegen: (produkt: any, typ: "GETRAENK" | "SNACK") => void;
    warenkorbLeeren: () => void;
}

const WarenkorbContext = createContext<WarenkorbContextType | undefined>(undefined);

export const WarenkorbProvider = ({ children }: { children: ReactNode }) => {
    const [warenkorb, setWarenkorb] = useState<WarenkorbItem[]>([]);

    const zumWarenkorbHinzufuegen = (produkt: any, typ: "GETRAENK" | "SNACK") => {
        const sichereId = produkt.publicId || produkt.id || produkt.Id;

        if (!sichereId) {
            console.error("Fehler: Das Produkt hat keine ID!", produkt);
            alert("Fehler: Produkt kann nicht hinzugefügt werden.");
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

    const warenkorbLeeren = () => setWarenkorb([]);

    return (
        <WarenkorbContext.Provider value={{ warenkorb, zumWarenkorbHinzufuegen, warenkorbLeeren }}>
            {children}
        </WarenkorbContext.Provider>
    );
};

export const useWarenkorb = () => {
    const context = useContext(WarenkorbContext);
    if (!context) {
        throw new Error("useWarenkorb muss innerhalb eines WarenkorbProviders verwendet werden");
    }
    return context;
};