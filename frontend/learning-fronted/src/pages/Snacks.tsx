import { useState, useEffect } from 'react';
import {SnackList} from "../components/SnackList.tsx";



export const Snacks = () => {
    const [snacks, setSnacks] = useState<[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/snacks/all')
            .then(res => res.json())
            .then(data => setSnacks(data))
    }, []);

    return (
        <div>
            <SnackList snacks={snacks}/>
        </div>
    );
};

