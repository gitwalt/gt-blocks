/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';

/**
 * Register block
 */
registerBlockType(
	'gt-layout-blocks/image',
	{
		title: __( 'GT Image' ),

		description: __( 'Insert a single image.' ),

		category: 'gt-layout-blocks',

		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path fill="#010101" d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z" /></svg>,

		parent: [ 'gt-layout-blocks/column' ],

		attributes: {
			id: {
				type: 'number',
			},
			url: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
			alt: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'alt',
				default: '',
			},
			size: {
				type: 'string',
				default: 'full',
			},
			href: {
				type: 'string',
				source: 'attribute',
				selector: 'figure > a',
				attribute: 'href',
			},
			linkDestination: {
				type: 'string',
				default: 'none',
			},
		},

		edit,

		save( { attributes } ) {
			const {
				id,
				url,
				alt,
				href,
			} = attributes;

			const image = (
				<img
					src={ url }
					alt={ alt }
					className={ id ? `wp-image-${ id }` : null }
				/>
			);

			const figure = (
				<Fragment>
					{ href ? <a href={ href }>{ image }</a> : image }
				</Fragment>
			);

			return (
				<figure>
					{ figure }
				</figure>
			);
		},
	},
);
