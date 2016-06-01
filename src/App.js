import {
  NavigationExperimental,
} from 'react-native';

import React, {
  Component,
} from 'react';

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export default class App extends Component {

  state = {
    // This defines the initial navigation state.
    navigationState: {
      index: 0, // starts with first route focused.
      routes: [{ key: 'Welcome' }], // starts with only one route.
    },
  };

  // This handles the navigation state changes. You're free and responsible
  // to define the API that changes that navigation state. In this exmaple,
  // we'd simply use a `function(type: string)` to update the navigation state.
  onNavigationChange: void = (type: string) => {
    let { navigationState } = this.state;
    switch (type) {
      case 'push': {
        // push a new route.
        const route = { key: Date.now() };
        navigationState = NavigationStateUtils.push(navigationState, route);
        break;
      }

      case 'pop': {
        navigationState = NavigationStateUtils.pop(navigationState);
        break;
      }
    }

    // NavigationStateUtils gives you back the same `navigationState` if nothing
    // has changed. You could use that to avoid redundant re-rendering.
    if (this.state.navigationState !== navigationState) {
      this.setState({ navigationState });
    }
  }

  // User your own navigator (see Step 2).
  render() {
    return (
      <YourNavigator
        navigationState={this.state.navigationState}
        onNavigationChange={this.onNavigationChange} />
    );
  }
}