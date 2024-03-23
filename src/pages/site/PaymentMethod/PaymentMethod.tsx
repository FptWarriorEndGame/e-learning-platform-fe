import React, { useState } from 'react';
import './Payment Method.scss';
import Button from '../../../components/Button';

interface Card {
  id: number;
  cardName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}

// Dữ liệu cứng cho mục đích mô phỏng
const mockCards: Card[] = [
  {
    id: 1,
    cardName: 'NGUYEN VAN A',
    cardNumber: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '24',
    cvc: '123',
  },
  {
    id: 2,
    cardName: 'TRAN THI B',
    cardNumber: '4222222222222',
    expiryMonth: '01',
    expiryYear: '25',
    cvc: '321',
  },
];

const PaymentMethod = () => {

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [saveCard, setSaveCard] = useState(false);


    // Sử dụng dữ liệu cứng để render
    const [cards, setCards] = React.useState<Card[]>(mockCards);

    // Hàm xử lý sự kiện xóa, ở đây chỉ cập nhật state
    const handleDelete = (cardId: number) => {
      setCards(cards.filter(card => card.id !== cardId));
    };
  
    // Hàm xử lý sự kiện sửa, ở đây chỉ là placeholder
    const handleEdit = (cardId: number) => {
      console.log('Edit card with ID:', cardId);
      // Thêm logic để chỉnh sửa thẻ tại đây
    };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Thêm logic gửi thông tin đến server ở đây
  };

  const [showAddForm, setShowAddForm] = useState(false); // State để theo dõi việc hiển thị form

  // Hàm để chuyển đổi trạng thái hiển thị của form
  const toggleAddForm = () => setShowAddForm(!showAddForm);

  return (
   <div className='container mx-auto px-4 pb-20 pt-40'>
    <div className="payment-method-wrapper">
      <div className="payment-methods-header ">
        <h1 className='contact__title mb-12 text-3xl font-bold'>Phương thức thanh toán</h1>
        <p>Hiển thị các phương thức thanh toán đã lưu của tôi.</p>
      </div>
     
      <div className="payment-methods-content">
      <h3>Các phương thức thanh toán bạn đã lưu</h3>  
      <div className="payment-methods-list">
       
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card.id} className="saved-card">
              <span>{card.cardName} - **** **** **** {card.cardNumber.slice(-4)}</span>
              <div className="card-actions">
                <button onClick={() => handleEdit(card.id)}>Sửa</button>
                <button onClick={() => handleDelete(card.id)}>Xóa</button>
              </div>
            </div>
          ))
        ) : (
          <p>Bạn không có bất kỳ phương thức thanh toán nào đã lưu</p>
        )}
      </div>
      </div>
    </div>
    <Button onClick={toggleAddForm} className="banner__cta-start-now btn btn-md btn-secondary add-payment-method-button">
          {showAddForm ? 'Xong' : 'Thêm Phương Thức Thanh Toán'}
        </Button>

        {/* Hiển thị form chỉ khi showAddForm là true */}
        {showAddForm && (
            <div className="payment-form-container">

            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Thêm phương thức thanh toán</h2>
                {/* Thêm icon bảo mật ở đây nếu cần */}
              </div>
              <div className="form-body">
                {/* Chọn loại thẻ */}
                <div className="input-group radio-group">
                  <input type="radio" id="creditCard" name="paymentType" defaultChecked />
                  <label htmlFor="creditCard">Thẻ tín dụng/Thẻ ghi nợ</label>
                  {/* Thêm icon thẻ tín dụng ở đây */}
                </div>
                {/* Thêm phương thức PayPal ở đây nếu cần */}
                
                {/* Input fields */}
                <div className="input-group">
                  <label htmlFor="cardName">Tên trên thẻ</label>
                  <input 
                    type="text" 
                    id="cardName" 
                    name="cardName"
                    value={cardName} 
                    onChange={e => setCardName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="cardNumber">Số thẻ</label>
                  <input 
                    type="text" 
                    id="cardNumber" 
                    name="cardNumber"
                    value={cardNumber} 
                    onChange={e => setCardNumber(e.target.value)} 
                    required 
                  />
                </div>
                <div className="expiry-cvc-group">
                  <div className="input-group expiry-group">
                    <label htmlFor="expiryMonth">Ngày hết hạn</label>
                    <input 
                      type="text" 
                      id="expiryMonth" 
                      name="expiryMonth"
                      placeholder="MM" 
                      value={expiryMonth} 
                      onChange={e => setExpiryMonth(e.target.value)} 
                      required 
                    />
                    <input 
                      type="text" 
                      id="expiryYear" 
                      name="expiryYear"
                      placeholder="YY" 
                      value={expiryYear} 
                      onChange={e => setExpiryYear(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="input-group cvc-group">
                    <label htmlFor="cvc">CVC/CVV</label>
                    <input 
                      type="text" 
                      id="cvc" 
                      name="cvc"
                      value={cvc} 
                      onChange={e => setCvc(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button type="submit">Thêm Phương Thức</button>
              </div>
            </form>
          </div>
        )}
     
   </div>
  );
};

export default PaymentMethod;
