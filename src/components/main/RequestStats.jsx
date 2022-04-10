import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import RequestSegmentStats from './RequestSegmentStats';
import RequestSegmentCustomer from './RequestSegmentCustomer';

import { incrementRequestCounters } from '../../redux/actions/incrementRequestCounters';

const StyledRequestStats = styled.div`
  max-width: 700px;
  margin: 0 0 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  div:nth-last-child(1) {
    border-bottom: none;
  }
`;

const RequestStats = ({ currentRequest }) => {
  const dispatch = useDispatch();

  // изначально использовал setInterval, но т.к. его нельзя было прервать и он бы вызывал
  // диспатчи бесконечно, решил сделать так
  useEffect(() => {
    setTimeout(() => {
      dispatch(incrementRequestCounters(currentRequest.id));
      console.log(currentRequest);
    }, 60000);
  }, [currentRequest]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledRequestStats>
      <RequestSegmentCustomer
        network={currentRequest.network}
        type={currentRequest.type}></RequestSegmentCustomer>
      {currentRequest.likes.max > 0 && (
        <RequestSegmentStats
          type={'likes'}
          currentCount={currentRequest.likes.current}
          maxCount={currentRequest.likes.max}></RequestSegmentStats>
      )}
      {currentRequest.reposts.max > 0 && (
        <RequestSegmentStats
          type={'reposts'}
          currentCount={currentRequest.reposts.current}
          maxCount={currentRequest.reposts.max}></RequestSegmentStats>
      )}
      {currentRequest.followers.max > 0 && (
        <RequestSegmentStats
          type={'followers'}
          currentCount={currentRequest.followers.current}
          maxCount={currentRequest.followers.max}></RequestSegmentStats>
      )}
    </StyledRequestStats>
  );
};

export default RequestStats;
