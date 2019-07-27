import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Cube = ({
        id = 0,
        //coords = { x: 0, y: 0 },
        data = { project_id: '', sides: [] },
        styles = { transform: '', perspective: '', }
    }) => {
    //const [x, setX] = useState(coords.x);
    //const [y, setY] = useState(coords.y);
    //const [style, setStyle] = useState({});
    //const [transProp, setTransProp] = useState('transform');
    //const [persProp, setPersProp] = useState('perspective');
    const url = (process.env.PUBLIC_URL || 'http://localhost:3000/');

    /*assignRef = el => {
        this.container = el;
    };*/

    /*const handleEnter = e => {
        setStyle({ opacity: 1 });
    };*/

    /*const handleScroll = e => {
        const { id } = this.props;
        let style = {
            transform: `rotateX(-${((18 * (id + 1)) * 0.25)}deg) rotateY(${Math.min(0, e.srcElement.body.scrollTop / 3 - 60)}deg) translateY(${x}px)`,
            perspective: `${(((document.getElementById(`cube_${id}`).clientHeight * 2) * (id + 1)) * 1.50)}px`,
        };
        setStyle(style);
    };*/

    return (
		<article id={data.project_id} className={`viewport cube_${id}`} style={styles}>
			<section className="cube">
				<div></div>
                {
                data.sides.map((side, i) =>
                    <div key={i} className={side.videoUrl && 'video'}>
                        {
                        side.title &&
                            <h2 dangerouslySetInnerHTML={ {__html: side.title} } />
                        }
                        {
                        side.img &&
                            <img className={side.img.tall && 'tall'} src={side.img.src} alt={side.img.alt} title={side.img.alt} />
                        }
                        {
                        side.body &&
                            <div dangerouslySetInnerHTML={ {__html: side.body} } />
                        }
                        {
                        side.videoUrl &&
                            <iframe width="360" height="360" title={side.title} src={`${side.videoUrl}?controls=0&enablejsapi=1&fs=0&modestbranding=1&origin=${url}`} />
                        }
                    </div>
                )}
				<div>
					<small>If you can see this, I didn't test well enough for your device. If you're inspecting this element, then you must know what you're doing, and should hire me!</small>
				</div>
			</section>
		</article>
    );
}

Cube.propTypes = {
    id: PropTypes.number.isRequired,
    coords: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default Cube;