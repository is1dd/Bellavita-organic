import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAPI } from "../store/order/Order.action";
import styles from "./Orders.module.css";
export default function Orders() {
    const { isAuth, token } = useSelector((store) => store.authData);
    const { loading, error, data } = useSelector((store) => store.orderData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderAPI(token));
        console.log(data, 'inside cart orders')
    }, [dispatch])
    return (
        <VStack minH={'100vh'} p={['10px 0px', '25px', '30px']} w={['100%', '80%', '95%']} justify={'start'} align={'start'} className={styles.InfoContainer}>
            <VStack w={'100%'} justify={'start'} align={'start'} gap={['22px']} className={styles.itemsBox}>
                {data?.map((item) => (
                    <HStack p={['10px', '10px', '20px']} border={'2px solid white'} w={'100%'} justify={'space-between'} align={'center'} className={styles.item} key={item._id}>
                        <Image w={['100px']} src={item.productId.Img} alt="" />
                        <span className={styles.qty}>{item.quantity}</span>
                        <Box fontSize={['13px', '14px', '16px']} w={['236px']} className={styles.brand}>{item.productId.brand}</Box>
                        <VStack>
                            <Text> ₹{item.productId.disPrice}.00</Text>
                            <Badge p={'0.3rem'} borderRadius={'4px'} fontSize={'0.8rem'} colorScheme='red'>Pending</Badge>
                        </VStack>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    )

}