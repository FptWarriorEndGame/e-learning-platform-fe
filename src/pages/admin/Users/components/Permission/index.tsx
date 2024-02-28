/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { Fragment, useEffect, useState } from 'react';
import './Permission.scss';
import { Button, Col, Row, Select, Skeleton, notification } from 'antd';
import { Tree } from 'antd';
import { useGetPermissionsQuery, useGetUsersSelectQuery, useUpdatePermissionMutation } from '../../user.service';
import { SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { TreeNode } from '../../../../../types/treeNode.type';
import { objectTreeHelper } from '../../../../../utils/objectTreeHelper';
const Permission: React.FC = () => {

  // ... (other state and logic)
  
  const [permissionQuery, setPermissionQuery] = useState({})
  const [isSearch, setIsSearch] = useState(false);
  const [selectUser, setSelectedUser] = useState<string>();
  // Fetch permission data list
  const { data: permissionResponse, isFetching: isPermissionFetching, refetch } = useGetPermissionsQuery(permissionQuery, {
    skip: !selectUser || !isSearch,
  });
  const { data: usersSelectRes } = useGetUsersSelectQuery({})
  const [updatePermission, updatePermissionResult] = useUpdatePermissionMutation();
  const listPermission = permissionResponse?.listPermission;
  const listUserSelect = usersSelectRes?.users;

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);


  const [checkedKeysMap, setCheckedKeysMap] = useState<React.Key[][]>([]);


  const onExpand = (expandedKeysValue: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
 
  const onCheck = (checkedKeys: React.Key[], info: any, index: number) => {
    const newCheckedKeysMap = [...checkedKeysMap];
    newCheckedKeysMap[index] = checkedKeys;
    setCheckedKeysMap(newCheckedKeysMap);
  };

  // Selection box section
  const onChangeUserSelect = (value: string) => {
    setSelectedUser(value);
    setPermissionQuery({userId: value})
  };
  
  const onSearchUserSelect = () => {};

  const searchPermissionData = () => {
    if(selectUser) {
      setIsSearch(true);
    }else {
      notification.warning({
        message: "Please select user first!"
      });
      setIsSearch(false);
    }
  }

  useEffect(() => {
    if(isSearch) {
      refetch().then((res: any) => {

        const newListPermission = res.data?.listPermission as TreeNode[][]
        const newCheckedKeys: React.Key[][] = []
        // recheck after search
        newListPermission?.forEach((treePermissionData, index) => {
        newCheckedKeys[index] = objectTreeHelper.getInitialCheckedKeys(treePermissionData)
       })
          setCheckedKeysMap(newCheckedKeys);
          setIsSearch(false);
      }).catch(() => {
          setIsSearch(false);
      })
    }
  }, [isSearch, refetch])


  const saveData = () => {

    const result = listPermission?.map((permissionTreeData, index) => {
      const treeData = permissionTreeData.map((node) => objectTreeHelper.createNodeData(node, checkedKeysMap[index]));
      return treeData;
    });

    if(selectUser) {
      updatePermission({
        userId: selectUser,
        listPermission: result
      })
      .unwrap()
      .then((res: any) => {
        if(res) {
          notification.success({
            message: "Update permission successfully!",
          });
        }        
      }).catch(() => {
        notification.error({
          message: "Update permission failed!",
        });
      })
    }else {
      notification.warning({
        message: "Please select user first!",
      });
    }

  }

  return (
    
    <Fragment >

    <div>
    <Select
    showSearch
    placeholder="Select a user"
    optionFilterProp="children"
    onChange={onChangeUserSelect}
    onSearch={onSearchUserSelect}
    options={listUserSelect}
  />
    <Button type="primary" icon={<SearchOutlined />} onClick={searchPermissionData}>
        Search
      </Button>
      <Button type="primary" icon={<SaveOutlined />} onClick={saveData}>
            Save
      </Button>

    </div>

      {isPermissionFetching && <Skeleton/>}
  
       {!isPermissionFetching && (
        <Row className="mt-4" gutter={[16, 16]}>
        {listPermission?.map((permissionTreeData, index) => {
         const currentKey = permissionTreeData[0].key;
 
         return (
           <Col key={currentKey} span={6}>
           <Tree
             checkable
             onExpand={onExpand}
             expandedKeys={expandedKeys}
             autoExpandParent={autoExpandParent}
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore
             onCheck={(checkedKeys, info) => onCheck(checkedKeys, info, index)}
             checkedKeys={checkedKeysMap[index]}
             selectedKeys={selectedKeys}
             treeData={permissionTreeData}
         />
         </Col>
         )
       })}
        </Row>
       )}
    </Fragment>
  );
};

export default Permission;
