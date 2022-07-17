import { AutocompleteSupport } from './autocomplete-support.js';

const MODULE_NAME = "Autocomplete Inline Properties support for OSRIC";

Hooks.once('init', function() {
  console.log(`Initializing "${MODULE_NAME}"`);
  AutocompleteSupport.initialize();
});