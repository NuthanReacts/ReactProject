import React, { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [success, setSuccess] = React.useState(false);
  const [mediaPreview, setMediaPreview] = useState("");

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct((prevState) => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
    console.log(product);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(product);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="name"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            value={product.price}
            onChange={handleChange}
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
          />
          <Form.Field
            onChange={handleChange}
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          onChange={handleChange}
          name="description"
          label="Description"
          placeholder="Description"
          value={product.description}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateProduct;
