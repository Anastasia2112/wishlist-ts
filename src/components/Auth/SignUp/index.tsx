import { FC, useState, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";

import { Button, Checkbox, Form, Input, Divider } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import './styles.scss';
import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { FirebaseContext } from '../../context/FirebaseContext';
import { FirebaseContextType, AuthFormValues } from '../../../models';

const SignIn: FC = () => {

    const { createUser } = useContext(FirebaseContext) as FirebaseContextType;

    const handleCreateUser = async (email: string, password: string) => {
        try {
            createUser(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = (values: AuthFormValues) => {
        console.log('Success:', values);
        handleCreateUser(values.email, values.password);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <section className='signin-wrap' >
            <h2 className='signin-title'>Регистрация</h2>
            <Form
                name="auth"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
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
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
            <Divider plain></Divider>
            <span className='signin-signup-text'>Есть аккаунт? <Link to="/login">Авторизуйтесь!</Link></span>
        </section>
    );
};

export default SignIn;