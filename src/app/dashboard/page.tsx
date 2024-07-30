'use client';

import {signOut} from "next-auth/react";

const DashboardPage = () => {
    return (
        <>
            <h1>DashboardPage</h1>
            <button onClick={() => signOut}>
                Logout
            </button>
        </>
    );
};

export default DashboardPage
