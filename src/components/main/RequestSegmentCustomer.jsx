import React from 'react';
import styled from 'styled-components';

import testImg from '../../assets/14.png';

const StyledCustomerSegment = styled.div`
  display: flex;
  padding: 20px;
  width: calc(100% - 40px);
  height: 100vh;
  max-width: 660px;
  max-height: 50px;
  background: #fff;
  border-bottom: 1px solid #ececec;

  .segment-display {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 6px;
    }
  }
  .customer-showcase__info {
    flex-grow: 1;
    .customer-showcase__name {
      font-size: 20px;
      line-height: 24px;
      color: #464646;
      margin-bottom: 4px;
    }
    .customer-showcase__request-type {
      font-size: 14px;
      line-height: 22px;
      color: #439dd5;
    }
  }
`;

const RequestSegmentCustomer = ({ network, type }) => {
  return (
    <StyledCustomerSegment>
      <div className="segment-display">
        {' '}
        <img src={testImg} alt="#" />
      </div>
      <div className="customer-showcase__info">
        <div className="customer-showcase__name">James Holo</div>
        <div className="customer-showcase__request-type">
          {type === 'post' ? 'Пост' : 'Аккаунт'} {network === 'ig' ? 'Инстаграм' : 'Вконтакте'}
        </div>
      </div>
    </StyledCustomerSegment>
  );
};

export default RequestSegmentCustomer;
