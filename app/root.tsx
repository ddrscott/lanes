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
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
