import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavigationBar from "./components/navigation";
import Footer from "./components/footer";
import Welcome from "./components/welcome";
import Main from "./components/main";
import Game from "./components/game";
import Car from "./components/games/car"
import Tick from "./components/games/ticktacktoe";
import Snake from "./components/games/snake";
import Space from "./components/games/space";
import NotFound from "./components/notfound";


export default function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
      <Router>
        <NavigationBar/>
          {localStorage.getItem('userName') === null ?
              <Container>
                  <Row>
                      <Col lg={12} style={marginTop}>
                          <Routes>
                              <Route exact path='/' element={<Main/>}/>
                              <Route exact path='*' element={<NotFound/>}/>
                          </Routes>
                      </Col>
                  </Row>
              </Container> :
              <Container>
                  <Row>
                      <Col lg={12} style={marginTop}>
                          <Routes>
                              <Route exact path='/' element={<Main/>}/>
                              <Route exact path='/about' element={<Welcome/>}/>
                              <Route exact path='/game' element={<Game/>}/>
                              <Route exact path='/game/car' element={<Car/>}/>
                              <Route exact path='/game/tick' element={<Tick/>}/>
                              <Route exact path='/game/snake' element={<Snake/>}/>
                              <Route exact path='/game/space' element={<Space/>}/>
                          </Routes>
                      </Col>
                  </Row>
              </Container>
          }
        <Footer/>
      </Router>
  );
}
