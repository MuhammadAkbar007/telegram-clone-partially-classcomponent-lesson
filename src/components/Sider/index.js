import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './index.css'

class Index extends Component {

    state = {modalVisible: false}

    modalToggle = () => {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    onSubmitForm = (event) => {
        event.preventDefault()
        let firstName = event.target[0].value
        let lastName = event.target[1].value
        let phone = event.target[2].value
        this.props.addUser(firstName, lastName, phone)
        this.modalToggle()
    }

    userClicked = (user) => {
        this.props.selectUser(user)
    }

    render() {

        const {modalVisible} = this.state
        const {users, selectedUser} = this.props

        return (
            <div className={'sider'}>
                <button className={'btn btn-dark mt-1 btn-block'} style={{width: '100%'}}
                        onClick={this.modalToggle}> add user
                </button>

                <hr/>
                <ul className={'list-group'}>
                    {
                        users.map((item, index) => (
                            <li key={index} onClick={() => this.userClicked(item)}
                                className={`list-group-item user ${selectedUser.id===item.id?'active':''}`}>{item.firstName + ' ' + item.lastName}</li>))
                    }
                </ul>

                <Modal isOpen={modalVisible} toggle={this.modalToggle}>
                    <ModalHeader>
                        <h1>Add user</h1>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmitForm} id={'addUser'}>
                            First name <input type="text" className={'form-control'}/>
                            Last name <input type="text" className={'form-control'}/>
                            Phone number <input type="text" className={'form-control'}/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-success'} form={'addUser'}>save</button>
                        <button className={'btn btn-danger'} onClick={this.modalToggle}>close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Index;