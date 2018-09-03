<?php
/*
Plugin Name: GT Layout Blocks
Plugin URI: https://germanthemes.dem/gt-layout-blocks/
Description: Page Building Blocks from germanThemes
Author: germanThemes
Author URI: https://germanthemes.de/
Version: 0.1
Text Domain: gt-layout-blocks
Domain Path: /languages/
License: GPL v3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

GT Layout Blocks
Copyright(C) 2018, germanthemes.de - support@germanthemes.de
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main GT_Layout_Blocks Class
 *
 * @package GT Layout Blocks
 */
class GT_Layout_Blocks {

	/**
	 * Call all Functions to setup the Plugin
	 *
	 * @uses GT_Layout_Blocks::constants() Setup the constants needed
	 * @uses GT_Layout_Blocks::includes() Include the required files
	 * @uses GT_Layout_Blocks::setup_actions() Setup the hooks and actions
	 * @return void
	 */
	static function setup() {

		// Setup Constants.
		self::constants();

		// Setup Translation.
		add_action( 'plugins_loaded', array( __CLASS__, 'translation' ) );

		// Setup Action Hooks.
		self::setup_actions();
	}

	/**
	 * Setup plugin constants
	 *
	 * @return void
	 */
	static function constants() {

		// Define Plugin Name.
		define( 'GTLB_NAME', 'GT Layout Blocks' );

		// Define Version Number.
		define( 'GTLB_VERSION', '0.1' );

		// Plugin Folder Path.
		define( 'GTLB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin Folder URL.
		define( 'GTLB_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

		// Plugin Root File.
		define( 'GTLB_PLUGIN_FILE', __FILE__ );
	}

	/**
	 * Load Translation File
	 *
	 * @return void
	 */
	static function translation() {

		load_plugin_textdomain( 'gt-layout-blocks', false, dirname( plugin_basename( GTLB_PLUGIN_FILE ) ) . '/languages/' );
	}

	/**
	 * Setup Action Hooks
	 *
	 * @see https://codex.wordpress.org/Function_Reference/add_action WordPress Codex
	 * @return void
	 */
	static function setup_actions() {

		// Enqueue Block Styles.
		add_action( 'enqueue_block_assets', array( __CLASS__, 'enqueue_block_scripts' ) );

		// Enqueue Block Scripts and Styles for Gutenberg Editor.
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_block_editor_scripts' ) );

		// Add custom image sizes.
		add_action( 'after_setup_theme', array( __CLASS__, 'add_image_sizes' ) );

		// Add block category.
		add_filter( 'block_categories', array( __CLASS__, 'block_categories' ), 10, 2 );
	}

	/**
	 * Enqueue Block Styles
	 *
	 * Used in Frontend and Backend
	 *
	 * @return void
	 */
	static function enqueue_block_scripts() {
		wp_enqueue_style( 'gt-layout-blocks', GTLB_PLUGIN_URL . 'assets/css/gt-layout-blocks.css', array( 'wp-blocks' ), GTLB_VERSION );
	}

	/**
	 * Enqueue Scripts and Styles for Blocks
	 *
	 * Used in Backend in Gutenberg Editor only
	 *
	 * @return void
	 */
	static function enqueue_block_editor_scripts() {
		wp_enqueue_script( 'gt-layout-blocks-editor', GTLB_PLUGIN_URL . 'assets/js/gt-layout-blocks-editor.js', array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		), GTLB_VERSION );

		wp_add_inline_script(
			'gt-layout-blocks-editor',
			sprintf( 'wp.data.dispatch( "gt-layout-blocks-store" ).setPluginURL( %s );', wp_json_encode( GTLB_PLUGIN_URL ) ),
			'after'
		);

		wp_enqueue_style( 'gt-layout-blocks-editor', GTLB_PLUGIN_URL . 'assets/css/gt-layout-blocks-editor.css', array( 'wp-edit-blocks' ), GTLB_VERSION );
	}

	/**
	 * Define custom image sizes
	 *
	 * @return void
	 */
	static function add_image_sizes() {

		#add_image_size( 'GT-square-400-x-400', 400, 400, true );
		add_image_size( 'GT-square-800-x-800', 800, 800, true );

		#add_image_size( 'GT-rectangular-400-x-300', 400, 300, true );
		add_image_size( 'GT-rectangular-800-x-600', 800, 600, true );

		#add_image_size( 'GT-landscape-480-x-270', 480, 270, true );
		add_image_size( 'GT-landscape-960-x-540', 960, 540, true );

		#add_image_size( 'GT-portrait-320-x-480', 320, 480, true );
		add_image_size( 'GT-portrait-640-x-600', 640, 960, true );
	}

	/**
	 * Define custom image sizes
	 *
	 * @return void
	 */
	static function block_categories( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'gt-layout-blocks',
					'title' => __( 'GT Layout Blocks', 'gt-layout-blocks' ),
				),
			)
		);
	}
}

// Run Plugin.
GT_Layout_Blocks::setup();