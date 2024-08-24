import React from 'react'
import SalesHeader from '../components/Sales/SalesHeader'
import SalesTable from '../components/Sales/SalesTable'
import Pagination1 from '../components/Paginations/Pagination1'

const SalesPage = () => {
  return (
    <div>
        <SalesHeader />
        <SalesTable />
        <Pagination1 />
    </div>
  )
}

export default SalesPage