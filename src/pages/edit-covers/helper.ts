import { UpdatePageBookBatch } from 'api/all-apis';
import randomBackground, { keyGenerator, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

export const TEMPLATE_NAME = {
    CREATE_FRONT: 'create-front',
    TEMPLATE1: 'Blank Page',
    TEMPLATE2: 'Layout 2',
    TEMPLATE3: 'Layout 3',
    TEMPLATE4: 'Layout 4',
    TEMPLATE5: 'Layout 5',
    TEMPLATE6: 'Layout 6',
    TEMPLATE7: 'Layout 7',
    TEMPLATE8: 'Layout 8',
    TEMPLATE9: 'Layout 9',
    TEMPLATE10: 'Layout 10'
};
export const DEF_START_PARAM_TEXT = 40;

export const defaultTextStyle = {
    id: keyGenerator(30),
    text: 'Your Text',
    style: `color: ${randomBackground()}; font-size: 20px; transform: translate(${DEF_START_PARAM_TEXT}px, ${DEF_START_PARAM_TEXT}px);`,
    param: {
        x: DEF_START_PARAM_TEXT,
        y: DEF_START_PARAM_TEXT
    }
};

export const perecentCalc = (number: number, perecent: number) => {
    return (number * perecent) / 100;
};

function randomBackgroundForTextEditor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const black = Math.floor(Math.random() * 255);
    return `rgba(${red}, ${green}, ${black}, 0.75)`;
}

export const defaultStyleText = () => {
    const textPositionLeft = Math.floor(Math.random() * 80);
    const textPositionTop = Math.floor(Math.random() * 80);
    return (
        'position: absolute;' +
        `left: ${textPositionLeft}%;` +
        `top: ${textPositionTop}%;` +
        `background-color: ${randomBackgroundForTextEditor()};`
    );
};

export const inputFontSizeDefValue = {
    min: 11,
    max: 77
};

export const updateBook = {
    start: 'update-pages',
    stop: 'stop',
    savePage: 'save-page'
};

export const startSaving = {
    start: 'start',
    end: 'end',
    stop: ''
};

export const TemplateStatus = {
    min: 'min',
    max: 'max'
};

// GET ALL DATA PAGE
let allData: any = [];
export const getAllDataPage = () => {
    allData = [];
    let result: ISavingData = {
        bookId: '',
        pageId: '',
        templateId: '',
        params: {
            template: {
                style: ''
            },
            images: [],
            texts: []
        }
    };
    const viewBlock = document.getElementById('book-page-content-view');
    viewAllChillersElement(viewBlock?.childNodes);
    searchResults(allData, function (res: any) {
        result = {
            bookId: viewBlock?.getAttribute('data-book-id'),
            templateId: viewBlock?.getAttribute('data-template-id'),
            pageId: viewBlock?.getAttribute('data-page-id'),
            params: res
        };
    });

    return result;
};

export const startSearchActiveNumberToPages = (result: any) => {
    let _st = false;
    const allPages = document.querySelectorAll('.carousel-item-bg');
    allPages.forEach((item: Element, index: number) => {
        item.classList.forEach((className) => {
            if (className === 'active') {
                result(index);
                _st = true;
            }
        });
    });
    if (!_st) {
        result(-1);
    }
};

export const addClassActiveToIndexNumber = (indexElement: number) => {
    const allPages: NodeListOf<Element> =
        document.querySelectorAll('.carousel-item-bg');
    addActivePageMinBlock(allPages.item(indexElement));
};

function viewAllChillersElement(childless: any) {
    childless.forEach((e: any) => {
        allData.push(e);
        if (e.childNodes.length > 0) {
            viewAllChillersElement(e.childNodes);
        }
    });
}

function searchResults(pageElements: any, result: any) {
    const allText: any = [];
    const allImages: any = [];
    let maxBlockBorder: string | null = '';
    pageElements.map((element: HTMLElement, index: number) => {
        if (element.className?.includes('front-back-book--text')) {
            allText.push({
                style: element.getAttribute('style'),
                content: element.innerText
            });
        }
        if (element.className?.includes('blocks')) {
            allImages.push({
                tag: `image${allImages.length}`,
                style: element.getAttribute('style'),
                texts: []
            });
        }
        if (element.className?.includes('slider-item')) {
            maxBlockBorder = element.getAttribute('style');
        }
        if (index === pageElements.length - 1) {
            allImages[allImages.length - 1].texts = allText;
        }
    });
    result({
        template: {
            style: ''
        },
        texts: [],
        images: {
            style: maxBlockBorder,
            items: allImages
        }
    });
}

export const addAllFontsBody = (fonts: IGoogleFontsItem[]) => {
    let style = '';
    fonts.map((font: IGoogleFontsItem) => {
        console.log(font);
        for (const prop in font.files) {
            style += `\n@font-face {\n font-family: ${font.family};\n src: url(${font.files[prop]}) format('truetype');\n} \n`;
        }
    });
    return style;
};

// EDIT BACKGROUND AND OPACITY
export const editBackground = (color: string, opacity: number) => {
    const rgbaCol = `rgba(${parseInt(color.slice(-6, -4), 16)},${parseInt(
        color.slice(-4, -2),
        16
    )},${parseInt(color.slice(-2), 16)}, ${opacity}%)`;
    return rgbaCol;
};

// REMOVE ALL ACTIVE MIN BLOCK PAGE AND ADD ACTIVE THIS
export const addActivePageMinBlock = (currentBlock: any) => {
    const pageBlock = document.querySelectorAll('.carousel-item-bg');
    pageBlock.forEach((page: any) => {
        page.classList.remove('active');
    });
    currentBlock?.classList?.add('active');
};

export const moveItemInArrayFromIndexToIndex = (
    array: any,
    fromIndex: number,
    toIndex: number
) => {
    if (fromIndex === toIndex) {
        return array;
    }
    const newArray = [...array];
    const target = newArray[fromIndex];
    const inc = toIndex < fromIndex ? -1 : 1;
    for (let i = fromIndex; i !== toIndex; i += inc) {
        newArray[i] = newArray[i + inc];
    }
    newArray[toIndex] = target;
    return newArray;
};

export const savePagesToChanges =
    (newArr: IBookPage[], bookID: string) => (dispatch: any) => {
        const pagesNumber: any[] = [];
        newArr.map((page: IBookPage, index: number) => {
            pagesNumber.push({
                action: 'update',
                body: {
                    id: page.id,
                    templateId: page.templateId,
                    order: index
                }
            });
        });
        UpdatePageBookBatch(bookID, pagesNumber)
            .then(() => {
                dispatch(setMessageUser(UM.PAGE_MOVED));
            })
            .catch((err) => {
                console.log(err);
            });
    };
