import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select, Upload } from 'antd';
import { useContext, useState } from 'react';
import { FirebaseContextType, WishType } from '../../../models';
import { FirebaseContext } from '../../context/FirebaseContext';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { storage } from '../../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { userStore } from '../../../store';
const { Option } = Select;

interface IWishForm {
    unicCategs : string[],
    handleCancel : () => void,
    onFinishFunc : (newWish: WishType) => void,
    formType : string,
    wishItem? : WishType
};

const WishForm = ({ unicCategs, handleCancel, onFinishFunc, formType, wishItem}: IWishForm) => {

    const { defaultImg, deleteImgFromStorage } = useContext(FirebaseContext) as FirebaseContextType;
    const user = JSON.parse(userStore.user!);
    const prevData: WishType | undefined = wishItem;
    const [value, setValue] = useState(2);
    let initialFileList: any;
    if (formType === "add") { 
        initialFileList = []
    } else if (formType === "edit") {
        initialFileList = [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: prevData?.img,
            },
        ]
    };
    const [form] = Form.useForm(); 
    const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);
    const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>();
    
    const createWish = (formData: WishType) => {
        const newWish = {...formData, userId: user?.uid, created: Date.now(), img: defaultImg, isGranted: false};
        onFinishFunc(newWish);
    };

    const createWithImg = (formData: WishType, imgUp: string) => {
        const newWish = {...formData, userId: user?.uid, created: Date.now(), img: imgUp, isGranted: false};
        onFinishFunc(newWish);
    };

    const editWish = (formData: WishType) => {
        let changedFields: any = {};
        Object.keys(formData).forEach(element => {
            const index = element as keyof WishType;
            if (prevData && (formData[index] !== prevData[index])) {
                let obj = {[index]: formData[index]}
                changedFields = Object.assign(changedFields, obj)
            }
        });
        onFinishFunc(changedFields);
    };

    const editWithImg = (formData: WishType, imgUp: string) => {
        let changedFields: any = {};
        Object.keys(formData).forEach(element => {
            const index = element as keyof WishType;
            if (prevData && (formData[index] !== prevData[index])) {
                let obj = {[index]: formData[index]}
                changedFields = Object.assign(changedFields, obj)
            }
        });
        changedFields = Object.assign(changedFields, {img: imgUp})
        console.log('changedFields:', changedFields);
        onFinishFunc(changedFields);
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
                    callback(values, downloadURL)
                });
            },
        );
    };

    const onFinish = (values: WishType) => {
        if (formType === 'add') {
            if (file) {
                uploadImage(createWithImg, values)
            }
            if (!file || fileList.length === 0) {
                createWish(values)
            }
        } else if (formType === 'edit') {
            if (file && fileList.length > 0) {
                uploadImage(editWithImg, values)
                prevData?.img && deleteImgFromStorage(prevData?.img)
            }
            if (prevData?.img === fileList[0]?.url) {
                editWish(values);
            }
            if (fileList.length === 0) {
                editWithImg(values, defaultImg!)
                prevData?.img && deleteImgFromStorage(prevData?.img)
            }
        }
        handleCancel();
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeRadio = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    let initialFormValues;
    let btnLabel;

    switch (formType) {
        case 'add':
            initialFormValues = {
                'link': "",
                'category': "",
                'desc': ""
            };
            btnLabel = '????????????????';
            break;
        case 'edit':
            initialFormValues = {
                'name': wishItem?.name,
                'link': wishItem?.link,
                'price': wishItem?.price,
                'category': wishItem?.category,
                'desc': wishItem?.desc,
            };
            btnLabel = '??????????????????';
            break;
    }

    // ?????? ???????? ???????????????? ??????????????????????
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
        name="wish"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="????????????????"
            name="name"
            rules={[{ required: true, message: '?????????????? ????????????????!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="????????????"
            name="link"
        >
            <Input placeholder="" />
        </Form.Item>

        <Form.Item
            label="????????"
            name="price"
            rules={[{ required: true, message: '?????????????? ????????!' }]}
        >
            <InputNumber prefix="???" min="0" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="??????????????????????" valuePropName="fileList">
            <ImgCrop rotate>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && '+ ??????????????????'}
                </Upload>
            </ImgCrop>
        </Form.Item>

        <Radio.Group onChange={onChangeRadio} value={value} >
            <Radio value={1}>???????????????? ??????????????????</Radio>
            <Radio value={2}>?????????????? ??????????????????</Radio>
        </Radio.Group>
        <br/><br/>

        {value === 1 && <Form.Item
            label="??????????????????"
            name="category"
            rules={[{ required: true, message: '?????????????? ??????????????????!' }]}
        >
            <Input />
        </Form.Item>}

        {value === 2 && <Form.Item
            label="??????????????????"
            name="category"
            rules={[{ required: true, message: '???????????????? ??????????????????!' }]}
        >
            <Select >
                {unicCategs.map((sort, index) => {
                    return <Option key={index} value={sort}>{sort}</Option>
                })}
            </Select>
        </Form.Item>}

        <Form.Item
        label="????????????????"
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