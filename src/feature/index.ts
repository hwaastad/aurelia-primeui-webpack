export function configure(frameworkConfig, configCallback) {
  frameworkConfig.globalResources('./prime/inputtext/inputtext');
  frameworkConfig.globalResources('./prime/button/button');
  frameworkConfig.globalResources('./prime/calendar/calendar');
  frameworkConfig.globalResources('./prime/checkbox/checkbox');
  frameworkConfig.globalResources('./prime/editor/editor');
  frameworkConfig.globalResources('./prime/listbox/listbox');

  frameworkConfig.globalResources('./prime/autocomplete/autocomplete');
}
