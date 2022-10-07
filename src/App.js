import React, {Component} from 'react';
import Content from './components/Content/index'
import Sider from './components/Sider/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

class App extends Component {

    state = {users: [], selectedUser: '', messages: [], history: []}

    addUser = (firstName, lastName, phone) => {
        let a = this.state.users
        a.push({id: a.length, firstName: firstName, lastName: lastName, phone: phone})
        this.setState({users: a})
        localStorage.setItem('users', JSON.stringify(a))
    }

    componentDidMount() {
        let usersString = localStorage.getItem('users')
        if (usersString) {
            let userArray = JSON.parse(usersString)
            this.setState({users: userArray})
        }
        let selectedUser = localStorage.getItem('selectedUser')
        if (selectedUser) {
            let currentUser = JSON.parse(selectedUser)
            this.setState({selectedUser: currentUser})
            this.getMessageHistory(currentUser)
        }
        let messages = localStorage.getItem('messages')
        if (messages) {
            let a = JSON.parse(messages)
            this.setState({messages: a})
        }
    }

    selectUser = (user) => {
        this.setState({selectedUser: user})
        localStorage.setItem('selectedUser', JSON.stringify(user))
        this.getMessageHistory(user)
    }

    sendMessage = (fromId, toId, text) => {
        let date = new Date()
        let message = {
            from: fromId,
            to: toId,
            text: text,
            date: date.getHours() + ':' + date.getMinutes()
        }
        let a = this.state.messages
        a.push(message)
        this.setState({messages: a})
        localStorage.setItem('messages', JSON.stringify(a))
        this.getMessageHistory(this.state.users.filter(item=>item.id===toId)[0])
    }

    getMessageHistory = (user) => {
        let b = localStorage.getItem('messages')
        if (b) {
            let messages = JSON.parse(b)
            let history = messages.filter(item => (item.from === 3 && item.to === user.id) || (item.from === user.id && item.to === 3))
            this.setState({history})
        }
    }

    render() {
        const {users, selectedUser, history} = this.state
        return (
            <div className={'container-fluid'}>
                <div className="row">
                    <div className="col-md-3 sider-parent">
                        <Sider addUser={this.addUser} users={users} selectUser={this.selectUser}
                               selectedUser={selectedUser}/>
                    </div>
                    <div className="col-md-9 content-parent">
                        <Content selectedUser={selectedUser} sendMessage={this.sendMessage} history={history}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;