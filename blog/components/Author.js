import {Avatar, Divider, Tooltip} from 'antd'


export default function Author() {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://avatars.githubusercontent.com/u/78357084?v=4" />
            </div>
            <div className="author-introduction">
                Introduction
                <Divider>Links:</Divider>
                <a href="https://github.com/EnguangShi" target="_blank"><Avatar size={28} icon="github" className="account" /></a>
                <Tooltip title="wechat: samuelshi0620"><Avatar size={28} icon="wechat" className="account" /></Tooltip>
                <a href="https://www.instagram.com/samuelshiheg/" target="_blank"><Avatar size={28} icon="instagram" className="account" /></a>
            </div>
        </div>
    )
}