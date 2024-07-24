<?php
/**
 * Roundcube Plugin Happiness Index
 * Plugin to add button a happiness index to the Compose function.
 *
 * @version 1.0.0
 * @author Chris Wray <chris_wray2001@yahoo.co.uk>
 * @copyright Copyright (c) 2024, Chris Wray
 * @link https://github.com/Chris-Wray1/roundcube_happiness_index
 * @license GNU General Public License, version 3
 */

class happiness_index extends rcube_plugin
{
	private $url;
	public $task = 'mail';
	private $rcube;

	function init()
	{
		$this->add_hook('message_before_send', array($this, 'happiness_header'));

		$this->rcube = rcube::get_instance();

		if ($this->rcube->task === 'mail' && $this->rcube->action === 'compose') {
			$this->load_config();

			// Set Menu options as Enviromental Variable so that JS can work with them
			$this->rcube->output->set_env('happinessmenu_options', $this->define_menu_options());
			$this->rcube->output->set_env('happinessmenu', true);

			$this->include_stylesheet($this->local_skin_path() . '/happiness_index.css');
			$this->include_script($this->local_skin_path() . '/functions.js');
		}

	}


/**
 * This is a function that specifies the available menu options and their values
 * Should you need to change the options - that can be done here
 * 
 * Format - Label => value
 * Underscores (_) will be converted to spaces
 * 
 * In time this could (maybe should?) be converted into a config file... Text file of options? Or JSON object?
 * Then imported, sanitised and built into an array in this function
 */
	private function define_menu_options()
	{
		return [
			'Very_Happy' => 1,
			'Happy' => 2,
			'Not_so_Happy' => 3,
			'Sad' => 4,
			'Very_Sad' => 5,
		];
	}


/**
 * This is a function used by the message sending hook, 
 * it adds the extra header info to the message as it is being sent.
 * 
 * A cookie is used to transfer the data from the Front end JS to the Back end PHP
 * 
 */

	function happiness_header($args) 
	{
		if (!empty($_COOKIE['happiness'])) {
			$happiness = (array) json_decode($_COOKIE['happiness']);
		}

		// additional email headers
		$additional_headers = [
			'X-Happiness' => (!empty($happiness)) ? $happiness['index'] : '0',
			'X-Happiness-Description' => (!empty($happiness)) ? $happiness['description'] : 'Unspecified',
		];

		$args['message']->headers($additional_headers, true);

		return $args;
	}

}

?>