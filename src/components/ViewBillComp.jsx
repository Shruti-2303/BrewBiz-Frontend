import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { GrDocumentPdf } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const ViewBillComp = (args) => {
  const [billDetails, setBillDetails] = useState([]);
  const [filteredBillDetails, setFilteredBillDetails] = useState([]);
  const [addFilter, setAddFilter] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteBillSelect, setDeleteBillSelect] = useState();

  let data = JSON.parse(localStorage.getItem("data"));
  let userToken = data.token;

  const handleFilter = (e) => {
    setAddFilter(e.target.value);
    const filteredBills = billDetails.filter((bill) =>
      bill.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBillDetails(filteredBills);
  };

  const downloadPdf = (data, uuid) => {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${uuid}.pdf`;
    link.click();
  };

  const generatePdf = async (
    contactNumber,
    email,
    name,
    paymentMethod,
    productDetails,
    totalAmount,
    uuid
  ) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      responseType: "arraybuffer",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/bill/getPdf`,
        {
          phone_number: contactNumber,
          email: email,
          name: name,
          payment_method: paymentMethod,
          product_details: productDetails,
          total_amount: totalAmount,
          uuid: uuid,
        },
        config
      );

      console.log("API DATA", response.data);
      downloadPdf(response.data, uuid);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBillModalToggle = (productId) => {
    setDeleteBillSelect(productId);
    setModal(!modal);
  };

  const deleteBill = async (deleteID) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API_URL}/bill/delete/${deleteID}`,
        config
      );

      deleteBillModalToggle();
      await fetchBillDetails();

      console.log("API DATA", response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBillDetails = async () => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}/bill/getBills`;

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      const response = await axios.get(apiUrl, config);
      setBillDetails(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBillDetails();
  }, []);

  return (
    <div>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <CardBody
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardTitle tag="h5">View Bill</CardTitle>
        </CardBody>
      </Card>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <input
          style={{
            border: "none",
            padding: "5px",
          }}
          type="text"
          placeholder="Filter"
          onChange={handleFilter}
        />
      </Card>
      <Card
        style={{
          width: "95%",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        <ListGroup flush>
          <ListGroupItem
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ flex: "1" }}>
              <strong>Name</strong>
            </div>
            <div style={{ flex: "2" }}>
              <strong>Email</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Contact No.</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Payment Method</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Total</strong>
            </div>
            <div style={{ flex: "1" }}>
              <strong>Action</strong>
            </div>
          </ListGroupItem>
          {addFilter
            ? filteredBillDetails.map((bill) => (
                <ListGroupItem
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={bill.id}
                >
                  <div style={{ flex: "1" }}>{bill.name}</div>
                  <div style={{ flex: "2" }}>{bill.email}</div>
                  <div style={{ flex: "1" }}>{bill.phone_number}</div>
                  <div style={{ flex: "1" }}>{bill.payment_method}</div>
                  <div style={{ flex: "1" }}>{bill.total_amount}</div>
                  <div style={{ flex: "1", display: "flex" }}>
                    <GrDocumentPdf
                      style={{ margin: "5px", fontSize: "17px" }}
                      onClick={() =>
                        generatePdf(
                          bill.phone_number,
                          bill.email,
                          bill.name,
                          bill.payment_method,
                          bill.product_details,
                          bill.total_amount,
                          bill.uuid
                        )
                      }
                    />
                    <div onClick={() => deleteBillModalToggle(bill.id)}>
                      <MdDelete style={{ fontSize: "20px", margin: "5px" }} />
                    </div>
                  </div>
                </ListGroupItem>
              ))
            : billDetails.map((bill) => (
                <ListGroupItem
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={bill.id}
                >
                  <div style={{ flex: "1" }}>{bill.name}</div>
                  <div style={{ flex: "2" }}>{bill.email}</div>
                  <div style={{ flex: "1" }}>{bill.phone_number}</div>
                  <div style={{ flex: "1" }}>{bill.payment_method}</div>
                  <div style={{ flex: "1" }}>{bill.total_amount}</div>
                  <div
                    style={{ flex: "1", display: "flex", alignItems: "center" }}
                  >
                    <GrDocumentPdf
                      style={{ margin: "5px", fontSize: "18px" }}
                      onClick={() =>
                        generatePdf(
                          bill.phone_number,
                          bill.email,
                          bill.name,
                          bill.payment_method,
                          bill.product_details,
                          bill.total_amount,
                          bill.uuid
                        )
                      }
                    />
                    <div onClick={() => deleteBillModalToggle(bill.id)}>
                      <MdDelete style={{ fontSize: "20px", margin: "5px" }} />
                    </div>
                  </div>
                </ListGroupItem>
              ))}
        </ListGroup>
      </Card>

      <Modal isOpen={modal} {...args}>
        <ModalHeader onClick={deleteBillModalToggle}>Confirmation</ModalHeader>
        <ModalBody>Are you sure to delete this bill?</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => deleteBill(deleteBillSelect)}>
            Yes
          </Button>
          <Button color="danger" onClick={deleteBillModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewBillComp;
