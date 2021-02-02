import React from 'react';
import SocialMediaIcons from 'react-social-media-icons';

const Header = () => {
    const icons = {
        left: [{
                url: 'https://www.facebook.com/Mike.O.DeVine',
                className: 'fa-facebook-square',
            },{
                url: 'https://twitter.com/pixelSHREDDER',
                className: 'fa-twitter-square',
        }],
        right: [{
                url: 'https://github.com/pixelSHREDDER',
                className: 'fa-github-square',
            },{
                url: 'https://www.linkedin.com/in/pixelshredder/',
                className: 'fa-linkedin',
        }],
    };

    return (
        <header>
            <div>
                <div role="presentation">
                    <SocialMediaIcons
                        icons={icons.left}
                        iconSize={'1.3em'}
                        iconColor={'#fff'}
                    />
                </div>
                <div role="presentation">
                    <h1>Mike DeVine's Online Portfolio</h1>
                    <h2>Drag to scroll & rotate!</h2>
                </div>
                <div role="presentation">
                    <SocialMediaIcons
                        icons={icons.right}
                        iconSize={'1.3em'}
                        iconColor={'#fff'}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;