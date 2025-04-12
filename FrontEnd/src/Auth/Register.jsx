import { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
    MailOutlined,
    LockOutlined,
    UserOutlined,
    GlobalOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/users/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.ok) {
                message.success({
                    content: "Account created successfully!",
                    style: { fontSize: "16px", padding: "10px" },
                });
            } else {
                message.error({
                    content: data.username || "Registration failed.",
                    style: { fontSize: "16px", padding: "10px" },
                });
            }
        } catch (error) {
            message.error({
                content: "An error occurred. Please try again.",
                style: { fontSize: "16px", padding: "10px" },
            });
        }
        setLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
    };

    const formItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.4, ease: "easeOut" },
        }),
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 p-4 sm:p-6"
        >
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
                whileHover={{ boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
                transition={{ duration: 0.3 }}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Create Your Account
                </motion.h2>

                <Form layout="vertical" onFinish={onFinish}>
                    <AnimatePresence>
                        <motion.div custom={0} variants={formItemVariants} initial="hidden" animate="visible">
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: "Please enter your username" }]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-500" />}
                                    placeholder="Username"
                                    className="rounded-lg py-3 text-gray-700"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div custom={1} variants={formItemVariants} initial="hidden" animate="visible">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
                            >
                                <Input
                                    prefix={<MailOutlined className="text-gray-500" />}
                                    placeholder="Email"
                                    className="rounded-lg py-3 text-gray-700"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div custom={2} variants={formItemVariants} initial="hidden" animate="visible">
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Enter your password" }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="text-gray-500" />}
                                    placeholder="Password"
                                    className="rounded-lg py-3 text-gray-700"
                                    size="large"
                                />
                            </Form.Item>
                        </motion.div>

                        <motion.div custom={3} variants={formItemVariants} initial="hidden" animate="visible">
                            <Form.Item
                                name="user_type"
                                rules={[{ required: true, message: "Select user type" }]}
                            >
                                <Select
                                    placeholder="Select User Type"
                                    className="rounded-lg"
                                    size="large"
                                    suffixIcon={<GlobalOutlined className="text-gray-500" />}
                                >
                                    <Option value="customer">Customer</Option>
                                    <Option value="merchant">Merchant</Option>
                                </Select>
                            </Form.Item>
                        </motion.div>

                        <motion.div custom={4} variants={formItemVariants} initial="hidden" animate="visible">
                            <Form.Item>
                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    transition={{ duration: 0.3 }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full rounded-lg py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border-none"
                                        loading={loading}
                                    >
                                        Register
                                    </Button>
                                </motion.div>
                            </Form.Item>
                        </motion.div>
                    </AnimatePresence>

                    <motion.p
                        className="text-center text-gray-600 text-sm mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Log in
                        </a>
                    </motion.p>
                </Form>
            </motion.div>
        </motion.div>
    );
};

export default Register;
