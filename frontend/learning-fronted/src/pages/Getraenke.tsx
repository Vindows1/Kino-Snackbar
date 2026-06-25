import { useState, useEffect } from 'react';
import {GetraenkeList} from "../components/GetraenkeList.tsx";



export const Getraenke = () => {
    const [getraenke, setGetraenke] = useState<[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/getraenke/all', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setGetraenke(data))
    }, []);

    return (
        <div>
            <GetraenkeList getraenke={getraenke}/>
        </div>
    );
};

