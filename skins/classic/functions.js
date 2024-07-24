/**
 * Happiness Index plugin script
 *
 * @licstart	The following is the entire license notice for the
 * JavaScript code in this file.
 *
 * Copyright (C) Chris Wray
 *
 * The JavaScript code in this page is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.
 *
 * @licend	The above is the entire license notice
 * for the JavaScript code in this file.
 */

var happinessmenu_options = rcmail.env.happinessmenu_options;

$(document).ready(function () {
	if (window.rcmail) {

		rcmail.addEventListener('init', function(evt) {

			// Register the onclick function for setting the values for the new headers
			rcmail.register_command('plugin.happiness', function(obj) {
				// Update the environment variables
				rcmail.env.happiness_description = obj.desc;
				rcmail.env.happiness_index = obj.value;

				var happiness = {};
					happiness.index = obj.value;
					happiness.description = obj.desc;

				// Create a Cookie so that the values can be passed back to the PHP
				document.cookie = "happiness=" + JSON.stringify(happiness) +  ";";
			}, true);

			// Add the New Button to the Compose Mail Menu
			addMenuButton('happiness', 'Happiness Index...');

			// Add the popup menu details to the correct section of the HTML
			var forms = document.getElementsByTagName('form');
			for (var listOrder in forms) {
				if (isNaN(listOrder) != true && forms[listOrder].getAttribute("name") == 'form') {
					var popup = defineMenuPopup('happiness', 'Select an Happiness Index', 'select');
					forms[listOrder].appendChild(popup);
				}
			}

		});
	}
});


/**
 * Function to create the New menu button 
 * and add it to the HTML
 * 
 */

function addMenuButton(identifier, title) {
	var menu = document.getElementById("messagetoolbar");

	var link = document.createElement("a");
		link.setAttribute("href", "#" + identifier);
		link.classList.add("button");
		link.classList.add(identifier);
		link.setAttribute("title", title);
		link.setAttribute("id", identifier + "menulink");
		link.setAttribute("unselectable", "on");
		link.setAttribute("onmousedown", "return false");
		link.setAttribute("onclick", "rcmail_ui.show_popup('" + identifier + "menu', true);return false");
		link.innerHTML = '&nbsp;';

	menu.appendChild(link);
}


/**
 * Function to build the New popup menu
 * This is then passed back to the main function 
 * to be added to the HTML in the correct place
 * 
 */

function defineMenuPopup(identifier, label, action) {
	var div = document.createElement("div");
		div.setAttribute('id', identifier + 'menu');
		div.classList.add('popupmenu');

	var menuGroup = document.createElement("ul");
		menuGroup.setAttribute("id", 'text' + identifier + 'menu');

	var menuLabelContainer = document.createElement("li");

	var menuLabel = document.createElement("label");
		menuLabel.classList.add('comment');
		menuLabel.textContent = label;
		menuLabel.innerHTML = label;

	menuLabelContainer.appendChild(menuLabel);

	var optionsContainer = document.createElement('ul');
		optionsContainer.setAttribute('id', identifier + 'list');

	for (var prop in happinessmenu_options) {
		var option = document.createElement('li');
		var link = document.createElement('a');
			link.setAttribute('href', '#' + identifier + '-' + happinessmenu_options[prop]);
			link.classList.add(action + identifier);
			link.classList.add('active');
			link.setAttribute('unselectable', 'on');
			link.setAttribute('tabindex', 0);
			link.setAttribute('onclick', "return rcmail.command('plugin.happiness', {desc: '" + prop + "', value: '" + happinessmenu_options[prop] + "'}, this, event ) ");
			link.textContent = prop;
			link.innerHTML = prop;

		option.appendChild(link);
		optionsContainer.appendChild(option);
	}

	menuGroup.appendChild(menuLabelContainer);
	menuGroup.appendChild(optionsContainer);
	div.appendChild(menuGroup);

	return div;
}
