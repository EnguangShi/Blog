import React, {useState, useEffect} from 'react'
import { List,Row,Col,Modal,message,Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../styles/ArticleList.css'
const {confirm} = Modal

export default function ArticleList(props) {
  const [list,setList] = useState([])

  useEffect(()=>{
    getList()
  },[])

  const getList = ()=>{
    axios({
      method:'get',
      url:servicePath.getArticleList,
      withCredentials:true
    }).then(
      res=>{
        setList(res.data.list)
      })
  }

  const delArticle = (id)=>{
    confirm({
      title:'Are you sure?',
      content:'The post cannot be restored after the deletion',
      onOk(){
        axios(servicePath.delArticle+id,{withCredentials:true}).then(
          res=>{
            message.success('Deleted Successfully')
            getList()
          }
        )
      },
      onCancel(){
        message.info('Deletion cancelled')
      }
    })
  }

  const updateArticle = (id,checked)=>{
    props.history.push('/index/add/'+id)
  }

  return (
    <div>
      <List 
        header={
          <Row className="list-div">
            <Col span={12}>
              <b>Title</b>
            </Col>
            <Col span={4}>
              <b>Category</b>
            </Col>
            <Col span={4}>
              <b>Published Date</b>
            </Col>
            <Col span={4}>
              <b>Actions</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item=>(
          <List.Item>
            <Row className="list-div">
              <Col span={12}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.addTime}
              </Col>
              <Col span={4}>
                <Button type="primary"  onClick={()=>{updateArticle(item.id)}}>Edit</Button>&nbsp;
                <Button onClick={()=>{delArticle(item.id)}}>Trash</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}