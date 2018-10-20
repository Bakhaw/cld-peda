import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import Calendar from '../Calendar';
import Invitations from '../Invitations';

class UserInterface extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invitations: [],
            name: {
                value: '',
                error: false
            },
            lastname: {
                value: '',
                error: false
            },
            step: 1
        }
    }

    componentDidMount() {
        this.getInvitations();
    }

    getInvitations = async () => {
        const request = await axios.get('/invitations/availables');
        const invitations = await request.data;

        console.log({ invitations })
        this.setState({ invitations })
    }

    handleChangeInput = e => {
        this.setState({ [e.target.name]: { value: e.target.value, error: false } });
    }

    handleFormSubmit = () => {
        const { lastname, name } = this.state;

        if (lastname.value === '') this.setState({ lastname: { value: this.state.lastname.value, error: true } });
        if (name.value === '') this.setState({ name: { value: this.state.name.value, error: true } });

        if (lastname.value !== '' && name.value !== '') this.setState({ step: this.state.step + 1 });
    }

    render() {
        const { lastname, name, step } = this.state;
        return (
            <div className={this.state.step === 3 ? '' : 'user-container'}>
                <div className='user-interface'>
                    {step === 1 &&
                        <div className='user-form'>
                            <h1>Qui êtes-vous ?</h1>
                            <TextField className='user-input'
                                label='Nom'
                                error={lastname.error}
                                name='lastname'
                                onChange={(e) => this.handleChangeInput(e)}
                                required
                                value={lastname.value}
                                variant='outlined' />
                            <TextField className='user-input'
                                label='Prénom'
                                error={name.error}
                                helperText='* Champs obligatoires'
                                name='name'
                                onChange={(e) => this.handleChangeInput(e)}
                                required
                                value={name.value}
                                variant='outlined' />
                            <Button className='submit-button' type='submit' size='large' variant='contained' color='primary' onClick={this.handleFormSubmit}>
                                Valider
                            </Button>

                            <Link to='/calendar' className='show-calendar'>
                                <Button size='large' variant='outlined' color='primary'>
                                    Voir le Calendrier
                                </Button>
                            </Link>
                        </div>
                    }

                    {step === 2 &&
                        <div className='choose-date'>
                            <h1>Choisissez vos dates, {name.value}</h1>
                            <Invitations lastname={lastname}
                                    name={name}
                                    title={`${lastname.value} ${name.value}`}
                                    history={this.props.history} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default UserInterface;