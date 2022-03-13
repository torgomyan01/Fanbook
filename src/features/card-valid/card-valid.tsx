import React from 'react';

interface IThisProps {
    cc: string;
    className: string;
}

function CartValid({ cc, className = '' }: IThisProps) {
    const val = cc.replace(/-/g, '');
    const amex = new RegExp('^3[47][0-9]{13}$');
    const visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');

    const mastercard = new RegExp('^5[1-5][0-9]{14}$');
    const mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

    const disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    const disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    const disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

    const diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    const jcb = new RegExp('^35[0-9]{14}[0-9]*$');

    function cardIcon(number: string) {
        if (visa.test(number)) {
            return <i className={`fab fa-cc-visa ${className}`} />;
        }
        if (amex.test(number)) {
            return <i className={`fab fa-cc-amex ${className}`} />;
        }
        if (mastercard.test(number) || mastercard2.test(number)) {
            return <i className={`fab fa-cc-mastercard ${className}`} />;
        }
        if (disco1.test(number) || disco2.test(number) || disco3.test(number)) {
            return <i className={`fab fa-cc-discover ${className}`} />;
        }
        if (diners.test(number)) {
            return <i className={`fab fa-cc-diners-club ${className}`} />;
        }
        if (jcb.test(number)) {
            return <i className={`fab fa-cc-jcb ${className}`} />;
        }
        return <i className={`fas fa-credit-card ${className}`} />;
    }

    return cardIcon(val);
}

export default CartValid;
