import { Form, Input, Button, Modal, Typography, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Paragraph } = Typography;

export default function Home() {
  const initialState = { updatedName: "", updatedDescription: "", updatedCategory: "", updatedPrice: "", id: "" };
  const [state, setState] = useState(initialState);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(JSON.parse(localStorage.getItem("currentOrder")) || []);

  useEffect(() => {
    setCurrentOrder(JSON.parse(localStorage.getItem("currentOrder")) || []);
  }, []);

  const showModal = () => { setIsMenuModalOpen(true); };
  const handleOk = () => { setIsMenuModalOpen(false); };
  const handleCancel = () => { setIsMenuModalOpen(false); };

  let menu = JSON.parse(localStorage.getItem("menu")) || [];

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const { updatedName, updatedDescription, updatedCategory, updatedPrice, id } = state;

    const updatedItem = menu.map(item => {
      if (item.id === id) {
        return { ...item, name: updatedName, description: updatedDescription, category: updatedCategory, price: updatedPrice };
      }
      return item;
    });

    localStorage.setItem("menu", JSON.stringify(updatedItem));
    setIsMenuModalOpen(false);
    setState(initialState);
  };

  const handleUpdateClick = (item) => {
    setState({
      updatedName: item.name,
      updatedDescription: item.description,
      updatedCategory: item.category,
      updatedPrice: item.price,
      id: item.id
    });
    showModal();
  };

  const handleDeleteClick = (itemId) => {
    const itemToDelete = menu.find(item => item.id === itemId);
    if (itemToDelete) {
      setItemToDelete(itemToDelete);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      let updatedItem = menu.filter(item => item.id !== itemToDelete.id);
      localStorage.setItem("menu", JSON.stringify(updatedItem));
    }
    setDeleteModalVisible(false);
  };

  const handleAddToOrder = (item) => {
    const newOrder = { ...item };
    const updatedCurrentOrder = [...currentOrder, newOrder];
    localStorage.setItem("currentOrder", JSON.stringify(updatedCurrentOrder));
    setCurrentOrder(updatedCurrentOrder);
    toast.info("Item Added In order", { position: "bottom-left" })
  };

  const generateTableRows = () => {
    return menu.map((item, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item.name}</td>
        <td><Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "Read more..." }}>{item.description}</Paragraph></td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>
          <Space>
            <Button className='btn btn-primary btn-sm' onClick={() => handleUpdateClick(item)}>Update</Button>
            <Button className='btn btn-danger btn-sm' onClick={() => handleDeleteClick(item.id)}>Delete</Button>
          </Space>
        </td>
        <td>
          <Button className='btn btn-outline-secondary btn-sm' onClick={() => handleAddToOrder(item)}>Add</Button>
        </td>
      </tr>
    ));
  };

  const table = (
    <div className="container table-responsive">
      <table className="table table-striped-columns border border-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
            <th scope="col">Customer Order</th>
          </tr>
        </thead>
        <tbody>
          {generateTableRows()}
        </tbody>
      </table>
    </div>
  );

  return (
    <main className='text-center mb-2'>
      <h1>Menu</h1>
      <Link to='/menu' className='btn btn-primary mb-2' style={{ textDecoration: "none" }}>Add Item</Link>
      {table}
      <Link to='/orders' className='btn btn-outline-primary' style={{ textDecoration: "none" }}>Check Order</Link>
      {/* update modal */}
      <Modal
        title="Update Menu"
        open={isMenuModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Save changes
          </Button>,
        ]}
      >
        <Form id='updatedMenuForm' layout="vertical" key={state.id}>
          <Form.Item label="Name" name="updatedName" initialValue={state.updatedName}>
            <Input name='updatedName' value={state.updatedName} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Description" name="updatedDescription" initialValue={state.updatedDescription}>
            <Input.TextArea name="updatedDescription" value={state.updatedDescription} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Category" name="updatedCategory" initialValue={state.updatedCategory}>
            <Input name='updatedCategory' value={state.updatedCategory} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Price" name="updatedPrice" initialValue={state.updatedPrice}>
            <Input type='number' name='updatedPrice' value={state.updatedPrice} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>

      {/* delete modal */}
      <Modal
        open={deleteModalVisible}
        title="Confirm Delete"
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={confirmDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </main>
  );
}
