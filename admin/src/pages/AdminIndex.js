import React,{useState} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import '../styles/AdminIndex.css'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(props){

  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e=>{
    if(e.key==='addArticle'){
      props.history.push('/index/add')
    }else{
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">Blog Name</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu 
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <Icon type="file" />
                <span>Posts</span>
              </span>
              }
          >
            <Menu.Item key="addArticle">
              <span>
                <Icon type="plus" />
                <span>Add New</span>
              </span>
            </Menu.Item>
            <Menu.Item key="articleList">
              <span>
                <Icon type="container" />
                <span>All Posts</span>
              </span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Posts</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/list/" exact component={ArticleList} />
              <Route path="/index/add/:id" exact component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>domain-name.com</Footer>
      </Layout>
    </Layout>
  );
}
