import React,{useState, useEffect} from 'react'
import marked from 'marked'
import '../styles/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker, message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const {Option} = Select
const {TextArea} = Input

export default function AddArticle(props){
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('Categories') //选择的文章类别

  useEffect(()=>{
    getTypeInfo()
    let tmpId = props.match.params.id
    if(tmpId){
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  },[])

  marked.setOptions({
    renderer:new marked.Renderer(),
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:false,
    smarktLists:true,
    smartypants:false
  })

  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = ()=>{
    axios({
      method:'get',
      url:servicePath.getTypeInfo,
      withCredentials:true
    }).then(
      res=>{
        if(res.data.data=='No Login'){
          localStorage.removeItem('openId')
          props.history.push('/')
        }else{
          setTypeInfo(res.data.data)
        }
      }
    )
  }

  const selectTypeHandler = (value)=>{
    setSelectType(value)
  }

  const saveArticle = ()=>{
    if(!selectedType){
      message.error('Please choose a category')
      return false
    } else if (selectedType=='Categories') {
      message.error('Please choose a category')
      return false
    } else if (!articleTitle) {
      message.error('Please add a title')
      return false
    } else if (!articleContent) {
      message.error('Please add the content')
      return false
    } else if (!introducemd) {
      message.error('Please add the introduction')
      return false
    } else if (!showDate) {
      message.error('Please choose a published date')
      return false
    }
    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let dateText = showDate.replace('-','/')
    dataProps.addTime = (new Date(dateText).getTime())/1000

    if(articleId===0){
      dataProps.view_count=0
      axios({
        method:'post',
        url:servicePath.addArticle,
        data:dataProps,
        withCredentials:true
      }).then(
        res=>{
          setArticleId(res.data.insertId)
          if(res.data.isSuccess){
            message.success('Published Successfully')
          } else {
            message.error('Fail to publish')
          }
        }
      )
    } else {
      dataProps.id = articleId
      axios({
        method:'post',
        url:servicePath.updateArticle,
        data:dataProps,
        withCredentials:true
      }).then(
        res=>{
          if(res.data.isSuccess){
            message.success('Saved Successfully')
          } else {
            message.error('Fail to save')
          }
        }
      )
    }
  }

  const getArticleById = (id)=>{
    axios(
      servicePath.getArticleById+id,{
      withCredentials:true
    }).then(
      res=>{
        let articleInfo = res.data.data[0]
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.article_content)
        let html = marked(articleInfo.article_content)
        setMarkdownContent(html)
        setIntroducemd(articleInfo.introduce)
        let tmpInt = marked(articleInfo.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(articleInfo.addTime)
        setSelectType(articleInfo.typeId)
      }
    )
  }
  return(
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                onChange={e=>{setArticleTitle(e.target.value)}}
                placeholder="Add Title"
                size="large"
              />  
            </Col>
            <Col span={4}>
              &nbsp;
              <Select 
                defaultValue={selectedType} 
                size="large" 
                value={selectedType}
                onChange={selectTypeHandler}
              >
                {
                  typeInfo.map((item,index)=>{
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="Add Content"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{__html:markdownContent}}>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button type="primary" size="large" onClick={saveArticle}>Publish</Button>&nbsp;
              <DatePicker 
                  onChange={(date,dateString)=>{setShowDate(dateString)}}
                  placeholder="Published Date"
                  size="large"
                />
              <br/>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea rows={8}
                        placeholder="Add Introduction"
                        value={introducemd}
                        onChange={changeIntroduce}
              >
              </TextArea>
              <br/><br/>
              <div className="introduce-html"
                dangerouslySetInnerHTML={{__html:introducehtml}}>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}