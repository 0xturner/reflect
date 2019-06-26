import React, { Component } from "react";
import axios from "axios";

import Workout from "./forms/FitnessForm";

import { Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Row,
  Col,
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class Fitness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!"
    };
  }

  fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        this.setState({
          message: response.data.message
        });
      });
  };

  render() {
    return (
      <>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} >
            <h3>Fitness Page</h3>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Ol' Nelly</Breadcrumb.Item>
              </Breadcrumb>
              <h3> This Will Be The Fitness Form</h3>
              <Workout/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer heheheh</Footer>
          </Layout>
      </>
    );
  }
}

export default Fitness;
