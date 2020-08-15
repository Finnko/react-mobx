import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { routes, routesMap } from '@/router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import userSettingContext from '@/contexts/userSettings';
import styles from './styles.module.css';

export default class extends Component {
    state = {
        settings: {
            lang: 'ru',
            timezone: 'Europe/Moscow',
        },
    }

    setSetting = (key, value) => this.setState({
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
                  <header className={styles.header}>
                      <Container>
                          <Button
                            type="button"
                            variant="info"
                            className="mr-3"
                            onClick={() => this.setSetting('lang', 'ru')}
                          >
                              ru
                          </Button>

                          <Button
                            type="button"
                            variant="info"
                            onClick={() => this.setSetting('lang', 'en')}
                          >
                              en
                          </Button>
                          <hr/>
                      </Container>
                  </header>
                  <main className={styles.main}>
                      <Container>
                          <Row>
                              <Col xs={3}>
                                  <ul className="list-group">
                                      <li className="list-group-item">
                                          <Link to={routesMap.products}>Products</Link>
                                      </li>
                                      <li className="list-group-item">
                                          <Link to={routesMap.cart}>Cart</Link>
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
