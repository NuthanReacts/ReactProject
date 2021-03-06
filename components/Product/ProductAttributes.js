import { Header, Button, Modal } from "semantic-ui-react";
import React, { useState } from "react";
import baseUrl from '../../utils/baseUrl'
import { useRouter} from 'next/router'
import axios from "axios";
function ProductAttributes({ description, _id }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  async function handleDelete() {
     const url = `${baseUrl}/api/product`
     const payload = { params: {_id}}
     await axios.delete(url,payload)
    router.push('/')
  }

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setOpenModal(true)}
      />
      <Modal open={openModal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete the product ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenModal(false)} content="Cancel" />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
