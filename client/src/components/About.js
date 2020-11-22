import React from 'react';

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <h1>About Cocktail Book</h1>
                <p>Cocktail Book is an app that allows you to store your favorite cocktail recipes!</p>

                <h2>How to add a cocktail</h2>
                <ol>
                    <li>Register for an account (or log in if you have already registered.)</li>
                    <li>Select 'Add Drink' in the navigation bar.</li>
                    <li>Fill in the fields for you cocktail.</li>
                </ol>

                <h2>How to edit a cocktail</h2>
                <ol>
                    <li>On the main cocktail page find the cocktail you want to edit and select 'edit'.</li>
                </ol>

                <h2>How to  delete a cocktail</h2>
                <ol>
                    <li>On the main cocktail page find the cocktail you want to delete and select 'delete.'</li>
                </ol>

                <h2>How to delete your account</h2>
                <strong>THIS WILL PERMANENTLY DELETE YOUR ACCOUNT AND ALL YOUR ADDED COCKTAILS</strong>
                <ol>
                    <li>On the right of the navigation bar click where your username is displayed.</li>
                    <li>In the menu that appears click 'Delete Account'.</li>
                </ol>
            </>
        )
    }
}


export default LandingPage;