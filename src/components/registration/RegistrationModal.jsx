import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import RegistrationValuesSegment from './RegistrationValuesSegment';

import { setRequest } from '../../redux/actions/setRequest';
import { resetPrice } from '../../redux/actions/setPrice';

import vkIcon from '../../assets/vkIcon.svg';
import igIcon from '../../assets/igIcon.svg';

const StyledRegistrationModal = styled.div`
  display: ${({ visibility }) => (visibility ? 'auto' : 'none')};
  position: absolute;
  top: 15%;
  left: 50%;
  z-index: 10;
  margin-left: -310px;

  .registration-modal {
    position: relative;
    z-index: 1;
    width: 100vw;
    max-width: 620px;
    min-width: 320px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    overflow: hidden;
    .registration-modal__header {
      padding: 20px 0;
      font-weight: 500;
      font-size: 30px;
      line-height: 36px;
      text-align: center;
      color: #464646;
      background: #f7f7f7;
    }
    .registration-modal__link {
      padding: 20px;
      background: #fff;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #e6e6e6;
      label {
        font-weight: 500;
        font-size: 16px;
        color: #464646;
        margin-bottom: 10px;
      }
      .input-wrapper {
        border: ${({ badRed }) => (badRed ? '2px solid #FF6A6A' : '2px solid #ececec')};
        border-radius: 5px;
        display: flex;
        align-items: center;
        transition: 0.2s;
        img {
          margin-left: 20px;
        }
        input {
          width: 100%;
          padding: 15px 20px;
          border: none;
          border-radius: 5px;
          transition: none;
        }
      }
      .bad-red__warning {
        margin: 10px 0 0 0;
        font-size: 16px;
        line-height: 24px;
        color: #ff6a6a;
      }
    }
    .registration-modal__footer {
      background: #f7f7f7;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .registration-modal__total-price {
        display: flex;
        justify-content: end;
        margin-bottom: 20px;
        font-size: 20px;
        line-height: 28px;

        span {
          color: #999999;
        }
      }
      .registration-modal__buttons {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .bg-layer {
    background: #000;
    opacity: 0.6;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 645px) {
    margin-left: -160px;
    .registration-modal {
      width: 320px;
      .registration-modal__header {
        padding: 20px 10px;
      }
      .registration-modal__link {
        padding: 20px 10px;
      }
      .registration-modal__footer {
        padding: 20px 10px;
        button {
          max-width: 145px;
        }
      }
    }
  }
`;

