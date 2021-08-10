import React, {useState, useEffect} from 'react'
import {Button,Row,Col,Menu,Icon} from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

export default function Header() {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])

    const handleClick=(e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    const returnHome=()=>{
        Router.push('/')
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={11}>
                    <Button className="header-logo" type="link" onClick={returnHome}>Blog Name</Button>
                    <span className="header-text">Description</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={7}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            Home
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return (
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
