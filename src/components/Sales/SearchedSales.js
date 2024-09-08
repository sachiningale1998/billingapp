import React from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useStore } from '../../context/store';

const SearchedSales = () => {
  const { invoices, currentPage, totalPages, setCurrentPage } = useStore();

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
        {invoices.length >=1 ? (
            <>
            <h3>Search Results</h3>
            <Table striped responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { invoices && invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <tr key={invoice._id}>
                <td>{index + 1 + (currentPage - 1) * 10}</td> {/* Adjust index for current page */}
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
    </>) : (null)
        }    
    
    </div>
  );
}

export default SearchedSales;
