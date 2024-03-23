import React from 'react';
import { Modal, Rate, Input, Form, Image, Button } from 'antd';
import { IOrderHistoryItem } from '../../../../../../types/order.type';

interface CourseReviewModalProps {
    courseId: string | null;
    courseInfo: IOrderHistoryItem | null;
    isOpen: boolean;
    onClose: () => void;
    onReviewSubmit: (courseId: string, rating: number, title: string, review: string) => void;
}

interface FormValues {
    rating: number;
    title: string;
    review: string;
}

const CourseReviewModal: React.FC<CourseReviewModalProps> = ({ courseId, courseInfo, isOpen, onClose, onReviewSubmit }) => {
    const [form] = Form.useForm<FormValues>();

    const onFormFinish = (values: FormValues) => {
        if (!courseId) return;

        onReviewSubmit(courseId, values.rating, values.title, values.review);
        form.resetFields();
        onClose();
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={`Review Course: ${courseInfo?.name || "Unknown Course"}`}
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
        >
            {courseInfo?.thumbnail && (
                <Image src={courseInfo.thumbnail} alt={courseInfo.name} />
            )}
            {courseInfo?.finalPrice && (
                <span>${courseInfo.finalPrice.toFixed(2)}</span>
            )}

            <Form form={form} layout="vertical" onFinish={onFormFinish}>

                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[{ required: true, message: 'Please select a rating!' }]}
                >
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Review Title"
                    rules={[
                        { required: true, message: 'Please enter a title for your review!' },
                        { max: 50, message: 'Title cannot be longer than 50 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="review"
                    label="Your Review"
                    rules={[
                        { required: true, message: 'Please enter your review!' },
                        { min: 20, message: 'Review should be at least 20 characters long!' }
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit Review
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default CourseReviewModal;
