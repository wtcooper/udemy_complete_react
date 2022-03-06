import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {
    // pre-redux - this is setting state directly
    // constructor() {
    //     super();
    //
    //     this.state = {
    //         currentUser: null
    //     };
    // }

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;


        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    // pre-redux
                    // this.setState({
                    //     currentUser: {
                    //         id: snapShot.id,
                    //         ...snapShot.data()
                    //     }
                    // });
                    // console.log(this.state); //logs the current user, pre-redux

                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            // pre-redux
            // this.setState({ currentUser: userAuth });
            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                {/*this is pre-redux - using state directly*/}
                {/*<Header currentUser={this.state.currentUser} />*/}
                <Header  />

                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    {/*pre-redux*/}
                    {/*<Route path='/signin' component={SignInAndSignUpPage} />*/}
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
