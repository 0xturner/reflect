import React, { Component } from "react";
import axios from "axios";

import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Card,
  Row,
  Col,
  Statistic
} from "antd";

const { Header, Content, Footer, Sider } = Layout;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!"
    };
  }

  componentWillMount() {
    // this.fetchData();
  }

  fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then(response => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        this.setState({
          categories: response.data
        });
      });
  };

  render() {
    return (
      <>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            <h3>yeet</h3>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Ol' Nelly</Breadcrumb.Item>
            </Breadcrumb>
          </Content>
          <Footer style={{ textAlign: "center" }}>Footer heheheh</Footer>
        </Layout>
      </>
    );
  }
}

export default Settings;
