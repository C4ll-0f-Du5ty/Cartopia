import { useContext, useState, useEffect } from "react";
import { PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    Select,
    Switch,
    Upload,
    Card,
    Space,
    message,
    Image
} from 'antd';
import { toast } from 'react-toastify'
import AuthContext from "@/Context/AuthContext";
const { Option } = Select;

// Styling constants -------
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 6 }
    }
};


export default function AddProductForm() {


    const { authTokens, user } = useContext(AuthContext)

    // All The Fields Except The Image Uploader -------------------------

    const [form] = Form.useForm();




    // END OF All The Fields Except The Image Uploader -------------------------

    // Getting the Categories:

    // Convert flat category list into a nested category tree
    const [categories, setCategories] = useState([])

    const buildCategoryTree = (categories) => {
        let categoryMap = {};
        let tree = [];

        // Step 1: Map categories by ID
        categories.forEach(category => {
            categoryMap[category.id] = { ...category, children: [] };
        });

        // Step 2: Assign children to parents
        categories.forEach(category => {
            if (category.parent_category) {
                let parentId = category.parent_category.id;
                if (categoryMap[parentId]) {
                    categoryMap[parentId].children.push(categoryMap[category.id]);
                }
            } else {
                // If no parent, it's a top-level category
                tree.push(categoryMap[category.id]);
            }
        });

        return tree;
    };


    // Recursive function to generate hierarchy with "--" indentation
    const formatCategoryOptions = (categories, depth = 0) => {
        let formatted = [];
        categories.forEach(category => {
            formatted.push({
                id: category.id,
                name: `${'— '.repeat(depth)}${category.name}` // Indentation based on depth
            });

            // If category has children, process them recursively
            if (category.children.length > 0) {
                formatted = formatted.concat(formatCategoryOptions(category.children, depth + 1));
            }
        });
        return formatted;
    };


    useEffect(() => {
        async function ctg() {
            try {
                const response = await fetch('http://localhost:8000/products/category/', {
                    method: 'GET'
                })

                const data = await response.json()
                const categoryTree = buildCategoryTree(data); // Convert flat list to tree
                const formattedCategories = formatCategoryOptions(categoryTree); // Format for dropdown
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        ctg()
    }, [])


    // ______________________________________________________________________________

    // Uploading Image Logic ---------------------------------------------

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])

    console.log(fileList)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => {
                file.preview = reader.result;
                setPreviewImage(file.preview);
                setPreviewOpen(true);
            };
        } else {
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
        }
    };


    const uploadButton = (

        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,

                }}
            >
                Upload
            </div>
        </button>
    );

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };

    // END OF Uploading Image Logic ---------------------------------------------


    // Submit handler
    const onFinish = async (values) => {
        try {
            // Prepare data for submission
            const formData = new FormData()
            // Add all form fields except images
            Object.entries(values).forEach(([key, value]) => {
                // Handle price conversion
                if (key === 'price') {
                    formData.append(key, parseFloat(value));
                } else {
                    formData.append(key, value);
                }
            });

            fileList.forEach((file) => {
                formData.append(`images`, file.originFileObj);
            })
            formData.append('merchant', user?.id || 'Not Passed')

            const response = await fetch('http://localhost:8000/products/add/', {
                method: 'POST',
                headers: { Authorization: `Dusty ${authTokens?.access}` },
                body: formData
            })
            // Here you would typically send this data to your Django backend
            console.log("response: ", response)
            if (response.ok) {
                toast('Product Was Added successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Failed to add the Product.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            // form.resetFields();
        } catch (error) {
            toast.error(`Failed to add the Product. bcs ${error}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        // <div className="flex flex-row justify-center mt-20">
        <Card className="p-6 max-w-4xl mx-auto">
            <Form {...formItemLayout} form={form} onFinish={onFinish}>
                {/* Product Name */}
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter product name' }]}
                >
                    <Input placeholder="Enter product name" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter product description" />
                </Form.Item>

                {/* Price */}
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please enter price' },
                        { pattern: /^\d+(\.\d+)?$/, message: 'Please enter valid number' }
                    ]}
                >
                    <Input prefix="$" placeholder="Enter price" />
                </Form.Item>

                {/* Category */}
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category' }]}
                >
                    <Select placeholder="Select category">
                        {categories.map(category => (
                            <Option key={category.id} value={category.id}>
                                {category.name} {/* Now correctly formatted with indentation */}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Size */}
                <Form.Item
                    label="Size"
                    name="size"
                >
                    <Select placeholder="Select size">
                        {[
                            'XS', 'S', 'M', 'L', 'XL'
                        ].map(size => (
                            <Option key={size} value={size}>{size}</Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Inventory */}
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item
                        label="Quantity in Stock"
                        name="quantity_in_stock"
                        rules={[
                            { required: true, message: 'Please enter quantity' },
                            { pattern: /^\d+(\.\d+)?$/, min: 0, message: 'Please enter valid quantity' }
                        ]}
                    >
                        <Input type="number" placeholder="Enter quantity" />
                    </Form.Item>

                    <Form.Item
                        label="Reorder Threshold"
                        name="reorder_threshold"
                        rules={[
                            { required: true, message: 'Please enter threshold' },
                            { pattern: /^\d+(\.\d+)?$/, min: 0, message: 'Please enter valid threshold' }
                        ]}
                    >
                        <Input type="number" placeholder="Enter reorder threshold" />
                    </Form.Item>
                </Space>

                {/* --------------- Upload using ANTD ---------------*/}
                <Form.Item
                    label="Product Images"
                    name="images"
                >
                    <div>
                        <Upload
                            beforeUpload={(file) => {
                                const acceptedTypes = ['image/jpeg', 'image/png', 'image/DNG', 'image/jpg'];
                                if (!acceptedTypes.includes(file.type)) {

                                    message.error(` Your file ${file.name} was Rejected \n
                                    Please upload files of type JPG/JPEG/PNG/DNG only!`);
                                    return Upload.LIST_IGNORE;
                                }
                                return false;
                            }}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple={true}
                            className="w-full"
                        // progress={{ strokeWidth: 2, showInfo: false }}
                        // progress={{
                        //     strokeColor: {
                        //         '0%': '#108ee9',
                        //         '100%': '#87d068',
                        //     },
                        //     strokeWidth: 3,
                        //     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
                        // }}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </Form.Item>
                {/* --------------- END of UPLOADING processs --------------- */}
                {/* Active Status */}
                <Form.Item
                    label="Active Status"
                    name="is_active"
                    initialValue={true}
                >
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">
                        Create Product
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        // </div >
    );
}
