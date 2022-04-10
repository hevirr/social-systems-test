import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setPrice } from '../../redux/actions/setPrice';

import likeIcon from '../../assets/likes.svg';
import repostIcon from '../../assets/reposts.svg';
import followersIcon from '../../assets/followers.svg';

const StyledValuesSegment = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f7f7f7;
  .values-segment__display-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #464646;
    .values-segment__title {
      margin-left: 20px;
    }
  }
  .values-segment__input-wrapper {
    position: relative;
    border: 1px solid #ececec;
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: 80%;
    max-width: 348px;
    input {
      padding: 14.5px 20px 13px;
      width: 100%;
      border: none;
      border-radius: 5px;
    }
    .values-segment__shadow-total {
      position: absolute;
      right: 30px;
      font-size: 16px;
      color: #999999;
    }
  }
  @media (max-width: 645px) {
    flex-direction: column;
    padding: 20px 10px;
    .values-segment__display-group {
      justify-content: flex-start;
      margin-bottom: 10px;
    }
    .values-segment__input-wrapper {
      width: 100%;
    }
  }
`;

const RegistrationValuesSegment = ({ type, requestState, valuesCount, setValuesCount }) => {
  const segmentPrices = useSelector(({ registrationModalReducer }) => registrationModalReducer);

  const dispatch = useDispatch();
  const calculatePrice = () => {
    dispatch(
      setPrice({
        network: requestState.network,
        type,
        valuesCount,
      }),
    );
  };

  useEffect(() => {
    calculatePrice();
  }, [valuesCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledValuesSegment>
      {type === 'likes' && (
        <>
          <div className="values-segment__display-group">
            {' '}
            <img src={likeIcon} alt="#" />
            <div className="values-segment__title">Лайки</div>
          </div>
          <div className="values-segment__input-wrapper">
            <input
              onChange={(e) =>
                setValuesCount((prev) => ({
                  ...prev,
                  likes: {
                    ...prev.likes,
                    max: e.target.value,
                  },
                }))
              }
              value={valuesCount.likes.max}
              type="number"
            />
            <div className="values-segment__shadow-total">{segmentPrices.likes} ₽</div>
          </div>
        </>
      )}
      {type === 'followers' && (
        <>
          <div className="values-segment__display-group">
            {' '}
            <img src={followersIcon} alt="#" />
            <div className="values-segment__title">Подписчики</div>
          </div>
          <div className="values-segment__input-wrapper">
            <input
              onChange={(e) =>
                setValuesCount((prev) => ({
                  ...prev,
                  followers: {
                    ...prev.followers,
                    max: e.target.value,
                  },
                }))
              }
              value={valuesCount.followers.max}
              type="number"
            />
            <div className="values-segment__shadow-total">{segmentPrices.followers} ₽</div>
          </div>
        </>
      )}
      {type === 'reposts' && (
        <>
          <div className="values-segment__display-group">
            {' '}
            <img src={repostIcon} alt="#" />
            <div className="values-segment__title">Репосты</div>
          </div>
          <div className="values-segment__input-wrapper">
            <input
              onChange={(e) =>
                setValuesCount((prev) => ({
                  ...prev,
                  reposts: {
                    ...prev.reposts,
                    max: e.target.value,
                  },
                }))
              }
              value={valuesCount.reposts.max}
              type="number"
            />
            <div className="values-segment__shadow-total">{segmentPrices.reposts} ₽</div>
          </div>
        </>
      )}
    </StyledValuesSegment>
  );
};

export default RegistrationValuesSegment;
