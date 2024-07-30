import {getServerSession} from "next-auth";
import {authOptions} from "@/utils";

export const Navbar = async () => {
   const session = await getServerSession(authOptions);
    console.log({session})
    return (
        <header>
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderBottom: '1px solid #333',
            }}>
                <h1>Navbar</h1>
                {
                    !session?.user ? (
                        <ul
                            style={{
                                display: 'flex',
                                gap: '1rem',
                            }}
                        >
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
                           {/* <li>
                                <a href="/auth/login">Login</a>
                            </li>
                            <li>
                                <a href="/auth/register">Register</a>
                            </li>*/}
                        </ul>
                    ) : (
                        <ul
                            style={{
                                display: 'flex',
                                gap: '1rem',
                            }}
                        >
                            <li>
                                <a href="/api/auth/signout">Sign Out</a>
                            </li>
                        </ul>
                    )
                }
            </nav>
        </header>
    );
};
