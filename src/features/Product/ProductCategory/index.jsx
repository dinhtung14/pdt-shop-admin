import React, { useState, useEffect, memo } from 'react'
import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import './productCate.scss'
import 'components/Table/table.scss'
import { Delete, Edit } from '@mui/icons-material'
import productApi from 'api/productApi'
import { useCallback } from 'react'
import { CustomDialog } from 'components/CustomDialog/CustomDialog'
import { Box } from '@mui/system'
import { useHistory } from 'react-router-dom'

function ProductCategory() {
    const history = useHistory();
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 1,
        totalPage: 1
    });
    const [modalConfirm, setModalConfirm] = useState(false);
    const [productItem, setProductItem] = useState();

    const getAllProducts = useCallback(async () => {
        const res = await productApi.getAll({ page: pagination.page, limit: pagination.limit });
        setProductList(res.data);
        setPagination({
            page: res.pagination.page,
            limit: res.pagination.limit,
            total: res.pagination.total,
            totalPage: res.pagination.totalPage
        })
    }, [pagination.page, pagination.limit])

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    const handleChangePage = (e, page) => {
        setPagination(prev => ({
            ...prev,
            page: page
        }))
    };
    
    const handleDeleteProduct = async () => {
        try {
            if (!productItem) return;
            const res = await productApi.delete(productItem._id);
            if (res.success === true) {
                alert("Delete product successfully");
                getAllProducts();
            }
            setModalConfirm(false);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="product-cate">
            {productList.length === 0 ? <div className='no-product'>
                No products
            </div> :
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Discount</TableCell>
                                <TableCell>Sold</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productList.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <img src={item.thumb[0]} alt="" className="product-cate__img" />
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.discount}</TableCell>
                                            <TableCell>{item.sold}</TableCell>
                                            <TableCell>{item.category.name}</TableCell>
                                            <TableCell>
                                                <div className="product-cate__action">
                                                    <Delete
                                                        className="icon-del"
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={() => { setModalConfirm(true); setProductItem(item) }}
                                                    />
                                                    <Edit
                                                        className="icon-edit"
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={() => history.push({ pathname: 'edit-product', state: item })}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <TableRow>
                        <Pagination
                            color='primary'
                            sx={{ mt: 2 }}
                            defaultCurrent={pagination.page}
                            total={pagination.total}
                            count={pagination.totalPage}
                            onChange={handleChangePage}
                        />
                    </TableRow>
                </TableContainer>
            }
            {modalConfirm && <CustomDialog
				open={modalConfirm}
				title="Confirm delete"
				content={<Typography variant='body1' sx={{ textAlign: 'center' }}>Do you want to delete this product?</Typography>}
				actions={
					<Box width='100%' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
						<Button variant='contained' size='small' sx={{ marginRight: '1rem', color: '#fff' }} onClick={handleDeleteProduct}>
							Đồng ý
						</Button>
						<Button variant='outlined' size='small' color='error' onClick={() => setModalConfirm(false)}>Hủy</Button>
					</Box>
				}
			/>}
        </div>
    )
}

export default memo(ProductCategory)