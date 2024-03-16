import { Col, Divider, Input, Row, Skeleton, Space, notification, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TagOutlined, TagFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { RootState } from '../../../store/store';
import { openAuthModal } from '../../auth.slice';
import {
  useGetRetrieveCartQuery,
  useGetCouponsValidForCoursesQuery,
  GetCouponsValidForCoursesResponse
} from '../client.service';
import { removeCart } from '../client.slice';
import { COUPON_TYPE_PERCENT, COUPON_TYPE_FIXED_AMOUNT } from '../../../constant/coupon-types';
import './ViewCart.scss';
import CartItem from './components/CartItem';

const ViewCart = () => {
  const cart = useSelector((state: RootState) => state.client.cart);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const courseIds = cart.items.map((item) => item.courseId);

  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const [isTotalPriceLoaded, setIsTotalPriceLoaded] = useState(false);

  const { data: couponsData, refetch: refetchCoupons } = useGetCouponsValidForCoursesQuery(courseIds.join(','));

  const { data: cartData, isFetching: isCartFetching } = useGetRetrieveCartQuery({ courseIds });

  const [totalPrice, setTotalPrice] = useState<number>(cartData?.cart.totalPrice || -1);

  useEffect(() => {
    if (cartData && cartData.cart.totalPrice !== undefined) {
      const newTotalPrice = cartData.cart.totalPrice;

      if (newTotalPrice !== -1) {
        setTotalPrice(newTotalPrice);
        setIsTotalPriceLoaded(newTotalPrice !== 0);
      }
    }
  }, [cartData]);

  useEffect(() => {
    if (isTotalPriceLoaded) {
      const currentTotalPrice = totalPrice;

      console.log('selectedCoupon', selectedCoupon);

      const maxDiscountInfo = getMaxDiscountAmount(currentTotalPrice, couponsData);

      setSelectedCoupon(maxDiscountInfo.couponCode);
      setTotalPrice(currentTotalPrice - maxDiscountInfo.discountAmount);

      setIsTotalPriceLoaded(false);
    }
  }, [couponsData, totalPrice, isTotalPriceLoaded]);

  const cartItems = cartData?.cart.items || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartHandler = (courseId: string) => {
    dispatch(removeCart(courseId));

    refetchCoupons()
      .then(() => {
        setSelectedCoupon(null);

        notification.success({
          message: 'Course removed from cart'
        });
      })
      .catch((error) => {
        console.error('Error refetching coupons:', error);
      });
  };

  const checkoutHandler = () => {
    if (courseIds.length === 0) {
      notification.error({
        message: 'Please add courses to cart'
      });
      return;
    }

    if (isAuth) {
      navigate('/checkout');
    } else {
      notification.error({
        message: 'Please login to checkout'
      });

      dispatch(openAuthModal());
    }
  };

  const selectCouponHandler = (couponCode: string) => {
    let updatedTotalPrice = cartData?.cart.totalPrice || 0;

    if (selectedCoupon === couponCode) {
      setSelectedCoupon(null);
      setTotalPrice(cartData?.cart.totalPrice || 0);
    } else {
      const selectedCouponData = couponsData?.coupons.find((coupon) => coupon.code === couponCode);

      if (selectedCouponData) {
        let discountAmount = selectedCouponData.discountAmount;

        if (selectedCouponData.couponTypeId === COUPON_TYPE_PERCENT) {
          discountAmount = (updatedTotalPrice * discountAmount) / 100;
        }

        updatedTotalPrice -= discountAmount;

        setSelectedCoupon(couponCode);
      }

      setTotalPrice(updatedTotalPrice);
    }
  };

  const getMaxDiscountAmount = (totalPrice: number, couponsData: GetCouponsValidForCoursesResponse | undefined) => {
    let maxPercentDiscount = 0;
    let maxFixedAmountDiscount = 0;
    let selectedPercentCouponType = '';
    let selectedPercentCouponCode = '';
    let selectedFixedAmountCouponType = '';
    let selectedFixedAmountCouponCode = '';

    if (couponsData && couponsData.coupons) {
      couponsData.coupons.forEach((coupon) => {
        if (coupon.couponTypeId === COUPON_TYPE_PERCENT) {
          const percentDiscount = (totalPrice * coupon.discountAmount) / 100;
          if (percentDiscount > maxPercentDiscount) {
            maxPercentDiscount = percentDiscount;
            selectedPercentCouponType = COUPON_TYPE_PERCENT;
            selectedPercentCouponCode = coupon.code;
          }
        } else if (coupon.couponTypeId === COUPON_TYPE_FIXED_AMOUNT) {
          if (coupon.discountAmount > maxFixedAmountDiscount) {
            maxFixedAmountDiscount = coupon.discountAmount;
            selectedFixedAmountCouponType = COUPON_TYPE_FIXED_AMOUNT;
            selectedFixedAmountCouponCode = coupon.code;
          }
        }
      });
    }

    const percentDiscountedPrice = totalPrice - maxPercentDiscount;
    const fixedAmountDiscountedPrice = totalPrice - maxFixedAmountDiscount;

    if (percentDiscountedPrice < fixedAmountDiscountedPrice) {
      return {
        discountAmount: maxPercentDiscount,
        couponType: selectedPercentCouponType,
        couponCode: selectedPercentCouponCode
      };
    } else {
      return {
        discountAmount: maxFixedAmountDiscount,
        couponType: selectedFixedAmountCouponType,
        couponCode: selectedFixedAmountCouponCode
      };
    }
  };

  return (
    <div className='view-cart'>
      <div className='view-cart__wrap'>
        <div className='container'>
          <h2 className='view-cart__title'>Shopping Cart</h2>
          <div className='view-cart__content '>
            <Row className='row-wrap'>
              <Col md={18} sm={24}>
                <div className='view-cart__list'>
                  <h4 className='view-cart__list-title'>{cart?.items?.length || 0} Courses in Cart</h4>
                  <div className='view-cart__list-wrap'>
                    {isCartFetching && <Skeleton />}
                    {!isCartFetching &&
                      cartItems.map((cartItem) => {
                        return (
                          <CartItem
                            // onTotal={calcTotalCartPrice}
                            key={cartItem._id}
                            courseItem={cartItem}
                            onRemove={removeCartHandler}
                          />
                        );
                      })}
                  </div>
                </div>
              </Col>
              <Col md={6} className='col view-cart__right'>
                <div className='view-cart__summary'>
                  <h4 className='view-cart__summary-title'>Total: </h4>
                  <h3 className='view-cart__summary-price'>${totalPrice}</h3>
                  <div onClick={checkoutHandler}>
                    <div className='view-cart__summary-btn btn btn-md'>Checkout</div>
                  </div>
                  <Divider />
                  <div className='view-cart__summary-promo'>
                    <span className='view-cart__summary-promo-title'>Promo code</span>
                    {courseIds.length > 0 && (
                      <div className='view-cart__coupons-list' style={{ marginTop: '10px' }}>
                        {couponsData?.coupons.map((coupon) => (
                          <div
                            key={coupon._id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              marginBottom: '10px',
                              padding: '10px',
                              border: `1px solid ${selectedCoupon === coupon.code ? '#1890ff' : '#ddd'}`,
                              borderRadius: '5px',
                              cursor: 'pointer',
                              backgroundColor: selectedCoupon === coupon.code ? '#f0f0f0' : 'inherit'
                            }}
                            onClick={() => selectCouponHandler(coupon.code)}
                          >
                            {selectedCoupon === coupon.code ? (
                              <TagOutlined style={{ marginRight: '5px' }} />
                            ) : (
                              <TagFilled style={{ marginRight: '5px' }} />
                            )}
                            <Typography.Text strong>{coupon.code}</Typography.Text>
                            <span></span>
                            <Typography.Text>{coupon.description}</Typography.Text>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className='view-cart__summary-promo-input-group'>
                      <Space.Compact style={{ width: '100%' }}>
                        <Input defaultValue='Enter Coupon' value={selectedCoupon ?? ''} readOnly />
                        <ButtonCmp className='btn btn-sm'>Apply</ButtonCmp>
                      </Space.Compact>
                    </div>
                  </div>
                  <Divider />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
