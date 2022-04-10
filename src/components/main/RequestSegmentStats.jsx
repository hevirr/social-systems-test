import React from 'react';
import styled from 'styled-components';
import likeIcon from '../../assets/likes.svg';
import repostIcon from '../../assets/reposts.svg';
import followersIcon from '../../assets/followers.svg';

const StyledStatsSegment = styled.div`
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
  .stats-showcase__info {
    flex-grow: 1;
    .stats-showcase__title {
      font-size: 16px;
      color: #999999;
      margin-bottom: 7px;
    }
    .stats-showcase__counter {
      font-size: 16px;
      color: #464646;
      margin-bottom: 12px;
    }
  }
  .stats-showcase__progress-bar {
    height: 2px;
    background: #dcdcdc;
    .stats-showcase__progress-bar--line {
      width: ${({ maxCount, currentCount }) => `${Math.floor((currentCount / maxCount) * 100)}%`};
      height: 2px;
      background: red;
      transition: 0.2s;
    }
  }
`;

const RequestSegmentStats = ({ type, network, maxCount, currentCount }) => {
  return (
    <StyledStatsSegment maxCount={maxCount} currentCount={currentCount}>
      {type === 'likes' && (
        <>
          <div className="segment-display">
            <img src={likeIcon} alt="#" />
          </div>
          <div className="stats-showcase__info">
            <div className="stats-showcase__title">Лайки</div>
            <div className="stats-showcase__counter">
              {currentCount} / {maxCount}
            </div>
            <div className="stats-showcase__progress-bar"></div>
          </div>
        </>
      )}
      {type === 'reposts' && (
        <>
          <div className="segment-display">
            <img src={repostIcon} alt="#" />
          </div>
          <div className="stats-showcase__info">
            <div className="stats-showcase__title">Репосты</div>
            <div className="stats-showcase__counter">
              {currentCount} / {maxCount}
            </div>
            <div className="stats-showcase__progress-bar"></div>
          </div>
        </>
      )}
      {type === 'followers' && (
        <>
          <div className="segment-display">
            <img src={followersIcon} alt="#" />
          </div>
          <div className="stats-showcase__info">
            <div className="stats-showcase__title">Подписчики</div>
            <div className="stats-showcase__counter">
              {currentCount} / {maxCount}
            </div>
            <div className="stats-showcase__progress-bar">
              <div className="stats-showcase__progress-bar--line"></div>
            </div>
          </div>
        </>
      )}
    </StyledStatsSegment>
  );
};

export default RequestSegmentStats;
