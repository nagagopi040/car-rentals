import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import { Home, Results } from "./pages";

export default class App extends Component {
	render() {
		return (
            <Container>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/results" component={Results} />
                    </Switch>
                </Router>
            </Container>
		);
	}
}