/**
 * External dependencies
 */
import classnames from 'classnames';
const { getComputedStyle } = window;

/**
 * WordPress dependencies
 */
const {
	Component,
	Fragment,
} = wp.element;

const {
	__,
} = wp.i18n;

const { compose, withInstanceId } = wp.compose;
const { withSelect } = wp.data;

const {
	BlockAlignmentToolbar,
	BlockControls,
	ContrastChecker,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
	withColors,
} = wp.editor;

const {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	withFallbackStyles,
} = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Block Edit Component
 */
class BackgroundEdit extends Component {
	constructor() {
		super( ...arguments );

		this.onSelectImage = this.onSelectImage.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
	}

	componentDidUpdate() {
		const {
			attributes,
			setAttributes,
			wideControlsEnabled,
		} = this.props;

		// Set block alignment to default if theme does not support wide and full width blocks.
		if ( ! wideControlsEnabled && 'default' !== attributes.blockAlignment ) {
			setAttributes( { blockAlignment: 'default' } );
		}
	}

	onSelectImage( img ) {
		this.props.setAttributes( {
			backgroundImageId: img.id,
			backgroundImageUrl: img.url,
		} );
	}

	onRemoveImage() {
		this.props.setAttributes( {
			backgroundImageId: undefined,
			backgroundImageUrl: undefined,
		} );
	}

	render() {
		const {
			attributes,
			children,
			backgroundColor,
			setBackgroundColor,
			fallbackBackgroundColor,
			textColor,
			setTextColor,
			fallbackTextColor,
			setAttributes,
			instanceId,
			className,
			wideControlsEnabled,
		} = this.props;

		const {
			blockAlignment,
			contentWidth,
			padding,
			backgroundImageId,
			backgroundImageUrl,
			imageOpacity,
			backgroundPosition,
			fixedBackground,
		} = attributes;

		const blockId = `gt-container-block-${ instanceId }`;

		const blockClasses = classnames( className, 'gt-background-section', {
			[ `gt-${ padding }-padding` ]: 'none' !== padding,
			'has-text-color': textColor.color,
			[ textColor.class ]: textColor.class,
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
			'gt-has-background-image': backgroundImageId,
			'gt-fixed-background': fixedBackground,
		} );

		const blockStyles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			backgroundImage: backgroundImageId ? `url(${ backgroundImageUrl })` : undefined,
			backgroundPosition: 'center center' !== backgroundPosition ? backgroundPosition : undefined,
		};

		const overlayClasses = classnames( 'gt-background-overlay', {
			'has-background': backgroundColor.color,
			[ backgroundColor.class ]: backgroundColor.class,
		} );

		const overlayStyles = {
			backgroundColor: backgroundColor.color ? backgroundColor.color : '#ffffff',
			opacity: ( 100 - imageOpacity ) / 100,
		};

		const contentClasses = classnames( 'gt-section-content', {
			[ `gt-${ contentWidth }-width` ]: 'default' !== blockAlignment,
		} );

		const dataBackgroundImage = backgroundImageId ? backgroundImageUrl : undefined;

		const ALIGNMENT_CONTROLS = {
			default: {
				icon: 'align-center',
				title: __( 'Default width' ),
			},
			wide: {
				icon: 'align-wide',
				title: __( 'Wide width' ),
			},
			full: {
				icon: 'align-full-width',
				title: __( 'Full width' ),
			},
		};

