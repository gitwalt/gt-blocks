/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	getColorClassName,
	getFontSizeClass,
} = wp.editor;

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
	'gt-layout-blocks/heading',
	{
		title: __( 'GT Heading' ),

		description: __( 'Add a description here' ),

		category: 'gt-layout-blocks',

		icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path fill="#010101" d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z" /></svg>,

		keywords: [
			__( 'German Themes' ),
			__( 'Heading' ),
			__( 'Title' ),
		],

		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: '.gt-title',
			},
			titleTag: {
				type: 'number',
				default: 2,
			},
			placeholder: {
				type: 'string',
			},
			blockAlignment: {
				type: 'string',
				default: 'center',
			},
			textAlignment: {
				type: 'string',
			},
			headingWidth: {
				type: 'string',
				default: 'full',
			},
			paddingTop: {
				type: 'number',
			},
			paddingBottom: {
				type: 'number',
			},
			paddingLeft: {
				type: 'number',
			},
			paddingRight: {
				type: 'number',
			},
			fontStyle: {
				type: 'string',
				default: 'bold',
			},
			uppercase: {
				type: 'boolean',
				default: false,
			},
			textColor: {
				type: 'string',
			},
			backgroundColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			fontSize: {
				type: 'string',
			},
			customFontSize: {
				type: 'number',
			},
			border: {
				type: 'string',
				default: 'none',
			},
			borderWidth: {
				type: 'number',
				default: 4,
			},
		},

		getEditWrapperProps( attributes ) {
			const { blockAlignment } = attributes;
			if ( 'wide' === blockAlignment || 'full' === blockAlignment ) {
				return { 'data-align': blockAlignment };
			}
		},

		edit,

		save( { attributes } ) {
			const {
				title,
				titleTag,
				blockAlignment,
				textAlignment,
				headingWidth,
				paddingTop,
				paddingBottom,
				paddingLeft,
				paddingRight,
				fontStyle,
				uppercase,
				textColor,
				backgroundColor,
				customTextColor,
				customBackgroundColor,
				fontSize,
				customFontSize,
				border,
				borderWidth,
			} = attributes;

			const textColorClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const fontSizeClass = getFontSizeClass( fontSize );

			const blockClasses = classnames( {
				[ `align${ blockAlignment }` ]: 'center' !== blockAlignment,
			} );

			const blockStyles = {
				textAlign: textAlignment,
			};

			const headingClasses = classnames( 'gt-title', {
				'gt-is-bold': 'bold' === fontStyle || 'bold-italic' === fontStyle,
				'gt-is-italic': 'italic' === fontStyle || 'bold-italic' === fontStyle,
				'gt-is-uppercase': uppercase,
				'has-background': backgroundColor || customBackgroundColor,
				[ textColorClass ]: textColorClass,
				[ backgroundClass ]: backgroundClass,
				[ fontSizeClass ]: fontSizeClass,
				[ `gt-border-${ border }` ]: 'none' !== border,
			} );

			const headingStyles = {
				display: 'auto' === headingWidth ? 'inline-block' : undefined,
				paddingTop: paddingTop !== 0 ? paddingTop + 'px' : undefined,
				paddingBottom: paddingBottom !== 0 ? paddingBottom + 'px' : undefined,
				paddingLeft: paddingLeft !== 0 ? paddingLeft + 'px' : undefined,
				paddingRight: paddingRight !== 0 ? paddingRight + 'px' : undefined,
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textColorClass ? undefined : customTextColor,
				fontSize: fontSizeClass ? undefined : customFontSize,
				borderWidth: borderWidth !== 4 ? borderWidth + 'px' : undefined,
			};

			return (
				<div className={ blockClasses ? blockClasses : undefined } style={ blockStyles }>
					<RichText.Content
						tagName={ 'h' + titleTag }
						className={ headingClasses }
						style={ headingStyles }
						value={ title }
					/>
				</div>
			);
		},
	},
);
