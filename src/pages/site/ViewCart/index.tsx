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
  useGetTotalPriceQuery,
  useGetValidCouponsForCoursesWithoutUserQuery,
  useGetTotalPriceWithoutUserQuery
} from '../client.service';
import { removeCart, setSelectedCoupon } from '../client.slice';
import './ViewCart.scss';
import CartItem from './components/CartItem';

const ViewCart = () => {
  const cart = useSelector((state: RootState) => state.client.cart);
  const selectedCoupon = useSelector((state: RootState) => state.client.selectedCoupon);
  const dispatch = useDispatch();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const userId = useSelector((state: RootState) => state.auth.userId);
  const [isSkip, setIsSkip] = useState(false);
  const [couponQuery, setCouponQuery] = useState(() =>
    isAuth ? useGetCouponsValidForCoursesQuery : useGetValidCouponsForCoursesWithoutUserQuery
  );
  const [priceQuery, setPriceQuery] = useState(() =>
    isAuth ? useGetTotalPriceQuery : useGetTotalPriceWithoutUserQuery
  );

  const [courseIds, setCourseIds] = useState<string[]>([]);

  useEffect(() => {
    setCouponQuery(() => (isAuth ? useGetCouponsValidForCoursesQuery : useGetValidCouponsForCoursesWithoutUserQuery));
    setPriceQuery(() => (isAuth ? useGetTotalPriceQuery : useGetTotalPriceWithoutUserQuery));
  }, [isAuth]);

  useEffect(() => {
    setCourseIds([]);
    const newCourseIds = cart.items.map((item) => item.courseId);
    setCourseIds(newCourseIds);
  }, [isAuth, cart]);

  // Skip call API when cart is empty
  useEffect(() => {
    if (courseIds.length > 0) {
      setIsSkip(false);
    } else {
      setIsSkip(true);
    }
  }, [courseIds]);

  const { data: couponsData, isFetching: isCouponsFetching } = couponQuery(courseIds.join(','));

  const {
    data: cartData,
    isFetching: isCartFetching,
    refetch
  } = useGetRetrieveCartQuery(
    { courseIds, userId },
    {
      skip: isSkip
    }
  );

  const { data: totalPriceData } = priceQuery({
    courseIds: courseIds.join(','),
    couponCode: selectedCoupon || undefined
  });

  useEffect(() => {
    if (cartData && cartData.duplicatedIds && cartData.duplicatedIds.length > 0) {
      cartData.duplicatedIds.forEach((id) => {
        dispatch(removeCart(id));
      });
    }
  }, [cartData, dispatch]);

  useEffect(() => {
    if (!isCouponsFetching && couponsData?.maxDiscountCoupon) {
      dispatch(setSelectedCoupon(couponsData.maxDiscountCoupon.code));
    } else {
      dispatch(setSelectedCoupon(null));
    }
  }, [dispatch, isCouponsFetching, couponsData]);

  const totalPrice = totalPriceData?.totalPrice || 0;
  const cartItems = cartData?.cart.items || [];

  const navigate = useNavigate();

  const removeCartHandler = (courseId: string) => {
    dispatch(removeCart(courseId));
    refetch()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err: any) => {
        console.log('err', err);
      });
    notification.success({
      message: 'Course removed from cart'
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
      sessionStorage.removeItem('selectedCourse');

      navigate('/checkout');
    } else {
      notification.error({
        message: 'Please login to checkout'
      });

      dispatch(openAuthModal());
    }
  };

  const selectCouponHandler = (couponCode: string) => {
    if (selectedCoupon === couponCode) {
      dispatch(setSelectedCoupon(null));
    } else {
      dispatch(setSelectedCoupon(couponCode));
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
                        {couponsData?.coupons?.map((coupon) => (
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
                        <Input defaultValue='Enter Coupon' value={selectedCoupon ?? ''} />
                        {/* <ButtonCmp className='btn btn-sm'>Apply</ButtonCmp> */}
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
