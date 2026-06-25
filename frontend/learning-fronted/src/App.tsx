import { useState } from 'react';
import { BestellungForm } from './components/BestellungForm';
import {Getraenke} from './pages/Getraenke.tsx'
import {Snacks} from './pages/Snacks.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Bestellung} from "./pages/Bestellung.tsx";

export const App = () => {
    // 1. Zustandsverwaltung (State) für den Login
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = createBrowserRouter([

        //path: '/test',
        //element: <Test/>
        {
            path: '/getraenke/all',
            element: <Getraenke/>
        },
        {
            path: '/snacks/all',
            element: <Snacks/>
        },
        {
            path: '/bestellungen/all',
            element: <Bestellung/>
        },
        {
            path:'/',
            element: <BestellungForm onBestellungCreated={() => console.log("Bestellung aktualisiert!")} />}
    ]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setError("Login fehlgeschlagen. Bitte überprüfe deine Daten.");
            }
        } catch (err) {
            setError("Fehler: Konnte keine Verbindung zum Server herstellen.");
        }
    };

 /*   const handleBestellungErfolgreich = () => {
        console.log("Die Bestellung wurde an Spring Boot übergeben!");
    };*/


    if (!isLoggedIn) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
                <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px", width: "300px" }}>
                    <h2 style={{ textAlign: "center" }}>Kino-Shop Login</h2>

                    {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

                    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="text"
                            placeholder="Benutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ padding: "8px" }}
                        />
                        <input
                            type="password"
                            placeholder="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: "8px" }}
                        />
                        <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
                            Einloggen
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                <h1>Kino Snack-Shop</h1>
                <div>
                    <span style={{ marginRight: "15px" }}>Hallo, <strong>{username}</strong>!</span>
                    <button onClick={() => setIsLoggedIn(false)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                        Ausloggen
                    </button>
                </div>
            </div>

            <RouterProvider router={router}/>
´
        </div>
    );
};
export default App
