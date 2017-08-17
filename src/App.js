import React, { Component } from 'react';
//import logo from './logo.svg';
import projectData from './data/projects.json';
//import './App.css';

function Cube(props) {
	const sides = props.sides.map((side, i) =>
		<div key={i} className="{side.videoUrl ? 'video'}">
		{side.title &&
			<h2>{side.title}</h2>
		}
		{side.img &&
			<img src="{side.img.src}" alt="{side.img.alt}" title="{side.img.alt}" />
		}
		{side.body &&
			<p>{side.body}</p>
		}
		</div>
	)
	return (
		<article id="cube.project.project_id" className="viewport">
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
			projects: projectData
		};
	}

	loadColumn(column) {
		return (
			<Column cubes={this.state.projects.categories[column]} />
		);
	}

	render() {
	const column = this.loadColumn('dv');
		return (
			<div>
				{column}
			</div>
		);
	}
}

export default App;
