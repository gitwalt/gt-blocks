/**
 * WordPress dependencies
 */
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { BaseControl, Button, Dashicon, PanelBody } = wp.components;
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { dispatch, select } = wp.data;
const {
	cloneBlock,
	createBlock,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';

// Define supported blocks.
const supportedBlocks = [
	'gt-layout-blocks/portfolio',
	'gt-layout-blocks/features',
];

const insertIntoSection = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Return early if block does not support insertIntoSection plugin.
		if ( ! supportedBlocks.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		// Get Block functions.
		const {
			getBlocksByClientId,
			getBlockRootClientId,
		} = select( 'core/editor' );

		const {
			replaceBlock,
		} = dispatch( 'core/editor' );

		// Get current block.
		const { clientId } = props;

		// Get parent block.
		const rootClientId = getBlockRootClientId( clientId );

		// Return if block is already a child block.
		if ( rootClientId ) {
			return <BlockEdit { ...props } />;
		}

		// Wrap with Section function.
		const createSection = () => {
			// Get current block.
			const block = getBlocksByClientId( clientId )[ 0 ];

			// Clone block and wrap into section block.
			const clonedBlock = cloneBlock( block );
			const sectionBlock = createBlock( 'gt-layout-blocks/section', {}, [ clonedBlock ] );

			// Replace block.
			replaceBlock( clientId, sectionBlock );
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>

					<PanelBody title={ __( 'Section Settings', 'gt-layout-blocks' ) } initialOpen={ false } className="gt-panel-section-insert gt-panel">
						<BaseControl
							id="gt-section-control"
							label={ __( 'Insert into Section', 'gt-layout-blocks' ) }
							help={ __( 'Insert this block into a section block.', 'gt-layout-blocks' ) }
						>
							<Button
								key="add-section"
								isLarge
								onClick={ createSection }
							>
								<Dashicon icon="insert" />
								{ __( 'Add GT Section block', 'gt-layout-blocks' ) }
							</Button>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'insertIntoSection' );
addFilter( 'editor.BlockEdit', 'gt-layout-blocks/plugins/section-insert', insertIntoSection );

