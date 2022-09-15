import { FC, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider } from 'antd';
import { RollbackOutlined, MailOutlined } from '@ant-design/icons';
import { FirebaseContext } from '../../context/FirebaseContext';
import { FirebaseContextType, AuthFormValues } from '../../../models';
import './styles.scss';

const ForgotPassword: FC = () => {

    const { forgotPassword } = useContext(FirebaseContext) as FirebaseContextType;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/')
    }

    const handleForgotPassword = async (email: string) => {
        try {
            forgotPassword(email);
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = (values: AuthFormValues) => {
        console.log('Forgot:', values);
        handleForgotPassword(values.email);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Faile:', errorInfo);
    };
    
    return (
        <section className='signin-wrap' >
            <h2 className='signin-title'>Сброс пароля</h2>
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
                    rules={[{ required: true, message: 'Пожалуйста, введите email!', type: "email" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button block htmlType="submit" icon={<MailOutlined />}>
                        Отправить
                    </Button>
                </Form.Item>
                
                <Divider plain></Divider>

                <Button block icon={<RollbackOutlined />} onClick={handleGoBack} >Отмена</Button>
            </Form>
        </section>
    );
};

export default ForgotPassword;