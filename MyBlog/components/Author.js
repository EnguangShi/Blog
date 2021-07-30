import {Avatar, Divider} from 'antd'


export default function Author() {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://dp.vanpeople.com/uploads/pictures/2021-07/15_1626395389_thumb.jpg" />
            </div>
            <div className="author-introduction">
                个人介绍个人介绍
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="instagram" className="account" />
                <Avatar size={28} icon="weibo" className="account" />
            </div>
        </div>
    )
}