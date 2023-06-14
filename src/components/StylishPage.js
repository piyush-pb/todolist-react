import React from 'react';
import './StylishPage.css';

const StylishPage = () => {
    return (
        <>
            <header>
                <h1>My Stylish Webpage</h1>
            </header>
            <nav>
                <ul><li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <main>

                <section class="hero">
                    <h2>Welcome to My Webpage</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
                    <button>Learn More</button>
                </section>
                <section class="features">
                    <div class="feature">
                        <h3>Feature 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 3</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2023 My Stylish Webpage. All rights reserved.</p>
            </footer>
        </>
    );
};

export default StylishPage;
