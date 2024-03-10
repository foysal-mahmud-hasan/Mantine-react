import React from 'react';
import { HeaderSimple } from '../HeaderSimple'; // Adjust paths as needed
import { DoubleNavbar } from '../DoubleNavbar';
import { FooterCentered } from '../FooterCentered';
// Import additional components or styles as needed
import './LandingPage.module.css'



const LandingPage = () => {
    // Add your landing page content here

    return (
        <>
            {/* <HeaderSimple />
            <DoubleNavbar /> */}
            <main className="landing-content" >
                {/* Your landing page content goes here */}
                <section>
                    {/* Hero section */}
                    <h1>Hello World! , Welcome to my Matine app!</h1>
                    <p>This is the landing page . please press the buttons on the navbar to navigate</p>
                </section>
                <section>
                    {/* Additional sections as needed */}
                    <h2>List of functionalities</h2>
                    <p>1. Used Mantine AppShell <br />
                        2. Used React router dom to navigate <br />
                        3. Used validation on form .
                    </p>
                </section>

            </main>
            {/* <FooterCentered /> */}
        </>
    );
};

export default LandingPage;
