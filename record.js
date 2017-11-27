/**
 * Dependencies
 */

const request = require( 'superagent' );
const path = require( 'path' );
const { noop } = require( 'lodash' );
const getConfig = require( './config' );
const setup = require( './setup' );

/**
 * Returns true if the date string is in the valid YYYY-MM-DD format.
 *
 * @param  {String}  date Date input
 * @return {Boolean}      Whether date is valid format
 */
const isValidDate = ( date ) => /^\d{4}-\d{2}-\d{2}$/.test( date );

/**
 * Attempts to record a done task to the configured site, or runs set-up if
 * first run.
 *
 * @param  {String}  text    Done task
 * @param  {Object}  options Optional object of options
 * @return {Promise}         Promise resolving when done request completes
 */
function record( text, options = {} ) {
	const { onRequestStart = noop, date } = options;

	return getConfig().catch( () => {
		// Inability to read account configuration indicates first-run
		return setup().then( () => record( text ) );
	} ).then( ( config ) => {
		// Generate URL to which task is to be recorded
		const { siteUrl, apiRoot = 'wp-json', username, password } = config;
		const url = siteUrl + path.join( '/', apiRoot, 'dones/v1/dones' ).slice( 1 );

		// Allow client behavior in response to request starting
		onRequestStart();

		// Construct payload with text and date, if specified
		const payload = { text };
		if ( isValidDate( date ) ) {
			payload.date = date;
		}

		return request
			.post( url )
			.auth( username, password )
			.send( payload )
			.catch( ( error ) => {
				// Handle common error types with next-step advice
				switch ( error.status ) {
					case 401:
						throw new Error(
							'Unable to connect to Dones API. ' +
							'Ensure you have an external authentication plugin installed.\n\n' +
							'See: https://github.com/aduth/dones/wiki/Tip:-Recording-Dones-by-HTTP-Request\n\n' +
							'Or your username and password combination may be incorrect.\n\n' +
							'Reconfigure by running `dones --setup`'
						);

					default:
						throw error;
				}
			} );
	} );
}

module.exports = record;
