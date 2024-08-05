import { Form, Input } from 'antd';
import { calc } from 'antd/es/theme/internal';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Menu() {
  const [state, setState] = useState({ name: "", description: "", category: "", price: "" });


  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault()

    let { name, description, category, price } = state

    if (!name || !description || !category || !price) return toast.error("Please Fill All Inputs Correctly!", { position: "bottom-left" })

    let menu = JSON.parse(localStorage.getItem("menu")) || []


    let id = Math.random().toString(36).slice(2)

    const item = { name, description, category, price, id }

    menu.push(item)
    localStorage.setItem("menu", JSON.stringify(menu))
    toast.success("Menu Item Added Successfully!", { position: "bottom-left" })
  }
  return (
    <main style={{ height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='border border-dark px-5 py-2 my-2 rounded-2'>
        <h2 className='text-center'>Add Item In Menu</h2>
        <Form id='updateTodoForm' layout="vertical">
          <Form.Item name="name">
            <Input name='name' placeholder='Name' onChange={handleChange} />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea name="description" placeholder='Description' onChange={handleChange} />
          </Form.Item>
          <Form.Item name="category">
            <Input name='category' placeholder='Category' onChange={handleChange} />
          </Form.Item>
          <Form.Item name="price">
            <Input type='number' name='price' placeholder='Price' onChange={handleChange} />
          </Form.Item>
          <button className='btn btn-primary w-100' onClick={handleSubmit}>Add-Item</button>
        </Form>
      </div>
    </main>
  )
}
