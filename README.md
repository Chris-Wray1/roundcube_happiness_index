Roundcube Webmail - Happiness Index Plugin
==========================================
[github.com](https://github.com/Chris-Wray1/roundcube_happiness_index)


INTRODUCTION
------------
Roundcube Webmail is a browser-based multilingual IMAP client with an
application-like user interface. It provides full functionality you expect
from an email client, including MIME support, address book, folder management,
message searching and spell checking. Roundcube Webmail is written in PHP and
requires the MySQL, PostgreSQL or SQLite database. With its plugin API it is
easily extendable and the user interface is fully customizable using skins.

The code designed to run on a webserver is mainly written in PHP and Javascript.
It includes a custom framework with an IMAP library derived from [IlohaMail][iloha]
and requires a set of external libraries (see composer.json and jsdeps.json files).


HAPPINESS INDEX PLUGIN
----------------------
This is a plugin intended to enable X-Headers to be added to sent messages to 
include an indicator for the senders happiness.

!!! THIS IS A Work In Progress !!!

INSTALLATION
------------
Once you have a working installation of RoundCube, then create a folder named 
"happiness_index" inside the plugin folder, and clone this repository into 
the new folder.

STILL TO DO
------------
While the bare bones of this plugin are working there are a few elements that 
either need adding of fixing.

- Dropdown doesnt work in the Elastic Skin
- The button image doesn't show in the Classic Skin
- Localisaition needs adding

MORE DETAIL
-----------
This was developed as a tech test for an interview, and only a limited amount of 
time was allocated.  The intention is to come back and complete this plugiin.
