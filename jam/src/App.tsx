import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Background from "./components/Background";
import Panel from "./components/Panel";
import CMS from "./pages/CMS";
import Home from "./pages/Home";

export default function App() {
    return (
        <div className="h-full w-full">
            <Background preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0" height="100%" width="100%" />

            <div className="relative h-full w-full">
                <Panel className="p-[0.5rem] absolute -translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%] container h-[80%]">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/cms">
                                <CMS />
                            </Route>
                        </Switch>
                    </Router>
                </Panel>
            </div>
        </div>
    );
}
