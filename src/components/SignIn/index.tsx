import { FC, useState, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";

import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import './styles.scss';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { FirebaseContext } from '../context/FirebaseContext';

const SignIn: FC = () => {

    const [isHaveAccount, setIsHaveAccount] = useState<boolean>(true);

    // const auth = getAuth();
    const auth = useContext(FirebaseContext);
    const navigate = useNavigate();
    const [authing, setAuthing] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
        })
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    
    
    return (
        <section className='signin-wrap' >
            <h2 className='signin-title'>Авторизация</h2>
            <Form
                name="auth"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item >
                    <Button block htmlType="submit" icon={<LoginOutlined />}>
                        Войти
                    </Button>
                </Form.Item>
                
                <Divider plain></Divider>

                <Button block icon={<GoogleOutlined />} onClick={() => signInWithGoogle()} disabled={authing} >With Google Account</Button>
            </Form>
            <span className='signin-signup-text'>Нет аккаунта? <Link to="/login" onClick={() => console.log('gg')}>Зарегистрируйтесь!</Link></span>
        </section>
    );
};

export default SignIn;