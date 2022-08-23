import { FC, useState } from 'react';
import {Link} from "react-router-dom";

import { Button, Checkbox, Form, Input, Typography, Divider } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import './styles.scss';

const SignIn: FC = () => {

    const [isHaveAccount, setIsHaveAccount] = useState<boolean>(true);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // const haveAccountHandler = (event: React.MouseEvent<HTMLImageElement>) => {

    // }
    
    return (
        <section className='signin-wrap' >
            <h2 className='signin-title'>Авторизация</h2>
            {/* <p className='signin-signup-text'>Нет аккаунта? <Link to="/login" onClick={haveAccountHandler}>Зарегистрируйтесь!</Link></p> */}
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
                <Button block icon={<GoogleOutlined />} id='login' >Google Account</Button>
            </Form>
            
        </section>
    );
};

export default SignIn;