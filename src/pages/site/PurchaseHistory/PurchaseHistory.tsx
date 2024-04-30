import React from 'react';
import CoursesTable from './CoursesTable/CoursesTable';
import { Tabs } from 'antd';
import styles from './PurchaseHistory.module.scss';


const PurchaseHistory: React.FC = () => {

    const tabsItems = [
        {
            label: 'Courses',
            key: '1',
            children: <CoursesTable />
        },
    ];

    return (
        <div className={styles.purchaseHistory}>
            <div className={`container`}>
                <h2 className={`${styles.purchaseHistory__title} spacing-h-sm`}>Purchase History</h2>
                <Tabs defaultActiveKey='1' className={styles.purchaseHistory__tabs} items={tabsItems} />
            </div>
        </div>
    );
};

export default PurchaseHistory;




