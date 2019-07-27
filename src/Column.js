import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cube from './Cube';

class Column extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cubeStyles: [ ...props.cubes.map(() => {
				return {
					transform: '',
					perspective: '',
				};
			})],
			landscape: props.landscape,
			styles: {},
		}
	};

    async componentDidMount() {
		if (this.props.mobile) window.addEventListener('resize', () => { this.animateIn(); });
        this.animateIn();
		//window.addEventListener('scroll', handleScroll);
	};

	animateIn = () => {
		const { styles } = this.state;
        const scale = this.getScale();
		const y = ((scale === 1.0) ? 0 : (scale * 2000));

		//await handleScroll();
        this.setState({ styles: { ...styles, transform: `scale(${scale},${scale}); translateY(-${((document.getElementById('wrapper').scrollTop / 3 - 60) / scale) - 200}px)`, opacity: 1 } })/*,
	() => this.setState({ styles: {...styles, opacity: 1 } })*/;
        /*$viewports.each(function(i) {
			$(this).trigger(`move-viewport-${i}`, {x: 0, y: 0});
		}).promise()
		.done(function() {
			$wrapper.style[transformProp] = `scale(${scale},${scale})`;
		}).promise()
		.done(function() {
			var heightDiff = parseInt($('.wrapper').eq(0).offset().top / scale);
			$wrapper.style[transformProp] += ` translateY(-${(heightDiff - 200)}px)`;
		}).promise()
		.done(function() {
			$cubes.each(function(i) {
				$(this).css({'opacity': '1'});
			});
		});*/
	};

	getScale = () => (((800 - window.width) > 0) ? ((100 - ((800 - window.width) / 10)) / 100) : 1.0) * ((this.props.mobile && this.state.landscape) ? 0.6 : 1.0);

    handleScroll = e => {
		console.log(e.target.offsetTop);
		const { cubes } = this.props;
		//const { cubeStyles } = this.state;
		/*let cubeStyles = { ...cubes.map((i) => {
			return {
				transform: `rotateX(-${((18 * (i + 1)) * 0.25)}deg) rotateY(${Math.min(0, e.target.srcElement.body.scrollTop / 3 - 60)}deg) translateY(${0}px)`,
				perspective: `${(((document.getElementById(`cube_${i}`).clientHeight * 2) * (i + 1)) * 1.50)}px`,
			};
		})};*/
            //transform: `rotateX(-${((18 * (id + 1)) * 0.25)}deg) rotateY(${Math.min(0, e.srcElement.body.scrollTop / 3 - 60)}deg) translateY(${x}px)`,
            //perspective: `${(((document.getElementById(`cube_${id}`).clientHeight * 2) * (id + 1)) * 1.50)}px`,
        //};
        //this.setState(cubeStyles);
    };

	render() {
		const { cubes } = this.props;
		const { cubeStyles, styles } = this.state;

		return (
			<div className="wrapper" id="wrapper" style={styles} onWheel = {(e) => this.handleScroll(e)}>
				{cubes.map((cube, i) => <Cube key={i} id={i} coords={{x: 0, y: 0}} data={cube} styles={cubeStyles[i]} />)}
			</div>
		)
	};
};

Column.propTypes = {
	cubes: PropTypes.array.isRequired,
	mobile: PropTypes.bool.isRequired,
	landscape: PropTypes.bool.isRequired,
};

export default Column;