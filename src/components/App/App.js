import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { routes, routesMap } from '@/router';
import { Container, Row, Col } from 'react-bootstrap';
import userSettingContext from '@/contexts/userSettings';
import styles from './styles.module.css';
import Header from '@/components/Header';
import Notifications from '@/components/Notifications';

export default class extends Component {
    state = {
        settings: {
            lang: 'ru',
            timezone: 'Europe/Moscow',
        },
    }

    handleSetSettings = (key, value) => this.setState({
        settings: {
            ...this.state.settings,
            [key]: value
        }
    });

    render() {
        const { settings } = this.state;

        return (
          <userSettingContext.Provider value={settings}>
              <BrowserRouter>
                  <Notifications />
                  <Header onSetSettings={this.handleSetSettings} />
                  <main className={styles.main}>
                      <Container>
                          <Row>
                              <Col xs={3}>
                                  <ul className="list-group">
                                      <li className="list-group-item">
                                          <NavLink activeClassName={styles.selected} exact to={routesMap.products}>Products</NavLink>
                                      </li>
                                      <li className="list-group-item">
                                          <NavLink activeClassName={styles.selected} to={routesMap.cart}>Cart</NavLink>
                                      </li>
                                      <li className="list-group-item">
                                          <NavLink activeClassName={styles.selected} to={routesMap.order}>Order</NavLink>
                                      </li>
                                  </ul>
                              </Col>

                              <Col xs={9}>
                                  <Switch>
                                      {routes.map(route => (
                                        <Route
                                          key={route.path}
                                          path={route.path}
                                          component={route.component}
                                          exact={'exact' in route ? route.exact : true}
                                        />))}
                                  </Switch>
                              </Col>
                          </Row>
                          <hr/>
                      </Container>
                  </main>

                  <footer>
                      <Container>
                          your lang: {settings.lang}
                      </Container>
                  </footer>
              </BrowserRouter>
          </userSettingContext.Provider>
        );
    }
}
