/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { getColorClassName, InnerBlocks } = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';

class BackgroundSection extends Component {
	render() {
		const {
			attributes,
			children,
			className,
		} = this.props;

		const {
			blockAlignment,
			contentWidth,
			textColor,
			backgroundColor,
			customTextColor,
			customBackgroundColor,
			backgroundImageId,
			backgroundImageUrl,
			imageOpacity,
			backgroundPosition,
			fixedBackground,
		} = attributes;

		const textColorClass = getColorClassName( 'color', textColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const blockClasses = classnames( className, 'gt-background-section', {
			[ `align${ blockAlignment }` ]: ( blockAlignment !== 'center' ),
			'has-text-color': textColor || customTextColor,
			[ textColorClass ]: textColorClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
			'gt-has-background-image': backgroundImageId,
			'gt-fixed-background': fixedBackground,
		} );

		const blockStyles = {
			color: textColorClass ? undefined : customTextColor,
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			backgroundImage: backgroundImageId ? `url(${ backgroundImageUrl })` : undefined,
			backgroundPosition: backgroundPosition,
		};

		const overlayClasses = classnames( 'gt-background-overlay', {
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const overlayColor = customBackgroundColor ? customBackgroundColor : '#ffffff';

		const overlayStyles = {
			backgroundColor: backgroundClass ? undefined : overlayColor,
			opacity: ( 100 - imageOpacity ) / 100,
		};

		const contentStyles = {
			maxWidth: contentWidth + 'px',
		};

		const dataBackgroundImage = backgroundImageId ? backgroundImageUrl : undefined;

		return (
			<div className={ blockClasses ? blockClasses : undefined } style={ blockStyles } data-background-image={ dataBackgroundImage }>

				{ backgroundImageId && (
					<div className={ overlayClasses } style={ overlayStyles }></div>
				) }

				<div className="gt-inner-content" style={ contentStyles }>

					{ children }

				</div>

			</div>
		);
	}
}

export default BackgroundSection;