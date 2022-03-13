export const defImage =
    'https://fanbooks-user-data-bucket-dev.s3.us-west-2.amazonaws.com/public/assets/images/templates/default.png';

export const defaultData = {
    templateId: '2b96a30d-e54d-47c0-b17c-bf3e7fdb3690',
    params: {
        template: {
            style: ''
        },
        images: {
            style: 'border-spacing: 1em; border-collapse: separate;',
            items: [
                {
                    tag: 'image0',
                    style: `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: 13%;`,
                    texts: [
                        {
                            style: 'position:absolute; bottom:1em; left:50%; top: 15%; border-width: 1px; border-style:solid; border-color:red;',
                            content: 'Your Text'
                        }
                    ]
                },
                {
                    tag: 'image1',
                    style: `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: 13%;`,
                    texts: []
                },
                {
                    tag: 'image2',
                    style: `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: 13%;`,
                    texts: []
                },
                {
                    tag: 'image3',
                    style: `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: 13%;`,
                    texts: []
                }
            ]
        },
        texts: []
    }
};
