import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Layout from './Layout';
import ShowEscrowAccounts from './ShowEscrowAccounts';
import NewEscrowAccount from './NewEscrowAccount';

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscrive to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <Layout>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <ShowEscrowAccounts
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            </Route>

            <Route path="/escrowAccounts/new">
              <NewEscrowAccount
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
              />
            </Route>
          </Switch>
        </div>
      </Layout>
    );
  }
}

export default App;