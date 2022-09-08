import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Upload } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContextType, WishType } from '../../../models';
import { FirebaseContext } from '../../context/FirebaseContext';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { storage } from '../../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const { Option } = Select;

interface IWishForm {
    unicCategs : string[],
    handleCancel : () => void,
    onFinishFunc : (newWish: WishType) => void,
    formType : string,
    wishItem? : WishType
    // onAddFinish : (values: WishType) => void,
    // onAddFinishFailed : (errorInfo: any) => void
};

const WishForm = ({ unicCategs, handleCancel, onFinishFunc, formType, wishItem}: IWishForm) => {

    const { user } = useContext(FirebaseContext) as FirebaseContextType;

    const [value, setValue] = useState(1);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>();

    const createWish = (formData: WishType) => {
        const newWish = {...formData, userId: user?.uid, img: ""};
        onFinishFunc(newWish);
    };

    const createWithImg = (formData: WishType, imgUp: string) => {
        const newWish = {...formData, userId: user?.uid, img: imgUp};
        onFinishFunc(newWish);
    };

    const editWish = (formData: WishType) => {
        const editWish = {...formData};
        onFinishFunc(editWish);
    };

    const editWithImg = (formData: WishType) => {
        const editWish = {...formData};
        console.log();
        onFinishFunc(editWish);
    };
    
    const uploadImage = (callback: Function, values: WishType) => {
        if (fileList.length === 0) return;
        const storageRef = ref(storage, `images/${v4() + fileList[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, file!);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // setImgURL(downloadURL);
                    callback(values, downloadURL)
                });
            },
        );
    };


    const onFinish = (values: WishType) => {
        // file ? uploadImage(createWithImg, values) : createWish(values);
        if (file) {
            uploadImage(createWithImg, values)
        }
        if (!file || fileList.length === 0) {
            createWish(values)
        }

        // if (formType === 'add') {
        //     createWish(values);
        // } else if (formType === 'edit') {
        //     editWish(values);
        // }
        handleCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    let initialFormValues;
    let btnLabel;

    switch (formType) {
        case 'add':
            initialFormValues = {
                'link': "",
                // 'category': unicCategs[0],
                'category': "",
                'desc': ""
            };
            btnLabel = 'Добавить';
            break;
        case 'edit':
            initialFormValues = {
                'name': wishItem?.name,
                'link': wishItem?.link,
                'price': wishItem?.price,
                // 'img': wishItem?.img,
                'category': wishItem?.category,
                'desc': wishItem?.desc,
            };
            btnLabel = 'Отправить';
            break;
    }

    // Для поля загрузки изображения
    const onChangeUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        newFileList.length && setFile(newFileList[0].originFileObj);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as RcFile);
            reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

  return (
    <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: 'Введите название!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Ссылка"
            name="link"
        >
            <Input placeholder="" />
        </Form.Item>

        <Form.Item
            label="Цена"
            name="price"
            rules={[{ required: true, message: 'Введите цену!' }]}
        >
            <InputNumber prefix="₽" min="0" style={{ width: '100%' }} />
        </Form.Item>

        {/* <Form.Item
        label="Изображение"
        name="img"
        rules={[{ required: true, message: 'Добавьте изображение!' }]}
        >
        <Input />
        </Form.Item> */}

        <Form.Item label="Upload" valuePropName="fileList">
            <ImgCrop rotate>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
        </Form.Item>

        <Radio.Group onChange={onChange} value={value} >
            <Radio value={1}>Добавить категорию</Radio>
            <Radio value={2}>Выбрать категорию</Radio>
        </Radio.Group>
        <br/><br/>

        {value === 1 && <Form.Item
            label="Категория"
            name="category"
            rules={[{ required: true, message: 'Введите категорию!' }]}
        >
            <Input />
        </Form.Item>}

        {value === 2 && <Form.Item
            label="Категория"
            name="category"
            rules={[{ required: true, message: 'Выберите категорию!' }]}
        >
            <Select >
                {unicCategs.map((sort, index) => {
                    return <Option key={index} value={sort}>{sort}</Option>
                })}
            </Select>
        </Form.Item>}

        <Form.Item
        label="Описание"
        name="desc"
        >
        <Input placeholder="" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17, span: 2 }} style={ {marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
            {btnLabel}
        </Button>
        </Form.Item>
    </Form>
  )
}

export default WishForm