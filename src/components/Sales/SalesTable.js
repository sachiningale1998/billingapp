import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import SearchedSales from './SearchedSales';
import { useStore } from '../../context/store';

const SalesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);   // Total pages
  const [itemsPerPage] = useState(10);
  const {userId} = useStore();   
  
  // Fetch invoices based on the current page
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`https://invoicemakerserver.onrender.com/invoice/${userId}/allinvoices?page=${currentPage}&limit=${itemsPerPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data: ", data);
        
        setInvoices(data.invoices); // Set invoices from the API
        setTotalPages(data.totalPages); // Set total pages from the API
        
      } catch (error) {
        console.error('There was a problem fetching invoices:', error);
      }
    };

    fetchInvoices();
    
  }, [currentPage, itemsPerPage]); // Fetch data whenever the current page changes

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <SearchedSales />
      <Table striped responsive="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Invoice-ID</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <tr key={invoice._id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{invoice.customerName || 'N/A'}</td>
                <td>{invoice.totalValue || 'N/A'}</td>
                <td>{invoice.paymentStatus || 'N/A'}</td>
                <td>{invoice._id}</td>
                <td>{invoice.invoiceDate}</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No invoices available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        <Pagination size="sm">{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default SalesTable;
