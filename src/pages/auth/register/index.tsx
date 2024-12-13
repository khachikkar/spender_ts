import {Form, Input, Flex, Button, notification} from "antd"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../../../services/firebase/firebase.ts";
import {doc, setDoc} from "firebase/firestore"
import {FIRESTORE_PATH_NAMES, ROUTE_PATH_NAMES} from "../../../utils/constants/constants.ts";
import "./index.css"



const Register = () =>{

const [loading, setLoading]=  useState<boolean>(false)
const navigate = useNavigate()

type Values = {
    name: string
    lastname: string
    email: string
    password: string
}


const handleRegister = async ( values : Values ) =>{
        console.log(values)
    const {name, email, lastname, password} = values
    setLoading(true)
    try{
            const resp = await createUserWithEmailAndPassword(auth , email, password)
            const {uid} =resp.user
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.USERS, uid)
        const data = {
                income: 0,
                other: {
                    food: [],
                    shop: [],
                    car: []
                }
        }
        await setDoc(createDoc, {
            uid, name, lastname, email, data
        })
        notification.success({
            message: "created successfully"
        })

        navigate(ROUTE_PATH_NAMES.LOGIN)

    }catch(e){
            console.log(e)
    }finally {
        setLoading(false)
    }

}
const [form] = Form.useForm()

    return (
        <div className="register">
            <h2>Register</h2>
            <Form layout="vertical" form={form} onFinish={handleRegister}>

                <Form.Item
                    label="First Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Firstname!",
                        },
                    ]}
                >
                    <Input type="text" placeholder="Enter Your Name" style={{fontSize: '16px'}}/>
                </Form.Item>


                <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Lastname!",
                        },
                    ]}
                >
                    <Input type="text" placeholder="Enter Your Surname" style={{fontSize: '16px'}}/>
                </Form.Item>


                <Form.Item
                    label="Eamil"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input type="text" placeholder="Enter Your Email" style={{fontSize: '16px'}}/>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    tooltip="Password must be 6-16 characters, including at least one number and one..."
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        }
                    ]}
                >
                    <Input.Password type="text" placeholder="Enter Your Password" style={{fontSize: '16px'}}/>
                </Form.Item>

                <Flex wrap justify="center" align="center" gap="10px">
                    <Button
                        className='primaryButton'
                        style={{width: "100%"}}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Register
                    </Button>


                    <Link to="/login">
                        <Button style={{width: "100%"}} type="link">
                            Log In
                        </Button>
                    </Link>


                </Flex>


            </Form>
        </div>
    )
}


export  default  Register