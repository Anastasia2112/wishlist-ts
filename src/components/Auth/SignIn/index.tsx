import { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, Divider, Typography } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import '../styles.scss';
import { FirebaseContext } from '../../context/FirebaseContext';
import { FirebaseContextType, AuthFormValues } from '../../../models';

const { Text } = Typography;

const SignIn: FC = () => {

    const { signInWithGoogle, signIn, authError } = useContext(FirebaseContext) as FirebaseContextType;

    const handleSignInWithGoogle = async () => {
        try {
            signInWithGoogle();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignIn = async (email: string, password: string) => {
        try {
            signIn(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = (values: AuthFormValues) => {
        console.log('Success:', values);
        handleSignIn(values.email, values.password);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Faile:', errorInfo);
    };
    
    return (
        <section className='signin-wrap' >
            <h2 className='signin-title'>Авторизация</h2>
            <Form
                name="auth"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {authError && <div className='signin-warning-wrapper'>
                    <Text type="danger">Неверный email или пароль!</Text>
                    <Link to="/forgot-password">Забыли пароль?</Link>
                </div>}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите email!', type: "email" }]}
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

                <Form.Item >
                    <Button block htmlType="submit" icon={<LoginOutlined />}>
                        Войти
                    </Button>
                </Form.Item>
                
                <Divider plain></Divider>

                <Button block icon={<GoogleOutlined />} onClick={handleSignInWithGoogle} >With Google Account</Button>
            </Form>
            <span className='signin-signup-text'>Нет аккаунта? <Link to="/registration">Зарегистрируйтесь!</Link></span>
        </section>
    );
};

export default SignIn;