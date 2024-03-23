import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByUserIdQuery } from '../../client.service';
import { useNavigate } from "react-router-dom";
import { RootState } from '../../../../store/store';
import { Table, Pagination, Button } from 'antd';
import OrderDetailsModal from './OrderDetailsModal/OrderDetailsModal';
import { IOrderHistoryItem } from '../../../../types/order.type';
import { IOrderHistory } from '../../../../types/order.type';


const CoursesTable: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const { data: ordersResponse } = useGetOrdersByUserIdQuery({ userId, page: currentPage, limit: 10 });
    const orders = ordersResponse?.orders;
    const navigate = useNavigate();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleReceiptClick = (orderId: string) => {
        const receiptUrl = `/cart-receipt/${orderId}`;

        navigate(receiptUrl);

    };

    const showModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleInvoiceClick = (orderId: string) => {
        const invoiceUrl = `/cart-invoice/${orderId}`;

        navigate(invoiceUrl);
    };

    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const handleExpandOrder = (orderId: string) => {
        setExpandedOrder(orderId === expandedOrder ? null : orderId);
    };

    const renderCourseNames = (items: IOrderHistoryItem[], orderId: string) => {
        const courseNames = items.map(item => item.name);
        const numOfCourses = courseNames.length;

        if (numOfCourses === 1) {
            return <div>{courseNames[0]}</div>;
        }

        if (numOfCourses >= 2) {
            return (
                <>
                    {expandedOrder === orderId ? (
                        <>
                            {courseNames.map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                            <Button type="link" onClick={() => handleExpandOrder(orderId)}>
                                Show less
                            </Button>
                        </>
                    ) : (
                        <>
                            <div>{`${numOfCourses} courses purchases`}</div>
                            <Button type="link" onClick={() => handleExpandOrder(orderId)}>
                                View All Courses
                            </Button>
                        </>
                    )}
                </>
            );
        }

        return null;
    };

    const columns = [
        {
            title: '',
            dataIndex: 'items',
            key: 'items',
            render: (items: IOrderHistoryItem[], record: IOrderHistory) => {
                const orderId = record._id;
                return renderCourseNames(items, orderId);
            },
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => text ? new Date(text).toLocaleDateString() : ''
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text: number) => `$${text}`
        },
        {
            title: 'Payment Type',
            dataIndex: ['transaction', 'method'],
            key: 'transaction',
        },
        {
            title: '',
            key: 'actions',
            render: (_: IOrderHistory, record: IOrderHistory) => (
                <>
                    <Button onClick={() => handleReceiptClick(record._id)} type="link">Receipt</Button>
                    <Button onClick={() => handleInvoiceClick(record._id)} type="link">Invoice</Button>
                    <Button onClick={() => showModal(record._id)} type="link">View Details</Button>

                </>
            ),
        },
    ];

    return <>
        <Table dataSource={orders} columns={columns} rowKey="_id" pagination={false} />
        <Pagination current={currentPage} onChange={handlePageChange} total={ordersResponse?.totalItems} pageSize={10} />
        <OrderDetailsModal
            orderId={selectedOrderId}
            isOpen={isModalOpen}
            onClose={handleCancel}
        />
    </>;
};



export default CoursesTable;