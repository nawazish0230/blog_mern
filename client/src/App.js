import React, {Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Tabs from './components/layout/Tabs';
import Alert from './components/layout/Alert';
import { getCategories } from './action/category';
import { loadUser } from './action/auth'
import { getPosts } from './action/post'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import MainPage from './components/posts/MainPage';
import Post from './components/posts/post/Post.js';
import CreateCategory from './components/category/CreateCategory.js';
import CategoryPosts from './components/posts/CategoryPosts';
import CreatePost from './components/posts/CreatePost';
import Category from './components/category/Category';
import EditCategory from './components/category/EditCategory';
import EditPost from './components/posts/EditPost.js';

// redux
import store from './store';
import {Provider } from 'react-redux';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  // console.log(store.getState().category)
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(getCategories())
    store.dispatch(getPosts())
  }, [])

  return (
    <>
      <Provider store={store}>
        <Router>
        <Fragment>
          <Navbar />
          <Tabs />
          <Alert />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={MainPage} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/post/edit/:postId" component={EditPost} />
            <PrivateRoute exact path="/create/post" component={CreatePost} />
            <PrivateRoute exact path="/category" component={Category} />
            {/* <PrivateRoute path="/category/edit/:catId" component={CreateCategory} /> */}
            <PrivateRoute exact path="/category/add" component={CreateCategory} />
            <PrivateRoute exact path="/category/edit/:categoryId" component={EditCategory} />
            <Route exact path="/:category" component={CategoryPosts} />
          </Switch>
        </Fragment>
      </Router>
      </Provider>
    </>
  );
}

export default App;

// showing delete button inside singlepost
// while editing category or post data is not displaying properly
// edit post mainly image issue is coming