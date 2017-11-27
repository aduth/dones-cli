/**
 * Dependencies
 */

const keytar = require( 'keytar' );
const { KEYCHAIN_NAME } = require( './constant' );

/**
 * Retrieves the current account configuration. May throw an error if no
 * account details have been configured.
 *
 * @return {Promise} Promise resolving when account configuration is retrieved
 */
function getConfig() {
	let account;
	try {
		account = require( './account.json' );
	} catch ( error ) {
		return Promise.reject();
	}

	return keytar.getPassword( KEYCHAIN_NAME, account.username )
		.then( ( password ) => Object.assign( {}, account, { password } ) )
		.catch( ( error ) => {
			console.error( 'Failed to retrieve password from credentials store.' );
			console.log( error );
		} );
}

module.exports = getConfig;
