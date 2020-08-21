import * as React from 'react';
import * as style from './style.css';

export const Cursor: React.FC = () => {
	const cursorRef: React.RefObject<HTMLSpanElement> = React.createRef();
	const dotRef: React.RefObject<HTMLSpanElement> = React.createRef();

	const updatePosition = (e: MouseEvent) => {
		const _cursor: HTMLSpanElement | null = cursorRef.current;
		const _dot: HTMLSpanElement | null = dotRef.current;
		
		if (_cursor && _dot) {
			// subtract to the width and height of the cursor element;
			_cursor.setAttribute('style', `top:${(e.pageY) - scrollY}px; left:${e.pageX}px;`);
			_dot.setAttribute('style', `top:${(e.pageY) - scrollY}px; left:${e.pageX}px;`);
		}
	};

	React.useEffect(() => {
		document.addEventListener('mousemove', updatePosition);
		return () => {
			// cleanup 
			document.removeEventListener('mousemove', updatePosition);
		};
	}, [cursorRef, dotRef]);

	return (
		<React.Fragment>
			<span ref={cursorRef} className={style.cursor}></span>
			<span ref={dotRef} className={style.dot}></span>
		</React.Fragment>
	);
};