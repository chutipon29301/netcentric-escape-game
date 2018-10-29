import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import React from 'react';
import latex from '@/libraries/latex';

/* 3 choices of Katex parsing 1. Manual, 2. react-katex 3. react-tex*/
export class LatexStuff extends React.PureComponent {
	render() {
		const html = latex`This is $2x + 1$. And this will be broken $ 2x + 5 $`;
		let string2 = '\\text{ภาษาไทย } 3x+1 = 99';
		return (
			<React.Fragment>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<InlineMath>{string2}</InlineMath>
				<BlockMath>\int_0^\infty x^2 dx</BlockMath>
			</React.Fragment>
		);
	}
}
