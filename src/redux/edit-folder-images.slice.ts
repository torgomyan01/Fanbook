import { createSlice } from '@reduxjs/toolkit';
import testImage from 'assets/images/search-event/search-bg.png';

const initialState: {
    images: folderImageType[];
} = {
    images: [
        { src: testImage, id: 1, name: 'test image 1', isSelected: false },
        { src: testImage, id: 2, name: 'test image 2', isSelected: false },
        { src: testImage, id: 3, name: 'test image 3', isSelected: false },
        { src: testImage, id: 4, name: 'test image 4', isSelected: false },
        { src: testImage, id: 5, name: 'test image 5', isSelected: false },
        { src: testImage, id: 6, name: 'test image 6', isSelected: false },
        { src: testImage, id: 7, name: 'test image 7', isSelected: false },
        { src: testImage, id: 8, name: 'test image 8', isSelected: false },
        { src: testImage, id: 9, name: 'test image 9', isSelected: false },
        { src: testImage, id: 10, name: 'test image 10', isSelected: false },
        { src: testImage, id: 11, name: 'test image 11', isSelected: false },
        { src: testImage, id: 12, name: 'test image 12', isSelected: false },
        { src: testImage, id: 13, name: 'test image 13', isSelected: false },
        { src: testImage, id: 14, name: 'test image 14', isSelected: false }
    ]
};
const editFolderImages = createSlice({
    name: 'edit-folder-images',
    initialState,
    reducers: {
        setNewImage(state, action) {
            state.images = [action.payload].concat(state.images);
        },
        selectForBatchActions(state, action) {
            state.images = state.images.map((image) => {
                return image.id === action.payload.id
                    ? {
                          ...image,
                          isSelected: !image.isSelected
                      }
                    : image;
            });
        }
    }
});
export const handleSelectForBatchActions =
    (image: folderImageType) => (dispatch: any) => {
        dispatch(editFolderImages.actions.selectForBatchActions(image));
    };
export const handleUploadPhotoIntoFolder = (file: any) => (dispatch: any) => {
    dispatch(
        editFolderImages.actions.setNewImage({
            src: URL.createObjectURL(file),
            id: new Date().getTime(),
            name: file.name
        })
    );
};
export const { setNewImage } = editFolderImages.actions;

export default editFolderImages.reducer;
