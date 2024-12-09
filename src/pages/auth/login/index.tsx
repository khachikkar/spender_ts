import {Form, Input, Flex, Button} from "antd"
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../../services/firebase/firebase.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
// import {useSelector} from "react-redux";
// import {store} from "../../../state-management/store/store.ts";
// import {Store} from "../../cabinet";
import {fetchUserProfileInfo} from "../../../state-management/slices/userProfile";
import {AppDispatch} from "../../../state-management/store/store.ts";



const Login = () =>{
const [loading, setLoading] = useState<boolean>(false)
const navigate = useNavigate()
type LoginValues = {
    email: string
    password: string
}
const dispatch = useDispatch<AppDispatch>()
    // const {userInfo:{isAuth}} = useSelector((store: Store) =>store.userProfile)

const handleLogin = async(values: LoginValues) =>{
    setLoading(true)
    try{
        const {email, password} = values
        await signInWithEmailAndPassword(auth, email, password)
        dispatch(fetchUserProfileInfo())
        form.resetFields()
        navigate("/cabinet")
    }catch (e){
        console.log(e)
    }finally {
setLoading(false)
    }

}




const [form] = Form.useForm()

    return (
        <div>
            <Form layout="vertical" form={form} onFinish={handleLogin}>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input type="text" placeholder="Enter Your Name" style={{fontSize: '16px'}}/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Your Password",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" style={{fontSize: '16px'}}/>
                </Form.Item>


                <Flex wrap justify="flex-end" align="center" gap="10px">


                    <Button
                        className="primaryButton"
                        style={{width: "100%"}}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Login
                    </Button>


                    <Link style={{width: "100%"}} to="/register">
                        <Button  style={{width: "100%"}} type="link">
                            Create Account
                        </Button>
                    </Link>

                </Flex>

            </Form>
        </div>
    )
}


export  default  Login