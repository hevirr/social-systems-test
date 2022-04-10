const initialState = {
  likes: 0,
  reposts: 0,
  followers: 0,
};

const priceList = {
  vk: {
    likes: 2,
    reposts: 2.2,
    followers: 4,
  },
  ig: {
    likes: 5,
    reposts: 1.3,
    followers: 5,
  },
};

const registrationModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRICE':
      let segmentTotalPrice;
      if (action.payload.network === 'vk') {
        switch (action.payload.type) {
          case 'likes':
            segmentTotalPrice = action.payload.valuesCount.likes.max * priceList.vk.likes;
            return {
              ...state,
              likes: segmentTotalPrice,
            };
          case 'reposts':
            segmentTotalPrice = Math.floor(
              action.payload.valuesCount.reposts.max * priceList.vk.reposts,
            );
            return {
              ...state,
              reposts: segmentTotalPrice,
            };
          case 'followers':
            segmentTotalPrice = action.payload.valuesCount.followers.max * priceList.vk.followers;
            return {
              ...state,
              followers: segmentTotalPrice,
            };
          default:
            break;
        }
      }
      if (action.payload.network === 'ig') {
        switch (action.payload.type) {
          case 'likes':
            segmentTotalPrice = action.payload.valuesCount.likes.max * priceList.ig.likes;
            return {
              ...state,
              likes: segmentTotalPrice,
            };
          case 'reposts':
            segmentTotalPrice = Math.floor(
              action.payload.valuesCount.reposts.max * priceList.ig.reposts,
            );
            return {
              ...state,
              reposts: segmentTotalPrice,
            };
          case 'followers':
            segmentTotalPrice = action.payload.valuesCount.followers.max * priceList.ig.followers;
            return {
              ...state,
              followers: segmentTotalPrice,
            };
          default:
            break;
        }
      }
      return;
    case 'RESET_PRICE':
      return {
        ...state,
        likes: 0,
        reposts: 0,
        followers: 0,
      };
    default:
      return { ...state };
  }
};

export default registrationModalReducer;
