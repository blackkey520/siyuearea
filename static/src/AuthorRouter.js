import React, { PureComponent } from 'react';
import Cookie from 'js-cookie';
import { Route, Redirect } from 'dva/router';
import { connect } from 'dva';

 
export default class extends PureComponent {
  render() {
    const { component: Component, ...rest } = this.props;
    const usertoken = Cookie.get('token');
    return (
      <Route
        {...rest}
        render={
                (props) => {
                    if (usertoken && usertoken != null && usertoken !== '') {
                        return <Component {...props} />;
                    } else {
                        return <Redirect to="/login" />;
                    }
                }
            }
      />
    );
  }
}
