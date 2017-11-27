#!/usr/bin/env node

/**
 * Dependencies
 */

const program = require( 'commander' );
const ora = require( 'ora' );
const record = require( './record' );
const setup = require( './setup' );

program
	.option( '--setup', 'Configure Dones site and account details' )
	.option( '--goal', 'Track task as a goal' )
	.option( '--date <date>', 'Assign done task to a specific date (YYYY-MM-DD)' )
	.arguments( '<task>', 'Text of the task to record' )
	.parse( process.argv );

program.on( '--help', () => {
	console.log(
		'\n' +
		'  Examples:\n\n' +
		'    $ dones "Completed #projectx"\n'
	);
} );

if ( program.setup ) {
	setup();
} else {
	// Verify valid text
	const text = program.args.join( ' ' );
	if ( ! text ) {
		program.outputHelp();
		process.exit( 0 );
	}

	// Display spinner while saving
	const spinner = ora();

	record( text, {
		date: program.date,
		goal: program.goal,
		onRequestStart: () => spinner.start(),
	} )
		.then( () => console.log( 'Saved.' ) )
		.catch( ( error ) => {
			console.error( 'An error occurred while saving.\n\n' + error.toString() );
		} )
		.then( () => spinner.stop() );
}
