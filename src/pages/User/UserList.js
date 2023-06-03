import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssignRole } from "./AssignRole";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";

export const UserList = () => {
  const [loading, setLoading] = useState(true)
  const userStore = useSelector((state) => state.userStore)
  const users = userStore.users;
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoading(true)
    dispatch.userStore.getUsers()
    setLoading(false)
  }, [dispatch.userStore])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      width: 150,
    },
    {
      title: 'Password',
      dataIndex: 'passWord',
      width: 150,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 150,
      render: (role) => (
        <Space size="middle">
          <button style={{padding:8,border:'2px solid green', color:'green'}}>{role}</button>
        </Space>
      ),
    },
    {
      title: 'Set role',
      dataIndex: 'id',
      render:(id)=> (
          <AssignRole user={users[id - 1]}/>
      )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id) => (
        <Space size="middle">
          <UpdateUser user={users[id - 1]}/>
          <DeleteUser user={users[id - 1]}/>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        rowKey="id"
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}

