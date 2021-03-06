import React, {Component} from 'react';
import UserService from "../services/UserService";
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Athletics Tournament ~ Login",
            email: '',
            password: '',
            error: false,
            messageError: ''
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value,
            success: false
        })
    }

    async login(e) {
        e.preventDefault();
        let body = {
            email: this.state.email,
            password: this.state.password
        }
        let response = await UserService.login(body);
        let data = await response.json();
        if(response.ok &&  data.user !== null && data.user !== undefined) {
            this.setState({error: false});
            localStorage.setItem('login', true);
            localStorage.setItem('userId', data.user._id);
            window.location.replace('/events')
        } else {
            localStorage.setItem('login', false);
            this.setState({
                error: true,
                messageError: data.message
            });
        }
    }

    render() {
        return (
            <div className="hero-body has-background-danger">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-one-third">
                            <h3 className="title has-text-grey-light">Login</h3>
                            <form action="" className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input id="email" type="email" placeholder="e.g. john.smith@gmail.com" className="input" onChange={(e) => this.handleChange(e)} required/>
                                        <span className="icon is-small is-left">
                                          <i className="fa fa-envelope"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input id="password" type="password" placeholder="*******" className="input" onChange={(e) => this.handleChange(e)} required/>
                                        <span className="icon is-small is-left">
                                          <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    {
                                        this.state.error ? <span className="has-text-danger">{this.state.messageError}</span>: null
                                    }
                                </div>
                                <div className="field has-text-right">
                                    <div className="columns">
                                        <div className="column">
                                            <Link className="button is-info" to={'/register'}>Register</Link>
                                        </div>
                                        <div className="column">
                                            <button className="button is-success" onClick={(e) => this.login(e)}>Login</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
