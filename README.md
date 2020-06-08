# ui-dynamic-menu
A dynamically populated navigation menu.

## Installation
The code can be used as-is, simply download it.

## Usage
In order to populate the menu you need to load a JSON file by dropping it onto the drop zone.
If you drop more than one file or the file isn't a valid JSON - you will be alerted.
Dropping a new file clears the current menu.

Once the menu items are populated hovering will open them and clicking them will redirect you to the link, associated with the item, and dispatch a custom "select" event, which can be subscribed to.
The items can be infinitely nested.

An example JSON is provided in the repository.

## JSON structure
The JSON file must have a top-level item, which contains a collection of data items with the following fields:
- label - the text that will be displayed on the menu item
- link - the web address to redirect to on click
- subitems - an array of data-items that will become this menu item's sub-items
