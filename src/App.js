import React, { Component } from 'react';
import projectData from './data/projects.json';
import SocialMediaIcons from 'react-social-media-icons';

function Cube(props) {
	const url = (process.env.PUBLIC_URL || 'http://localhost:3000/');
	const sides = props.sides.map((side, i) =>
		<div key={i} className={side.videoUrl && 'video'}>
		{side.title &&

					<h2 dangerouslySetInnerHTML={ {__html: side.title} } />
		}
		{side.img &&
			<img className={side.img.tall && 'tall'} src={side.img.src} alt={side.img.alt} title={side.img.alt} />
		}
		{side.body &&
			<div dangerouslySetInnerHTML={ {__html: side.body} } />
		}
		{side.videoUrl &&
			<iframe width="360" height="360" title={side.title} src={`${side.videoUrl}?controls=0&enablejsapi=1&fs=0&modestbranding=1&origin=${url}`} />
		}
		</div>
	)
	return (
		<article id={props.project_id} className="viewport">
			<section className="cube">
				<div></div>
				{sides}
				<div>
					<small>If you can see this, I didn't test well enough for your device. If you're inspecting this element, then you must know what you're doing, and should hire me!</small>
				</div>
			</section>
		</article>
	)
}

function Column(props) {
	return (
		<div className="wrapper">
			{props.cubes.map((cube, i) => <Cube key={i} {...cube} />)}
		</div>
	)
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			projects: projectData,
			currentColumn: 'dv',
			socialMediaIconsLeft: [
				{
				  url: 'https://www.facebook.com/Mike.O.DeVine',
				  className: 'fa-facebook-square',
				},
				{
					url: 'https://twitter.com/pixelSHREDDER',
					className: 'fa-twitter-square',
				},
			],
			socialMediaIconsRight: [
				{
				  url: 'https://github.com/pixelSHREDDER',
				  className: 'fa-github-square',
				},
				{
				  url: 'https://www.linkedin.com/in/pixelshredder/',
				  className: 'fa-linkedin',
				},
			],
		};
		this.updateColumn = this.updateColumn.bind(this);
	}

	loadHeader() {
		return (
			<header>
				<div>
					<div role="presentation">
						<SocialMediaIcons
							icons={this.state.socialMediaIconsLeft}
							iconSize={'1.3em'}
							iconColor={'#fff'}
						/>
					</div>
					<div role="presentation">
						<h1>Mike DeVine's Online Portfolio</h1>
						<h2>Click or touch to scroll & rotate!</h2>
					</div>
					<div role="presentation">
						<SocialMediaIcons
							icons={this.state.socialMediaIconsRight}
							iconSize={'1.3em'}
							iconColor={'#fff'}
						/>
					</div>
				</div>
			</header>
		);
	}

	updateColumn(column) {
		this.setState(prevState => ({
			currentColumn: column
		}));
	}

	loadColumn() {
		return (
			<Column cubes={this.state.projects.categories[this.state.currentColumn]} />
		);
	}

	loadNavs() {
		return (
			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<br />
					<li><button className={(this.state.currentColumn === 'ds' && 'active').toString()} onClick={() => this.updateColumn('ds')}><span role="presentation">Ds</span>Design</button></li>
					<li><button className={(this.state.currentColumn === 'dv' && 'active').toString()} onClick={() => this.updateColumn('dv')}><span role="presentation">Dv</span>Develop</button></li>
					<li><button className={(this.state.currentColumn === 'cr' && 'active').toString()} onClick={() => this.updateColumn('cr')}><span role="presentation">Cr</span>Create</button></li>
				</ul>
			</nav>
		);
	}

	render() {
		const header = this.loadHeader();
		const column = this.loadColumn();
		const navs = this.loadNavs();

		return (
			<div>
				{header}
				{column}
				{navs}
			</div>
		);
	}
}

export default App;
