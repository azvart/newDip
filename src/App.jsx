import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import useStore from './hooks/store';

import AppDrawer from './components/AppDrawer';
import AppContent from './components/AppContent';
import ListPage from './pages/List';
import AuthPage from './pages/Auth';

import './App.scss';

export default function App() {
    const { state, actions } = useStore();

    useEffect(() => {
        actions.initAuth();
    }, [actions]);

    useEffect(() => {
        if (state.user) {
            actions.getLists(state.user.uid);
            actions.getTodos(state.user.uid);
        }
    }, [state.user, actions])

    if (!state.user) {
        return (
            <Route component={AuthPage} />
        );
    } else {
        return (
            <div className="app">
                <AppDrawer
                    lists={state.lists}
                />

                <AppContent>
                    <Switch>
                        <Route exact path="/" component={ListPage} />
                        <Route exact path="/important" component={ListPage} />
                        <Route exact path="/planned" component={ListPage} />
                        <Route path="/:listId/:todoId?" component={ListPage} />
                    </Switch>
                </AppContent>
            </div>
        );
    }
}