import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'react-bootstrap';

function EditModal({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website, 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (digits only)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
     // console.log(formData);
    }
  };

  return (
    <Modal show={true} centered>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} id="edit-user-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required 
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              id="website"
              name="website"
              className="form-control"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" form="edit-user-form" type="submit">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditModal;
