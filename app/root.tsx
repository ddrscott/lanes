import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import styles from "./tailwind.css";
import { Link } from "@remix-run/react";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
];

export default function App() {
    return <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title>iLanes</title>
            <link rel="canonical" href="https://ilanes.vercel.app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <Meta />
            <Links />
            <link rel="icon" href="data:image/x-icon;base64,AA" />
        </head>
        <body>
            <Outlet />
            <Scripts />
            <LiveReload />
        </body>
    </html>
}
