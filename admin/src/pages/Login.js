import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Icon,Button,Spin,message} from 'antd'
import '../styles/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'


export default function Login(props){
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const checkLogin=()=>{
    setIsLoading(true)
    if(!userName){
      message.error('Username cannot be empty')
      setTimeout(()=>{setIsLoading(false)},500)
      return false
    } else if (!password){
      message.error('Password cannot be empty')
      setTimeout(()=>{setIsLoading(false)},500)
      return false
    }
    let dataProps = {
      'userName':userName,
      'password':password
    }
    axios({
      method:'post',
      url:servicePath.checkLogin,
      data:dataProps,
      withCredentials:true
    }).then(
      res=>{
        setIsLoading(false)
        if(res.data.data=='Login successfully'){
          localStorage.setItem('openId',res.data.openId)
          props.history.push('/index')
        } else {
          message.error('The username or password is incorrect')
        }
      }
    )
  }
  return(
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Blog System" bordered={true} style={{width:400}}>
          <Input 
            id="userName"
            size="large"
            placeholder="Username"
            prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <br/><br/>
          <Input.Password 
            id="password"
            size="large"
            placeholder="Password"
            prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}}/>}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
        </Card>
      </Spin>
    </div>
  )
}