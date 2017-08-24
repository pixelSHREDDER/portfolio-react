import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import projectData from './data/projects.json';

function Cube(props) {
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
			<object width="360" height="360">
				<param name="movie" value={`${side.videoUrl}?fs=1&amp;hl=en_GB&amp;rel=0&amp;iv_load_policy=3&amp;start=4&amp;modestbranding=1&amp;showinfo=0`}></param>
				<param name="allowFullScreen" value="true"></param>
				<param name="allowscriptaccess" value="always"></param>
				<embed src={`${side.videoUrl}?fs=1&amp;hl=en_GB&amp;rel=0&amp;iv_load_policy=3&amp;start=4&amp;modestbranding=1&amp;showinfo=0;`} type="application/x-shockwave-flash" allowFullScreen="true" width="360" height="360"></embed>
			</object>
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
			currentColumn: 'dv'
		};
		this.updateColumn = this.updateColumn.bind(this);
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
					<li>
						<a href="/">Home</a>
					</li>
					<br />
					<li>
						<a className={this.state.currentColumn === 'ds' && 'active'} onClick={() => this.updateColumn('ds')}><span role="presentation">Ds</span>Design</a>
					</li>
					<li>
						<a className={this.state.currentColumn === 'dv' && 'active'} onClick={() => this.updateColumn('dv')}><span role="presentation">Dv</span>Develop</a>
					</li>
					<li>
						<a className={this.state.currentColumn === 'cr' && 'active'} onClick={() => this.updateColumn('cr')}><span role="presentation">Cr</span>Create</a>
					</li>
				</ul>
			</nav>
		);
	}

	render() {
		const column = this.loadColumn();
		const navs = this.loadNavs();
		return (
			<div>
				{column}
				<CSSTransitionGroup
					transitionName="navs"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{navs}
				</CSSTransitionGroup>
			</div>
		);
	}
}

export default App;
