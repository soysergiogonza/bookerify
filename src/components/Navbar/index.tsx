import {getServerSession} from "next-auth";
import {authOptions} from "@/utils";
import Link from "next/link";

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
                <Link href="/" style={{
                    color: '#FFF',
                    textDecoration: 'none',
                }}>
                    <h1>
                        Bookerify
                    </h1>
                </Link>
                {
                    !session?.user ? (
                        <ul
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                listStyle: 'none',
                                color: '#FFF',
                            }}
                        >
                            <li>
                                <a href="/" style={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}>Home</a>
                            </li>
                            <li>
                                <a href="/dashboard"  style={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}>Dashboard</a>
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
                                listStyle: 'none',
                                color: '#FFF',
                            }}
                        >
                            <li>
                                <a href="/api/auth/signout"  style={{
                                    color: '#FFF',
                                    textDecoration: 'none',
                                }}>Sign Out</a>
                            </li>
                        </ul>
                    )
                }
            </nav>
        </header>
    );
};
