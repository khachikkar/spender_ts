// import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {UserProfileSlice} from "../../state-management/slices/userProfile";
import {Form, Input, Modal, Select, Button} from "antd";
import {useState} from "react";
// import {FinanceData} from "../../state-management/slices/financeData";
// import {FinanceDataSlice} from "../../state-management/slices/financeData";

export type Store = {
    userProfile: UserProfileSlice
    // financeData: FinanceData
}


const Cabinet = () =>{

    const {userInfo:{isAuth, data}} = useSelector((store: Store) =>store.userProfile)


    console.log(isAuth, data)


  const [isOpen, setIsOpen] = useState<boolean>(false)
    const buttonLoading = false

    type ValuesType = {
       eventCount: number
        eventType: string
    };

  const [form] = Form.useForm();


  const onFinish = (values: ValuesType)=>{
        console.log(values, ":::")
      setIsOpen(false)
  }







  const handleClose = () =>{
      setIsOpen(false)
  }


    return (
        <div>
            <h2>Spender App</h2>
            <Button onClick={()=> setIsOpen(true)}>Add a Event</Button>

            <div>

                <Modal
                    title="Add Event"
                    open={isOpen}
                    width={600}
                    onCancel={handleClose}
                    onOk={form.submit}
                    confirmLoading={buttonLoading}
                    okText="Add Event"
                    centered
                >

                    <Form layout="vertical" form={form} onFinish={onFinish}>


                        <Form.Item
                            label="Event Count"
                            name="eventCount"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter an Event Count",
                                }
                            ]}
                        >
                            <Input type="number" placeholder="Enter Event Count" />
                        </Form.Item>

                        <Form.Item
                            label="Select Event Type"
                            name="eventType"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter an Event Type",
                                }
                            ]}
                        >
                            <Select placeholder="Event Type">
                                {
                                    ["Car","Shop", "Food", "Income" ].map((item : string)=>{
                                        return(
                                            <Select.Option
                                                key={item}
                                                value={item}>
                                                {item}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>


                    </Form>

                </Modal>


            </div>
        </div>
    )
}


export  default  Cabinet