const RegistrationModal2 = ({
  visibility,
  setRegistrationModalVisibility,
  globalId,
  incrementGlobaldId,
}) => {
  const [showValueWarning, setShowValueWarning] = useState(false);
  const [badRed, setBadRed] = useState();
  const segmentPrices = useSelector(({ registrationModalReducer }) => registrationModalReducer);
  const dispatch = useDispatch();
  const [linkIsValid, setLinkIsValid] = useState(null);
  const [currentLink, setCurrentLink] = useState('');
  const [valuesCount, setValuesCount] = useState({
    likes: {
      current: 0,
      max: 0,
    },
    reposts: {
      current: 0,
      max: 0,
    },
    followers: {
      current: 0,
      max: 0,
    },
  });

  function resetState() {
    setLinkIsValid(null);
    setValuesCount({
      likes: {
        current: 0,
        max: 0,
      },
      reposts: {
        current: 0,
        max: 0,
      },
      followers: {
        current: 0,
        max: 0,
      },
    });
    dispatch(resetPrice());
  }

  const closeModalAndReset = () => {
    setCurrentLink('');
    resetState();
    setRegistrationModalVisibility(false);
  };

  const addRequest = () => {
    // оптимизированнее было бы не добавлять ненужные свойства с нулевым значением для аккаунтов или постов, но
    // так просто проще и меньше кода
    function checkIfValuesGreaterThanZero() {
      switch (linkIsValid.type) {
        case 'post':
          if (valuesCount.reposts.max === 0 || valuesCount.likes.max === 0) {
            return false;
          }
          return true;
        case 'account':
          if (valuesCount.followers.max === 0) {
            return false;
          }
          return true;
        default:
          return;
      }
    }
    if (checkIfValuesGreaterThanZero()) {
      if (checkIfValid(currentLink)) {
        dispatch(
          setRequest({
            id: globalId,
            ...linkIsValid,
            ...valuesCount,
          }),
        );
        incrementGlobaldId();
        closeModalAndReset();
      } else {
        setBadRed(true);
        setTimeout(() => {
          setBadRed(false);
        }, 2500);
      }
    } else {
      console.log('invalid value');
      setShowValueWarning(true);
      setTimeout(() => {
        setShowValueWarning(false);
      }, 2500);
    }
  };

  const checkIfValid = (link) => {
    if (validator.isURL(link)) {
      let httpProovenLink =
        link.includes('http:') || link.includes('https:') ? link : 'http://' + link;
      const url = new URL(httpProovenLink);
      // правильнее было бы сделать валидацию через api vk и fb, но для простоты мы здесь просто предполагаем, что
      // юзер может указать только 4 варианта ссылок, без фото, заметок и т.д., только пост или акаунт
      if (url.pathname.length > 1) {
        if (url.hostname.includes('vk.com')) {
          if (url.search.includes('?w=wall')) {
            setLinkIsValid({
              network: 'vk',
              type: 'post',
            });
          } else {
            setLinkIsValid({
              network: 'vk',
              type: 'account',
            });
          }
        }
        if (url.hostname.includes('instagram.com')) {
          if (url.pathname.includes('/p/')) {
            setLinkIsValid({
              network: 'ig',
              type: 'post',
            });
          } else {
            setLinkIsValid({
              network: 'ig',
              type: 'account',
            });
          }
        }
      } else {
        resetState();

        return false;
      }
      return url;
    }
    resetState();

    return false;
  };

  useEffect(() => {
    checkIfValid(currentLink);
  }, [currentLink]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [segmentPrices]);

  return (
    <StyledRegistrationModal visibility={visibility} badRed={badRed}>
      <div className="registration-modal">
        <div className="registration-modal__header">Оформление заказа</div>
        <div className="registration-modal__link">
          <label htmlFor="Укажите ссылку на то, что хотите продвинуть">
            Укажите ссылку на то, что хотите продвинуть
          </label>
          <div className="input-wrapper">
            {linkIsValid &&
              (linkIsValid.network === 'vk' ? (
                <img src={vkIcon} alt="a"></img>
              ) : (
                <img src={igIcon} alt="a"></img>
              ))}
            <input
              value={currentLink}
              onChange={(e) => setCurrentLink(e.currentTarget.value)}
              type="text"
              placeholder="Введите ссылку"
            />
          </div>
          {badRed && <div className="bad-red__warning">Некорректная ссылка.</div>}
          {showValueWarning && (
            <div className="bad-red__warning"> Укажите количество больше нуля </div>
          )}
        </div>
        {linkIsValid &&
          (linkIsValid.type === 'account' ? (
            <div className="registration-modal__values">
              <RegistrationValuesSegment
                valuesCount={valuesCount}
                setValuesCount={setValuesCount}
                type={'followers'}
                requestState={linkIsValid}
              />
            </div>
          ) : (
            <div className="registration-modal__values">
              <RegistrationValuesSegment
                valuesCount={valuesCount}
                setValuesCount={setValuesCount}
                type={'likes'}
                requestState={linkIsValid}
              />
              <RegistrationValuesSegment
                valuesCount={valuesCount}
                setValuesCount={setValuesCount}
                type={'reposts'}
                requestState={linkIsValid}
              />
            </div>
          ))}
        <div className="registration-modal__footer">
          <div className="registration-modal__total-price">
            <span>Итого:&nbsp;</span>{' '}
            {Object.values(segmentPrices).reduce((prev, cur) => prev + cur)} руб.
          </div>
          <div className="registration-modal__buttons">
            <Button color={'grey'} onClick={() => closeModalAndReset()} text={'Закрыть'} />
            <Button
              active={linkIsValid}
              onClick={() => addRequest()}
              color={'red'}
              text={'Добавить'}
            />
          </div>
        </div>
      </div>
      <div className="bg-layer" />
    </StyledRegistrationModal>
  );
};

export default RegistrationModal2;
