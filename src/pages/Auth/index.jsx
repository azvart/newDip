// import React, { useState } from 'react';

// import { actions } from '../../store';

// export default function LoginPage({ history }) {
//     const [login, setLogin] = useState('');
//     const [password, setPassword] = useState('');

//     function handleSubmit(event) {
//         event.preventDefault();

//         actions.loginUser(login, password);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={login}
//                     onChange={event => setLogin(event.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={event => setPassword(event.target.value)}
//                     required
//                 />
//                 <button type="submit">Войти</button>
//             </form>
//         </div>
//     );
// }



import React, { useState } from 'react';
import {
    Button,
    Card, CardSection, CardActions,
    Layout,
    TextField,
    Typography
} from 'mdc-react';

import useStore from '../../hooks/store';

import './index.scss';

export default function AuthPage() {
    const { actions } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleLogInButtonClick() {
        if (email && password) {
            actions.logInUser(email, password)
                .catch(error => setError(error.message));
        }
    }

    function handleRegisterButtonClick() {
        if (email && password) {
            actions.registerUser(email, password)
                .catch(error => setError(error.message));
        }
    }

    return (
        <Layout id="login-page" className="page">
            <Typography variant="headline2">React Todo</Typography>

            {error &&
                <Typography>{error}</Typography>
            }

            <Card outlined>
                <CardSection primary>
                    <TextField
                        type="email"
                        value={email}
                        placeholder="Электронная почта"
                        required
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardSection>

                <CardActions>
                    <Button onClick={handleLogInButtonClick}>Войти</Button>
                    <Button onClick={handleRegisterButtonClick}>Зарегистрироваться</Button>
                </CardActions>
            </Card>
        </Layout>
    );
}