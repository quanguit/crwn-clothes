import { createSelector } from 'reselect';

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

// hàm chuyển id thành string (1 => hats)
export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching  
);

// biến đổi lấy giá trị boolean tại bth trả về object
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
    // mặc định ban đầu là false
    // !!{} => true
    // !!null hay gì đó => false
);