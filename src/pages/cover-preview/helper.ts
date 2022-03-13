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

export const defaultStyleText =
    'position: absolute;' +
    'bottom: 1em;left: 30%;' +
    'border-width: 1px;' +
    'border-style: solid;' +
    'border-color: red;' +
    'top: 30%;' +
    'background-color: rgba(0, 0, 0, 0.63);';

export const inputFontSizeDefValue = {
    min: 11,
    max: 77
};

export const updateBook = {
    start: 'update-pages',
    stop: 'stop'
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

export const removeAndAddActivePreviewPage = (inpValue: number) => {
    const minBlocks = document.querySelectorAll('.carousel-item-bg');
    minBlocks.forEach((minB, index: number) => {
        if (index === inpValue) {
            minB.classList.add('active');
        } else {
            minB.classList.remove('active');
        }
    });
};
