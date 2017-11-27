/**
 * Dependencies
 */

const inquirer = require( 'inquirer' );
const url = require( 'url' );
const fs = require( 'mz/fs' );
const path = require( 'path' );
const urlParse = require( 'url-parse-lax' );
const keytar = require( 'keytar' );
const { negate, isError, attempt, isEmpty } = require( 'lodash' );
const { KEYCHAIN_NAME } = require( './constant' );

/**
 * Returns true if the passed argument is not empty.
 *
 * @type {Boolean} Whether argument is non-empty
 */
const isNotEmpty = negate( isEmpty );

/**
 * Returns true if the passed argument is a valid lax URL.
 *
 * @param  {String}  input URL to test
 * @return {Boolean}       Whether URL is valid lax
 */
const isLaxUrl = ( input ) => ! isError( attempt( () => urlParse( input ) ) );

/**
 * Setup prompts.
 *
 * @type {Array}
 */
const QUESTIONS = [
	{
		name: 'siteUrl',
		message: 'Enter the URL to your Dones website:',
		validate: isLaxUrl,
	},
	{
		name: 'username',
		message: 'Enter the username under which dones should be created:',
		validate: isNotEmpty,
	},
	{
		name: 'password',
		type: 'password',
		message: 'Enter the password for the user:',
		validate: isNotEmpty,
	},
];

/**
 * Given a config object, saves the credentials to system keychain.
 *
 * @param  {Object} config Raw prompt results
 * @return {Promise}       Promise resolving when credentials saved
 */
function setPassword( config ) {
	return keytar.setPassword(
		KEYCHAIN_NAME,
		config.username,
		config.password
	).catch( ( error ) => {
		console.error( 'Failed to save password to credentials store.' );
		console.log( error );
	} );
}

/**
 * Given a config object, saves the credentials to system keychain.
 *
 * @param  {Object} config Raw prompt results
 * @return {Promise}       Promise resolving when credentials saved
 */
function writeConfig( config ) {
	const account = {
		siteUrl: url.format( urlParse( config.siteUrl, { https: false } ) ),
		username: config.username,
	};

	return fs.writeFile(
		path.join( __dirname, 'account.json' ),
		JSON.stringify( account )
	).catch( ( error ) => {
		console.error( 'Failed to write account configuration file.' );
		console.log( error );
	} );
}

/**
 * Prompts the user for Dones instance configuration values, saving credentials
 * and writing account configuration file.
 *
 * @return {Promise} Promise resolving when setup completes
 */
function setup() {
	return inquirer.prompt( QUESTIONS ).then( ( config ) => Promise.all( [
		setPassword( config ),
		writeConfig( config ),
	] ) );
}

module.exports = setup;
