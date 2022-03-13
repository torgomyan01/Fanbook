import { createSlice } from '@reduxjs/toolkit';

interface IPosters {
    posterCreateInfo: {
        userEventId: string | null | undefined;
        name: string | null | undefined;
        description: string | null | undefined;
        size: string | null | undefined;
        templateId: string | null | undefined;
        templateName: string | null | undefined;
        params: {
            template: {
                style: string | null | undefined;
            };
            images: {
                style: string | null | undefined;
                items: {
                    tag: string | null | undefined;
                    style: string | null | undefined;
                    texts: [];
                }[];
            };
        };
    };
    editorPage: {
        imageURL: string;
    };
}

const initialState: IPosters = {
    posterCreateInfo: {
        userEventId: '',
        name: '',
        description: '',
        size: '',
        templateId: '',
        templateName: '',
        params: {
            template: {
                style: ''
            },
            images: {
                style: '',
                items: []
            }
        }
    },
    editorPage: {
        imageURL: ''
    }
};

const Posters = createSlice({
    name: 'create-poster',
    initialState,
    reducers: {
        setPoster(state, action) {
            state.posterCreateInfo = action.payload;
        },
        setAddUrlToStartDragImages(state, action) {
            state.editorPage.imageURL = action.payload;
        }
    }
});

export const { setPoster, setAddUrlToStartDragImages } = Posters.actions;

export default Posters.reducer;
