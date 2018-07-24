/**
 * External dependencies
 */
import { times } from 'lodash';

/**
 * Import Child Block
 */
import './service-item';

/**
 * Block dependencies
 */
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    InnerBlocks,
} = wp.editor;

/**
 * InnerBlock Settings
 */
const ALLOWED_BLOCKS = [ 'german-themes-blocks/service-item' ];
const TEMPLATE = [
    [ 'german-themes-blocks/service-item', { text: 'Enter your service' } ],
    [ 'german-themes-blocks/service-item', { text: 'Enter your service' } ]
];

/**
 * Register block
 */
registerBlockType(
    'german-themes-blocks/services',
    {
        title: __( 'GT Services' ),

        description: __( 'Add a description here' ),

        category: 'layout',

        icon: {
            background: '#7e70af',
            src: 'carrot',
        },

        keywords: [
            __( 'German Themes' ),
            __( 'Services' ),
            __( 'Text' ),
        ],

        attributes: {
            text: {
                type: 'array',
                source: 'children',
                selector: '.block-text',
            },
        },

        edit( { attributes, setAttributes, isSelected, className } ) {

            return (
                <div className={ className }>

                    <InnerBlocks
                        template={ TEMPLATE }
                        allowedBlocks={ ALLOWED_BLOCKS }
                    />

                </div>
            );
        },

        save( { attributes } ) {

            return (
                <div>
                    <InnerBlocks.Content />
                </div>
            );
        },
    },
);
