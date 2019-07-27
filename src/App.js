import React, { Component } from 'react';
import Header from './Header';
import Column from './Column';
import Navs from './Navs';
import projectData from './data/projects.json';

class App extends Component {
	state = {
		currentColumn: 'dv',
		landscape: false,
		mobile: false,
	};

    async componentDidMount() {
		const mobile = this.isMobile();
		if (mobile) {
			this.setOrientation();
			window.addEventListener('orientationchange', this.setOrientation());
            window.addEventListener('resize', () => { this.setOrientation(); })
		};
		this.setState({ mobile });
	};

	isMobile = () => (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
    // just use doc.ontouchmove if needed
    //const hasTouch = () => document.ontouchmove;

    setOrientation = () => this.setState({ landscape: (window.matchMedia('(orientation: portrait)').matches) ? false : true });

    //browserSupport = a => a.filter(i => { return i in this.container.style })[0];
		/*for (var i = 0, l = a.length; i < l; i++) {
			if (typeof el.style[a[i]] !== 'undefined') {
				return a[i];
			}
		}*/
    //};

	render() {
		const { currentColumn, landscape, mobile } = this.state;

		return (
			<div className={landscape ? 'landscape_mode' : 'portrait_mode'}>
				<Header />
				<Column mobile={mobile} landscape={landscape} cubes={projectData.categories[currentColumn]} />
				<Navs col={currentColumn} update={(col) => this.setState({currentColumn: col})} />
			</div>
		);
	}
}

export default App;