		return (
			<Fragment>

				<BlockControls>

					{ wideControlsEnabled && (
						<BlockAlignmentToolbar
							value={ blockAlignment }
							onChange={ ( newAlign ) => setAttributes( { blockAlignment: newAlign ? newAlign : 'default' } ) }
							controls={ [ 'wide', 'full' ] }
						/>
					) }

				</BlockControls>

				<InspectorControls>

					<PanelBody title={ __( 'Section Settings' ) } initialOpen={ false } className="gt-section-settings-panel gt-panel">

						{ wideControlsEnabled && (
							<BaseControl id="gt-block-alignment" label={ __( 'Block Alignment' ) }>
								<Toolbar
									controls={
										Object.keys( ALIGNMENT_CONTROLS ).map( ( control ) => ( {
											...ALIGNMENT_CONTROLS[ control ],
											isActive: blockAlignment === control,
											onClick: () => setAttributes( { blockAlignment: control } ),
										} ) )
									}
								/>
							</BaseControl>
						) }

						{ ( wideControlsEnabled && ( 'full' === blockAlignment || 'wide' === blockAlignment ) ) && (

							<SelectControl
								label={ __( 'Content Width' ) }
								value={ contentWidth }
								onChange={ ( newWidth ) => setAttributes( { contentWidth: newWidth } ) }
								options={ [
									{ value: 'narrow', label: __( 'Narrow width' ) },
									{ value: 'default', label: __( 'Default width' ) },
									{ value: 'wide', label: __( 'Wide width' ) },
									{ value: 'full', label: __( 'Full width' ) },
								] }
							/>

						) }

						<SelectControl
							label={ __( 'Padding' ) }
							value={ padding }
							onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
							options={ [
								{ value: 'none', label: __( 'None' ) },
								{ value: 'normal', label: __( 'Normal' ) },
								{ value: 'large', label: __( 'Large' ) },
							] }
						/>

					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>

						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackTextColor,
								fallbackBackgroundColor,
							} }
						/>
					</PanelColorSettings>

					<PanelBody title={ __( 'Background Image' ) } initialOpen={ false } className="gt-background-image-panel gt-panel">

						<div className="gt-background-image">

							{ ! backgroundImageId ? (

								<MediaUpload
									title={ __( 'Set background image' ) }
									onSelect={ this.onSelectImage }
									type="image"
									render={ ( { open } ) => (
										<Button onClick={ open } className="gt-set-image">
											{ __( 'Set background image' ) }
										</Button>
									) }
								/>

							) : (

								<Fragment>

									<MediaUpload
										title={ __( 'Set background image' ) }
										onSelect={ this.onSelectImage }
										type="image"
										value={ backgroundImageId }
										render={ ( { open } ) => (
											<Button onClick={ open } className="gt-image-button">
												<img
													src={ backgroundImageUrl }
													alt={ __( 'Background image' ) }
												/>
											</Button>
										) }
									/>

									<div className="gt-image-controls">

										<MediaUpload
											title={ __( 'Set background image' ) }
											onSelect={ this.onSelectImage }
											type="image"
											value={ backgroundImageId }
											render={ ( { open } ) => (
												<Button onClick={ open } isDefault isLarge className="gt-replace-image">
													{ __( 'Replace image' ) }
												</Button>
											) }
										/>

										<Button onClick={ this.onRemoveImage } isLink isDestructive>
											{ __( 'Remove image' ) }
										</Button>

									</div>

								</Fragment>

							) }

						</div>

						{ backgroundImageId && (

							<Fragment>

								<RangeControl
									label={ __( 'Image Opacity' ) }
									value={ imageOpacity }
									onChange={ ( newOpacity ) => setAttributes( { imageOpacity: newOpacity } ) }
									min={ 0 }
									max={ 100 }
								/>

								<SelectControl
									label={ __( 'Background Position' ) }
									value={ backgroundPosition }
									onChange={ ( newPosition ) => setAttributes( { backgroundPosition: newPosition } ) }
									options={ [
										{ value: 'left top', label: __( 'Left Top' ) },
										{ value: 'left center', label: __( 'Left Center' ) },
										{ value: 'left bottom', label: __( 'Left Bottom' ) },
										{ value: 'center top', label: __( 'Center Top' ) },
										{ value: 'center center', label: __( 'Center Center' ) },
										{ value: 'center bottom', label: __( 'Center Bottom' ) },
										{ value: 'right top', label: __( 'Right Top' ) },
										{ value: 'right center', label: __( 'Right Center' ) },
										{ value: 'right bottom', label: __( 'Right Bottom' ) },
									] }
								/>

								<ToggleControl
									label={ __( 'Fixed Background' ) }
									checked={ !! fixedBackground }
									onChange={ () => setAttributes( { fixedBackground: ! fixedBackground } ) }
								/>

							</Fragment>

						) }

					</PanelBody>

				</InspectorControls>

				<div id={ blockId } className={ blockClasses } style={ blockStyles } data-background-image={ dataBackgroundImage }>

					{ backgroundImageId && (
						<div className={ overlayClasses } style={ overlayStyles }></div>
					) }

					<div className={ contentClasses }>

						{ children }

					</div>

				</div>

			</Fragment>
		);
	}
}

export default compose(
	withInstanceId,
	withSelect(
		( select ) => ( {
			wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
		} )
	),
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFallbackStyles( ( node, ownProps ) => {
		const { textColor, backgroundColor } = ownProps.attributes;
		const editableNode = node.querySelector( '[contenteditable="true"]' );
		//verify if editableNode is available, before using getComputedStyle.
		const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
		return {
			fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
			fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		};
	} ),
)( BackgroundEdit );
